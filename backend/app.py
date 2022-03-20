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
