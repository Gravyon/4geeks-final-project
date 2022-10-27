"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, json 
from api.models import db, User, Products, Comments, Favorites, Shopping, OrderHistory
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

###########################
# Login function
###########################

@api.route("/login", methods=["POST"])
def login():
    # Get input
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    # Query to get user info
    user = User.query.filter_by(email=email).first()
    ## If "user" query brings no data, then user doesn't exist
    if user is None:
        return jsonify({"msg":"User doesn't exist"}), 404
    # Compared email and password, if one of them is not correct then it rejects the login attempt
    elif email != user.email or password != user.password:
        return jsonify({"msg": "Bad email or password"}), 401
    # Grants a token if login was successful
    else:
        access_token = create_access_token(identity=email)
        response_body = {
            # Shows the token and the user info
            "msg":access_token,
            "user": user.serialize()
        }
        return jsonify(response_body), 200

###########################
# Products GET query
###########################

@api.route('/product', methods=['GET'])
def get_products():
    ###########################
    # Get all products
    ###########################
    products = Products.query.all()
    print(products)
    results = list(map(lambda x: x.serialize(), products))
    return jsonify(results), 200

@api.route('/product/<int:product_id>', methods=['GET'])
def get_product(product_id):
    ###########################
    # Get one product
    ###########################
    product = Products.query.filter_by(id=product_id).first()
    print(product)
    results = product.serialize()
    return jsonify(results), 200

###########################
# User POST query
###########################

@api.route('/user', methods=['POST'])
def create_user():
    # Load data from postman or input
    body = json.loads(request.data)
    print(body)
    # Filter by to check input email, this will be used in the if so email is never repeated
    user_query = User.query.filter_by(email=body["email"]).first()
    print(user_query)
    
    # If to check if user doesn't exist (by checking the email), if so, it's created
    if user_query is None:
        # Table contents, same as the one in models.py
        new_user = User(
        username=body["username"],
        password=body["password"],
        email=body["email"])
        print(new_user)
        # Flask command to add a new entry
        db.session.add(new_user)
        # Flask command to commit the database, saving the changes
        db.session.commit()
        # Standard response to request with error code 200 (success)
        response_body = {
            "msg": "New user created"
        }
        return jsonify(response_body), 200
    # else response if the email exists
    response_body = {
        "msg": "User email already exists"
    }
    # Ends the function by sending the error code 400 (data already exists)
    return jsonify(response_body), 400

###########################
# Favorites GET queries
###########################

@api.route('/favorites', methods=['GET'])
def get_favorites():
    ###########################
    # Get all favorites
    ###########################
    favorites = Favorites.query.all()
    print(favorites)
    results = list(map(lambda x: x.serialize(), favorites))
    print(results)
    return jsonify(results), 200

@api.route('/user/<int:id_user>/favorite', methods=['GET'])
def get_favorite(id_user):
    ###########################
    # Get user favorites
    ###########################
    favorites = Favorites.query.filter_by(id_user=id_user).all()
    results = list(map(lambda x: x.serialize(), favorites))
    print(favorites)
    # results = favorites
    return jsonify(results), 200

###########################
# Shopping GET queries
###########################

@api.route('/shopping', methods=['GET'])
def get_shopping():
    ###########################
    # Get all shopping
    ###########################
    shopping = Shopping.query.all()
    print(shopping)
    results = list(map(lambda x: x.serialize(), shopping))
    print(results)
    return jsonify(results), 200

@api.route('/user/<int:id_user>/shopping', methods=['GET'])
def get_shopping_by_user(id_user):
    ###########################
    # Get user shopping list
    ###########################
    shopping = Shopping.query.filter_by(id_user=id_user).all()
    print(shopping)
    results = list(map(lambda x: x.serialize(), shopping))
    print(results)
    return jsonify(results), 200

###########################
# Order History queries
###########################

@api.route('/order', methods=['GET'])
def get_order():
    ###########################
    # Get all orders
    ###########################
    order = OrderHistory.query.all()
    print(order)
    results = list(map(lambda x: x.serialize(), order))
    print(results)
    return jsonify(results), 200

@api.route('/order', methods=['POST'])
def create_order():
    ###########################
    # Create order
    ###########################
    # Load data from postman or input
    body = json.loads(request.data)
    print(body)
    new_order= OrderHistory(id_shopping=body["id_shopping"],
    id_user=body["id_user"])
    # Flask command to add a new entry
    db.session.add(new_order)
    # Flask command to commit the database, saving the changes
    db.session.commit()
    # Standard response to request with error code 200 (success)
    response_body = {
        "msg": "New order created"
    }
    return jsonify(response_body), 200
