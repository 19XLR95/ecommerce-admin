import os

from flask import Flask, request
from flask_cors import CORS
from dotenv import load_dotenv

from routes.route import initialize_routes
from db.db_connect import connect as connect_db

load_dotenv()

app = Flask(__name__)
cors = CORS(app=app, origins=os.getenv("ALLOWED_ORIGINS"), supports_credentials=True)

db_client = connect_db(app)

initialize_routes(app, request, db_client)

def insert_default_admin():
    admin = db_client.db.users.find_one({"email": "admin@company.com"})
    if admin == None:
        db_client.db.users.insert_one({
            "name" : "Admin",
            "surname" : "User",
            "email" : "admin@company.com",
            "password" : "$2b$10$ZfQ3vhJMaryEeD56Ukvi8OZpg7zr3J8mX5PySgDJab/KyrsAgD4c6" # password is 'admin'
        })

if __name__ == "__main__":
    app.run()
    insert_default_admin()
