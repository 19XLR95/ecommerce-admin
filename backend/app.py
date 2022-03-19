from flask import Flask, request
from dotenv import load_dotenv

from routes.route import initialize_routes
from db.db_connect import connect as connect_db

app = Flask(__name__)

load_dotenv()

db_client = connect_db(app)

initialize_routes(app, request, db_client)
