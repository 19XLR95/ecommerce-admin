from controllers.login_controller import *

def initialize_login_routes(app, request, db_client):
    @app.route("/login", methods=["POST"])
    def login_route():
        return login(request, db_client)
    
    @app.route("/logout", methods=["GET"])
    def logout_route():
        return logout(request, db_client)
