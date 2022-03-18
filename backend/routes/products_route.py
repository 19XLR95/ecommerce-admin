from controllers.product_controller import *

def initialize_products_routes(app, request):
    @app.route("/products", methods=["GET"])
    def get_all_products_route():
        return get_all_products()

    @app.route("/products", methods=["POST"])
    def create_product_route():
        return create_product()

    @app.route("/products/<product_id>", methods=["PATCH"])
    def update_product_route(product_id):
        return update_product(product_id)

    @app.route("/products/<product_id>", methods=["DELETE"])
    def delete_product_route(product_id):
        return delete_product(product_id)
