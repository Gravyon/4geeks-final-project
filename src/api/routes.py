"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, json, current_app
from api.models import db, User, Products, Comments, Favorites, Shopping, OrderHistory
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from flask_mail import Mail, Message
from threading import Thread
import random, string

api = Blueprint('api', __name__)

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

# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.

###########################
# Profile function
###########################

@api.route("/profile", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    # Same as login, if the query brings nothing then it doesn't exist
    if user is None:
        return jsonify({"msg":"User doesn't exist"}), 404
    # If user is correct then it shows the user's info
    response_body = {
    "user": user.serialize()
        
    }
    return jsonify(response_body), 200

# Endpoint for revoking the current users access token. Saved the unique
# identifier (jti) for the JWT into our database.

###########################
# Logout function
###########################


@api.route("/valid-token", methods=["GET"])
@jwt_required()
def valid_token():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    # Same as login, if the query brings nothing then it doesn't exist

    if current_user is None:
        return jsonify({"User not logged in"}), 422

    elif user is None:
        return jsonify({"status":False}), 404
    # If user is correct then it shows the user's info
    response_body = {
        "status": True,
        "user": user.serialize()
        
    }
    return jsonify(response_body), 200

###########################
# Product queries
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

@api.route('/product', methods=['POST'])
def create_product():
    ###########################
    # Create product
    ###########################
    # Load data from postman or input
    body = json.loads(request.data)
    print(body)
    new_product = Products(
    name=body["name"],
    category=body["category"],
    description=body["description"],
    url=body["url"],
    price=body["price"])
    print(new_product)
    # Flask command to add a new entry
    db.session.add(new_product)
    # Flask command to commit the database, saving the changes
    db.session.commit()
    # Standard response to request with error code 200 (success)
    response_body = {
        "msg": "New product created"
    }
    return jsonify(response_body), 200

@api.route('/product/<int:product_id>', methods=["DELETE"])
def delete_product(product_id):

    ###########################
    # Create product
    ###########################
    product = Products.query.filter_by(id=product_id).first()
    print(product)
    # If user exists, deletes it
    if product:
        db.session.delete(product)
        db.session.commit()
        response_body = {
            "msg": "Product deleted successfully"
            }
        return jsonify(response_body), 200

    elif product is None:
        raise APIException('Product not found', status_code=404)
        return jsonify(product)

###########################
# Product PUT (MODIFY) query
###########################

@api.route('/product/<int:product_id>', methods=['PUT'])
def modify_product(product_id):
    body = json.loads(request.data)
    name = request.json['name']
    category = request.json['category']
    description = request.json['description']
    url = request.json['url']
    price = request.json['price']
    product = Products.query.filter_by(id=product_id).first()
    # If product exists, modifies it with new inputs
    if product:
        product.name = name
        product.category = category
        product.description = description
        product.url = url
        product.price = price
        db.session
        db.session.commit()
        response_body = {
            "msg": "Product updated successfully"
            }
        return jsonify(response_body), 200

    elif product is None:
        raise APIException('Product not found', status_code=404)
        return jsonify(product)

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
# User GET query
###########################

@api.route('/user', methods=['GET'])
def get_users():
    ###########################
    # Get all users
    ###########################
    users = User.query.all()
    print(users)
    results = list(map(lambda x: x.serialize(), users))
    return jsonify(results), 200

###########################
# User DELETE query
###########################

@api.route('/user/<int:user_id>', methods=["DELETE"])
def delete_user(user_id):

    user = User.query.filter_by(id=user_id).first()
    print(user)
    # If user exists, deletes it
    if user:
        db.session.delete(user)
        db.session.commit()
        response_body = {
            "msg": "User deleted successfully"
            }
        return jsonify(response_body), 200

    elif user is None:
        raise APIException('User not found', status_code=404)
        return jsonify(user)

###########################
# User PUT (MODIFY) query
###########################

@api.route('/user/<int:user_id>', methods=['PUT'])
def modify_user(user_id):
    body = json.loads(request.data)
    username = request.json['username']
    password = request.json['password']
    email = request.json['email']
    user = User.query.filter_by(id=user_id).first()
    # print(user, body)
    # print("user: " +user.username, "password: "+user.password, "email: "+user.email)
    # If user exists, modifies it with new inputs
    if user:
        user.username = username
        user.password = password
        user.email = email
        db.session
        db.session.commit()
        response_body = {
            "msg": "User updated successfully"
            }
        return jsonify(response_body), 200

    elif user is None:
        raise APIException('User not found', status_code=404)
        return jsonify(user)

###########################
# User password PUT (MODIFY) query
###########################

@api.route('/user/password/<int:user_id>', methods=['POST'])
def modify_user_password(user_id):
    recover_email = request.json['email']
    #Random password
    recover_password = ''.join(random.choice(string.ascii_uppercase + string.digits) for x in range(8)) 
    # If there's no input
    if not recover_email:
        return jsonify({"msg": "You must type an email address"}), 401
    user = User.query.filter_by(email=recover_email).first()
    # If user email doesn't exist
    if recover_email != user.email:
        return jsonify({"msg": "User email doesn't exist"}), 404
    # Modifies user passowrd with new random password
    user.password = recover_password
    db.session.commit()
    msg = Message("Hello", recipients=[recover_email])
    msg.html = f"""<h1>Your new password is: {recover_password}</h1>"""
    current_app.mail.send(msg)
    return jsonify("Your password has been sent to your email"), 200

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

@api.route('/user/<int:id_user>/favorites', methods=['GET'])
def get_favorites_by_user(id_user):
    ###########################
    # Get user favorites list
    ###########################
    favorites = Favorites.query.filter_by(id_user=id_user).all()
    print(favorites)
    results = list(map(lambda x: x.serialize2(), favorites))

    if (results == []):
      return  jsonify({"msg": "You don't have favorites"}), 404

    response_body = {
        "user_id": favorites[0].id_user,
        "results": results
    }
    print(results)
    return jsonify(response_body), 200

###########################
# Favorites POST query
###########################

@api.route('/favorites', methods=['POST'])
def create_favorites():
    # Load data from postman or input
    body = json.loads(request.data)
    print(body)
    user = request.json['id_user']
    product = request.json['id_products']
    print(user, product)
    # favorite_query = Favorites.query.filter_by(id=body["id"]).first()
    user_query = User.query.filter_by(id=body["id_user"]).first()
    
    print(user_query)
    if user_query:
        product_query = Favorites.query.filter_by(id_user=body["id_user"]).filter_by(id_products=body["id_products"]).first()
        if product_query:
            print(product_query)
            return jsonify({"msg": "Product exists in that list"}), 404
        else:    
            new_favorites = Favorites(
            id_user=body["id_user"],
            id_products=body["id_products"])
            # Flask command to add a new entry
            db.session.add(new_favorites)
            # Flask command to commit the database, saving the changes
            db.session.commit()
            # Standard response to request with error code 200 (success)
            return jsonify({"msg": "New favorite list created"}), 200

    return "User is not logged in", 400

###########################
# Shopping POST query
###########################
@api.route('/shopping', methods=['POST'])
def create_shopping():
    # Load data from postman or input
    body = json.loads(request.data)
    print(body)
    user_query = User.query.filter_by(id=body["id_user"]).first()
       
    print(user_query)
    if user_query: 
        new_shopping = Shopping(
        id_user=body["id_user"],
        id_products=body["id_products"])
        # Flask command to add a new entry
        db.session.add(new_shopping)
        # Flask command to commit the database, saving the changes
        db.session.commit()
        # Standard response to request with error code 200 (success)
        return jsonify({"msg": "New shopping list created"}), 200

    return jsonify({"msg": "Something went bad"}), 404

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
    results = list(map(lambda x: x.serialize2(), shopping))

    if results == []:
      return  jsonify({"msg": "Your cart is empty"}), 404

    response_body = {
        "user_id": shopping[0].id_user,
        "results": results
    }
    print(results)
    return jsonify(response_body), 200

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
    new_order= OrderHistory(
    id_shopping=body["id_shopping"],
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

    
###########################
# Favorites DELETE query
###########################

@api.route('/favorites', methods=['DELETE'])
def delete_favorites():
    # Load data from postman or input
    body = json.loads(request.data)
    print(body)
    # user_query = User.query.filter_by(id_user=body["id_user"]).first()
    # product_query = Products.query.filter_by(id_products=body["id_products"]).first()

    user = request.json['id_user']
    product = request.json['id_products']
    print(user, product)
    # favorite_query = Favorites.query.filter_by(id=body["id"]).first()
    user_query = User.query.filter_by(id=body["id_user"]).first()
    
    print(user_query)
    if user_query:
        product_query = Favorites.query.filter_by(id_user=body["id_user"]).filter_by(id_products=body["id_products"]).first()
        if product_query:
            
            db.session.delete(product_query)
            db.session.commit()
            response_body = {
            "msg": "Favorite deleted successfully"
            }
            return jsonify(response_body), 200
            
        elif product is None:
            raise APIException('Product not found', status_code=404)
            return jsonify(product)    
            

###########################
# Comments GET queries
###########################

@api.route('/comments', methods=['GET'])
def get_comments():
    ###########################
    # Get all comments
    ###########################
    comments = Comments.query.all()
    print(comments)
    results = list(map(lambda x: x.serialize(), comments))
    print(results)
    return jsonify(results), 200

@api.route('/user/<int:id_user>/comments', methods=['GET'])
def get_comments_by_user(id_user):
    ###########################
    # Get user comments list
    ###########################
    comments = Comments.query.filter_by(id_user=id_user).all()
    print(comments)
    results = list(map(lambda x: x.serialize(), comments))

    if (results == []):
      return  jsonify({"msg": "User doesn't have any comments yet"}), 404

    response_body = {
        "results": results
    }
    print(results)
    return jsonify(response_body), 200

@api.route('/comment', methods=['POST'])
def create_comment():
    # Load data from postman or input
    body = json.loads(request.data)
    print(body)
    user_query = User.query.filter_by(id=body["id_user"]).first()
    print(user_query)
    print(user_query)
    if user_query: 
        new_comment = Comments(
        content=body["content"],
        id_user=body["id_user"],
        id_products=body["id_products"])
        # Flask command to add a new entry
        db.session.add(new_comment)
        # Flask command to commit the database, saving the changes
        db.session.commit()
        # Standard response to request with error code 200 (success)
        return jsonify({"msg": "New comment created on that product by that user"}), 200

    return jsonify({"msg": "Something went bad"}), 404


###########################
# Comment DELETE query
###########################

@api.route('/comments/<int:id_user>/<int:id_comment>', methods=['DELETE'])
def delete_comment(id_user, id_comment):
    # Load data from postman or input
    # user_query = User.query.filter_by(id_user=body["id_user"]).first()
    # product_query = Products.query.filter_by(id_products=body["id_products"]).first()
    # print(user, content)
    # favorite_query = Favorites.query.filter_by(id=body["id"]).first()
    comment_query= Comments.query.filter_by(id_user=id_user).filter_by(id=id_comment).first()
    print(comment_query)
    if comment_query:
        db.session.delete(comment_query)
        db.session.commit()
        response_body = {
        "msg": "Comment deleted successfully"
        }
        return jsonify(response_body), 200
            
    elif comment_query is None:
        raise APIException('Content not found', status_code=404)
        return jsonify(comment_query)  

    return jsonify({"msg": "Something went wrong"}), 400

###########################
# Shopping DELETE query
###########################
@api.route('/shopping', methods=['DELETE'])
def delete_shopping():
    # Load data from postman or input
    body = json.loads(request.data)
    print(body)
    # user_query = User.query.filter_by(id_user=body["id_user"]).first()
    # product_query = Products.query.filter_by(id_products=body["id_products"]).first()

    user = request.json['id_user']
    product = request.json['id_products']
    print(user, product)
    # favorite_query = Favorites.query.filter_by(id=body["id"]).first()
    user_query = User.query.filter_by(id=body["id_user"]).first()
    
    print(user_query)
    if user_query:
        product_query = Shopping.query.filter_by(id_user=body["id_user"]).filter_by(id_products=body["id_products"]).first()
        if product_query:
            
            db.session.delete(product_query)
            db.session.commit()
            response_body = {
            "msg": "The product was deleted from your cart"
            }
            return jsonify(response_body), 200
            
        elif product is None:
            raise APIException('Product not found', status_code=404)
            return jsonify(product) 
    return "ok"
