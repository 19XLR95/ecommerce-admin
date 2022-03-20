from flask import jsonify, make_response
from bson import ObjectId, errors as BSONErrors
from marshmallow import exceptions as MarshmallowErrors

from db.schemas.product_schema import ProductSchema

def __check_user_authorization__(request, db_client):
    cookie_token = request.cookies.get("token")
    
    if cookie_token == None:
        return False
    
    try:
        user = db_client.db.users.find_one({"token": cookie_token})

        if user == None:
            return False
    except:
        return make_response({"msg": "Internal server error!"}, 500)
        return False
    
    return True

def get_all_products(request, db_client):
    user_authorized = __check_user_authorization__(request, db_client)
    if not user_authorized:
        return make_response({"msg": "You need to login!"}, 401)

    loaded_products = None
    try:
        loaded_products = db_client.db.products.find({})
    except:
        return make_response({"msg": "Internal server error!"}, 500)

    product_schema = ProductSchema()
    products = list()
    
    for product in loaded_products:
        products.append(product_schema.dump(product))
    
    return jsonify(products)

def create_product(request, db_client):
    user_authorized = __check_user_authorization__(request, db_client)
    if not user_authorized:
        return make_response({"msg": "You need to login!"}, 401)

    product_json = request.json
    product_schema = ProductSchema()
    product = None
    
    try:
        product = product_schema.load(product_json)
        db_client.db.products.insert_one(product)
    except MarshmallowErrors.ValidationError as err:
        return make_response({"msg": "Request param validation error!", "details": err.messages}, 400)

    product = product_schema.dump(product)
    return make_response(product, 201)

def update_product(request, db_client, product_id):
    user_authorized = __check_user_authorization__(request, db_client)
    if not user_authorized:
        return make_response({"msg": "You need to login!"}, 401)

    product_object_id = None
    product = None
    try:
        product_object_id = ObjectId(product_id)
        product = db_client.db.products.find_one({"_id": product_object_id})
    except BSONErrors.InvalidId:
        return make_response({"msg": "Product id is not valid!"}, 400)
    except:
        return make_response({"msg": "Internal server error!"}, 500)

    if product == None:
        return make_response({"msg": "Product is not found!"}, 404)
    
    product_json = request.json
    product_schema = ProductSchema()
    product_json_validated = None

    try:
        product_json_validated = product_schema.load(product_json)
        db_client.db.products.update_one({"_id": product_object_id}, {"$set": product_json_validated})
    except MarshmallowErrors.ValidationError as err:
        return make_response({"msg": "Request param validation error!", "details": err.messages}, 400)
    except:
        return make_response({"msg": "Internal server error!"}, 500)
    
    return make_response('', 204)

def delete_product(request, db_client, product_id):
    user_authorized = __check_user_authorization__(request, db_client)
    if not user_authorized:
        return make_response({"msg": "You need to login!"}, 401)
    
    product_object_id = None
    product = None
    try:
        product_object_id = ObjectId(product_id)
        product = db_client.db.products.find_one({"_id": product_object_id})
    except BSONErrors.InvalidId:
        return make_response({"msg": "Product id is not valid!"}, 400)
    except:
        return make_response({"msg": "Internal server error!"}, 500)
    
    if product == None:
        return make_response({"msg": "Product is not found!"}, 404)
    
    try:
        db_client.db.products.delete_one({"_id": product_object_id})
    except:
        return make_response({"msg": "Internal server error!"}, 500)
    
    return make_response('', 204)
