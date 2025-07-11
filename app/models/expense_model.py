from app.database.db import db
from datetime import datetime as dt

class Expense(db.Model): 
    id = db.Column(db.Integer, primary_key = True)
    category = db.Column(db.String(50), nullable = False)
    description = db.Column(db.String(255), nullable = False)
    
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    date = db.Column(db.DateTime, default=dt.now()) 
    
    def to_dict(self):
        expense = {
            'id': self.id,
            'category': self.category,
            'description': self.description,
            'amount': self.amount,
            'date': self.date
        }
        
        return expense