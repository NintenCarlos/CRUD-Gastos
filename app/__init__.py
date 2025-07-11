from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from .config import Config
from .database.db import db

migrate = Migrate()
jwt = JWTManager()

def create_app(): 
    app = Flask(__name__)
    app.config.from_object(Config)
    
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    
    from app.routes.expense_routes import expense_bp
    
    app.register_blueprint(expense_bp)
    
    CORS(app)
    
    return app
