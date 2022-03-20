from .products_route import initialize_products_routes
from .login_route import initialize_login_routes

def initialize_routes(app, request, db_client):
    initialize_products_routes(app, request, db_client)
    initialize_login_routes(app, request, db_client)
