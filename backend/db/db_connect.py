import os

from flask_pymongo import PyMongo

def connect(app):
    app.config["MONGO_URI"] = os.getenv("DB_URI")
    client = PyMongo(app)
    return client
