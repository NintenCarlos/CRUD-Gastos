from flask import Blueprint, request, jsonify
from app.controller.expense_controller import create_expense, get_expenses, update_expense, delete_expense
from datetime import datetime as dt

expense_bp = Blueprint("expense", __name__, url_prefix="/expense")

@expense_bp.route("/create", methods=["POST"])
def create():
    data = request.get_json()
    
    category = data.get("category")
    description = data.get("description")
    amount = data.get("amount")
    
    if not category or not description or not amount:
        return jsonify({
            'error': 'Faltan campos por completar'
        }), 400
        
    try: 
        amount = float(amount)
        amount = "{0:2f}".format(amount)
    except ValueError: 
        return jsonify({
            'err': 'El monto debe de ser un número.'
        }), 400
        
    expense = create_expense(category= category, description= description, amount= amount)
    
    return jsonify({
        'msg': 'Gasto creado con éxito',
        'expense': expense.to_dict()
    }), 200
    
@expense_bp.route("/get", methods=["GET"])
def get():
    expenses = get_expenses()
    data = []
    
    for expense in expenses: 
        data.append(expense.to_dict())
        
    return jsonify({
        'msg': 'Gastos obtenidos',
        'expenses': data
    })
    
@expense_bp.route('/update/<int:id>', methods=["PUT"])
def update(id):
    data = request.get_json()
    
    try: 
        data['amount'] = float(data['amount'])
    except ValueError:
        return jsonify({
            'err': 'El monto debe de ser un número'
        }), 400
        
    
    data['date'] = dt.now()
        
    expense = update_expense(id, data)
    
    return jsonify({
        'msg': 'Gasto actualizado con éxito.',
        'expense': expense.to_dict()
    }), 200
    
@expense_bp.route('/delete/<int:id>', methods=["DELETE"])
def delete(id):
    expense = delete_expense(id)
    
    if not expense: 
        return jsonify({
            'err': 'El gasto que buscas eliminar, no existe'
        }), 400
    
    return jsonify({
        'msg': 'Gasto eliminado con éxito.',
        'expense': expense.to_dict()
    }), 200