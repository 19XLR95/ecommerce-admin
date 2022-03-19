from controllers.product_controller import *

def initialize_products_routes(app, request, db_client):
    @app.route("/products", methods=["GET"])
    def get_all_products_route():
        return get_all_products(request, db_client)

    @app.route("/products", methods=["POST"])
    def create_product_route():
        return create_product(request, db_client)

    @app.route("/products/<product_id>", methods=["PATCH"])
    def update_product_route(product_id):
        return update_product(request, db_client, product_id)

    @app.route("/products/<product_id>", methods=["DELETE"])
    def delete_product_route(product_id):
        return delete_product(request, db_client, product_id)
