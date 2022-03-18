from .products_route import initialize_products_routes

def initialize_routes(app, request):
    initialize_products_routes(app, request)
