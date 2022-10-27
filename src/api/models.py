from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
#hola

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(250), nullable=False)
    password = db.Column(db.String(250), nullable=False)
    email = db.Column(db.String(250), nullable=False)
    favorites = db.relationship('Favorites', backref='user', cascade="all, delete-orphan", lazy=True)
    comments = db.relationship('Comments', backref='user', cascade="all, delete-orphan", lazy=True)
    shopping = db.relationship('Shopping', backref='user', cascade="all, delete-orphan", lazy=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email
            # do not serialize the password, its a security breach
        }

class Products(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    category = db.Column(db.String(250), nullable=False)
    price = db.Column(db.Integer, nullable=False)

    favorite = db.relationship('Favorites', backref='products', cascade="all, delete-orphan", lazy=True)
    comments = db.relationship('Comments', backref='products', cascade="all, delete-orphan", lazy=True)
    

    def __repr__(self):
        return f'<Products {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "category": self.category,
            "price": self.price
        }

class Favorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_user = db.Column(db.Integer,  db.ForeignKey('user.id'), nullable=False )
    id_products = db.Column(db.Integer, db.ForeignKey('products.id') , nullable=True)

    def __repr__(self):
        return f'<Favorites {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "id_user": self.id_user,
            "id_products": self.id_products
        }


class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(250))
    id_user = db.Column(db.Integer,  db.ForeignKey('user.id'), nullable=False )
    id_products = db.Column(db.Integer, db.ForeignKey('products.id') , nullable=True)

    def __repr__(self):
        return f'<Comments {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "id_user": self.id_user,
            "id_products": self.id_products
        }

class Shopping(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_user = db.Column(db.Integer,  db.ForeignKey('user.id'), nullable=False )
    items = db.relationship('OrderHistory', backref='shopping', cascade="all, delete-orphan", lazy=True)

    def __repr__(self):
        return f'<Shopping {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "id_user": self.id_user,
            "items": self.items
        }


class OrderHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_shopping = db.Column(db.Integer,  db.ForeignKey('shopping.id'), nullable=False )
    id_products = db.Column(db.Integer, db.ForeignKey('products.id') , nullable=True)

    def __repr__(self):
        return f'<OrderHistory {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "id_shopping": self.id_shopping,
            "id_products": self.id_products
        }