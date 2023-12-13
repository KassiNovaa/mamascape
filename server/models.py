from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

# Models go here!

## This is the affirmations many to many model

class User(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String)
    lastname = db.Column(db.String)
    motherhood_status = db.Column(db.String)
    username = db.Column(db.String)
    email = db.Column(db.String)
    _password_hash = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())
    journals = db.relationship('Journal', back_populates='user')
    serialize_rules = ('-journals.user', '-_password_hash')

    @property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, plain_text_password):
        byte_object = plain_text_password.encode('utf-8')
        encrypted_password_object = bcrypt.generate_password_hash(byte_object)
        hashed_password_string = encrypted_password_object.decode('utf-8')
        self._password_hash = hashed_password_string

    def authenticate(self, password_string):
        byte_object = password_string.encode('utf-8')
        return bcrypt.check_password_hash(self.password_hash, byte_object)

    def __repr__(self):
        return f'<User {self.id}: {self.name}>'

class Affirmation(db.Model, SerializerMixin):
    __tablename__ = 'affirmations'

    id = db.Column(db.Integer, primary_key=True)
    quote = db.Column(db.String)
    like_count = db.Column(db.Integer)
    serialize_rules = ('-favorites.user', '-users.affirmations')

    users = association_proxy('favorites', 'user', creator=lambda user: Favorite(user=user))

    def __repr__(self):
        return f'<Affirmation {self.id}: {self.quote}>'

class Favorite(db.Model, SerializerMixin):
    __tablename__ = 'favorites'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    affirmation_id = db.Column(db.Integer, db.ForeignKey('affirmations.id'))

    user = db.relationship('User')
    affirmation = db.relationship('Affirmation')

    def __repr__(self):
        return f'<Favorite {self.id}: {self.user_id} {self.affirmation_id}>'
    

    ## This is the Journal model

class Journal(db.Model, SerializerMixin):
    __tablename__ = 'journals'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    date = db.Column(db.String)
    entry = db.Column(db.String)
    user = db.relationship('User', back_populates = 'journals')
    serialize_rules = ('-journals.user',)

    def __repr__(self):
        return f'<Journal {self.id}: {self.user_id} {self.date} {self.entry}>'
    
    
    ## This is the Resource model
       
class Resource(db.Model, SerializerMixin):
    __tablename__ = 'resources'

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String)
    description = db.Column(db.String)
    url = db.Column(db.String)

    def __repr__(self):
        return f'<Resources {self.id}: {self.title} {self.description} {self.url}>'