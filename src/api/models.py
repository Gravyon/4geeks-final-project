from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import ARRAY

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(250), nullable=False)
    password = db.Column(db.String(250), nullable=False)
    email = db.Column(db.String(250), nullable=False)
    name = db.Column(db.String(250), nullable=True)
    lastname = db.Column(db.String(250), nullable=True)
    seller = db.Column(db.Boolean, unique=False, default=False)
    admin = db.Column(db.Boolean, unique=False, default=False)
    favorites = db.relationship('Favorites', backref='user', cascade="all, delete-orphan", lazy=True)
    reviews = db.relationship('Review', backref='user', cascade="all, delete-orphan", lazy=True)
    shopping = db.relationship('Shopping', backref='user', cascade="all, delete-orphan", lazy=True)
    orders = db.relationship('OrderHistory', backref='user', cascade="all, delete-orphan", lazy=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "name": self.name,
            "lastname": self.lastname,
            "seller": self.seller,
            "admin": self.admin,
            # do not serialize the password, its a security breach
        }

class Products(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    category = db.Column(db.String(250), nullable=False)
    description = db.Column(db.String(250), nullable=False)
    url = db.Column(db.String(250), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    shopping = db.relationship('Shopping', backref='products', cascade="all, delete-orphan", lazy=True)
    favorite = db.relationship('Favorites', backref='products', cascade="all, delete-orphan", lazy=True)
    reviews = db.relationship('Review', backref='products', cascade="all, delete-orphan", lazy=True)
    

    def __repr__(self):
        return f'<Products {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "category": self.category,
            "price": self.price,
            "description": self.description,
            "url": self.url,
            "score": self.serialize_score_average()
        }

    def serialize_score_average(self):
        arr_score=list(map(lambda item: item.score, self.reviews))
        if len(arr_score) != 0 :
            avg_score = int(sum(arr_score)/len(arr_score))

            return avg_score
        else:
            avg_score = 0

            return avg_score
class Favorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_user = db.Column(db.Integer,  db.ForeignKey('user.id'), nullable=False )
    id_products = db.Column(db.Integer, db.ForeignKey('products.id') , nullable=True)

    def __repr__(self):
        return f'<Favorites {self.id}>'

    def serialize(self):
        return {
            # "id": self.id,
            "id_user": self.id_user,
            "id_products": self.id_products
        }

    def serialize2(self):
        product = Products.query.filter_by(id=self.id_products).first()
        return product.serialize()


class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(250))
    id_user = db.Column(db.Integer,  db.ForeignKey('user.id'), nullable=False )
    id_products = db.Column(db.Integer, db.ForeignKey('products.id') , nullable=True)
    score = db.Column(db.Integer, nullable=True)
    

    def __repr__(self):
        return f'<Review {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "id_user": self.id_user,
            "id_products": self.id_products,
            "comment": self.comment,
            "score": self.score
        }
        
    def serialize2(self):
        product = Products.query.filter_by(id=self.id_products).first()
        return product.serialize()

class Shopping(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_user = db.Column(db.Integer,  db.ForeignKey('user.id'), nullable=False )
    id_products = db.Column(db.Integer,  db.ForeignKey('products.id'), nullable=False )

    def __repr__(self):
        return f'<Shopping {self.id}>'

    def serialize(self):
        return {
            # "id": self.id,
            "id_user": self.id_user,
            "id_products": self.id_products
        }
    def serialize2(self):
        product = Products.query.filter_by(id=self.id_products).first()
        return product.serialize()
        


class OrderHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_shopping = db.Column(db.ARRAY(db.Integer),  db.ForeignKey('shopping.id'), nullable=False)
    id_user = db.Column(db.Integer, db.ForeignKey('user.id') , nullable=False)

    def __repr__(self):
        return f'<OrderHistory {self.id}>'

    def serialize(self):
        return {
            # "id": self.id,
            "id_shopping": self.id_shopping
            # "id_user": self.id_user
        }

    def serialize2(self):
        arr_shopping_list=list(map(lambda item: item.id_shopping, self.shopping))
        shopping_list = Shopping.query.filter_by(id=self.id_shopping).first()
        return shopping_list.serialize()