from flask import Flask, request
from dotenv import load_dotenv

from routes.route import initialize_routes

app = Flask(__name__)

load_dotenv()

initialize_routes(app, request)
