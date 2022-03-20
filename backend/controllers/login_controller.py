import uuid

import bcrypt
from flask import make_response
from bson import ObjectId

from db.schemas.user_schema import UserSchema

def login(request, db_client):
    if not "email" in request.json or not "password" in request.json:
        return make_response({"msg": "Email or password is missing!"}, 400)

    user_email = request.json["email"]
    user_password = request.json["password"]
    user_password_byte = user_password.encode("utf-8")

    user = None

    try:
        user = db_client.db.users.find_one({"email": user_email})
    except:
        return make_response({"msg": "Internal server error!"}, 500)

    if user == None:
        return make_response({"msg": "Email or password is wrong!"}, 401)
    
    user_schema = UserSchema()
    user_json = user_schema.dump(user)

    if not bcrypt.checkpw(user_password_byte, user_json["password"].encode("utf-8")):
        return make_response({"msg": "Email or password is wrong!"}, 401)
    
    cookie_token = uuid.uuid4().hex

    try:
        db_client.db.users.update_one({"_id": ObjectId(user_json["_id"])}, {"$set": {"token": cookie_token}})
    except:
        return make_response({"msg": "Internal server error!"}, 500)

    user_schema = UserSchema(only=("_id", "name", "surname", "email"))
    res = make_response(user_schema.dump(user), 200)
    res.set_cookie("token", cookie_token)
    return res

def logout(request, db_client):
    cookie_token = request.cookies.get("token")
    
    if cookie_token == None:
        return make_response("", 204)

    user = None

    try:
        user = db_client.db.users.find_one({"token": cookie_token})
        
        if user == None:
            return make_response("", 204)
        
        user_schema = UserSchema()
        user_json = user_schema.dump(user)
        db_client.db.users.update_one({"_id": ObjectId(user_json["_id"])}, {"$unset": {"token": ""}})
    except:
        return make_response({"msg": "Internal server error!"}, 500)

    res = make_response("", 204)
    res.delete_cookie("token")
    return res
