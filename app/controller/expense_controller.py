from app.models.expense_model import Expense
from app.database.db import db

def create_expense(category, description, amount):
    expense = Expense(category = category, description = description, amount = amount)
    
    db.session.add(expense)
    db.session.commit()
    return expense

def get_expenses(): 
    return Expense.query.all()

def update_expense(id, data): 
    expense = Expense.query.get(id)
    
    if not expense: 
        return None
    
    for key, value in data.items():
        setattr(expense, key, value)
        
    db.session.commit()
        
    return expense

def delete_expense(id):
    expense = Expense.query.get(id)
    
    if not expense: 
        return None
    
    db.session.delete(expense)
    db.session.commit()
    return expense
    
    