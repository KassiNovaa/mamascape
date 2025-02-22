#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource
import random 
import ipdb

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Affirmation, Favorite, Journal, Link ;

class Affirmations(Resource):       
    def get(self):
        affirmations = Affirmation.query.all()
        random_affirmation = random.choice(affirmations)
        return make_response({'affirmation': random_affirmation.to_dict()}, 200)

api.add_resource(Affirmations, '/api/v1/affirmation')

class AffirmationbyId(Resource):
    def get(self, id):
        affirmation = Affirmation.query.get(id)
        if not affirmation:
            return make_response({'error': 'affirmation not found'}, 404)
        return make_response({'affirmation': affirmation.to_dict()}, 200)
    
    def patch(self, id):
        favorite = Affirmation.query.filter_by(id=id).first()
        if not favorite:
            return make_response({'error': 'favorite not found'}, 404)
        params = request.json
        favorite.like_count = params['like_count']
        db.session.commit()
        return make_response({'favorite': favorite.to_dict()}, 200) 
    
api.add_resource(AffirmationbyId, '/api/v1/affirmation/<int:id>')

class Favorites(Resource):
    def get(self, user_id):
        favorites = Favorite.query.filter_by(user_id=user_id)
        affirmations = [favorite.to_dict() for favorite in favorites]
        return make_response( affirmations, 200 )

    def post(self, user_id ):
        params = request.json
        existing_favorite = Favorite.query.filter_by( user_id = user_id, affirmation_id=params['affirmation_id']).first()
        if existing_favorite:
            return make_response({'error': 'favorite already exists'}, 409)
        else:
            favorite = Favorite(user_id=params['user_id'], affirmation_id=params['affirmation_id'])    
        db.session.add(favorite)
        db.session.commit()
        return make_response({'favorite': favorite.to_dict()}, 201)
    
api.add_resource(Favorites, '/api/v1/users/<int:user_id>/favorites' )

class FavoritebyId(Resource):
    def delete(self, user_id, favorite_id):
        favorite = Favorite.query.filter_by( user_id=user_id, id=favorite_id).first()
        if not favorite:
            return make_response({'error': 'favorite not found'}, 404)
        db.session.delete(favorite)
        db.session.commit()
        return make_response('favorite deleted', 204)

api.add_resource(FavoritebyId, '/api/v1/users/favorites/<int:user_id>/<int:favorite_id>')

class Journals (Resource):
    def get(self):
        journals = Journal.query.filter_by( user_id=session.get('user_id'))
        return make_response({'journals': [journal.to_dict() for journal in journals]}, 200)

    def post(self):
        params = request.json
        journal = Journal(user_id=params['user_id'], date=params['date'], entry=params['entry'], title=params['title'])
        db.session.add(journal)
        db.session.commit()
        return make_response({'journal': journal.to_dict()}, 201)
    
api.add_resource( Journals , '/api/v1/journals')

class JournalbyId(Resource):
    def delete(self, id):
        journal = Journal.query.filter_by(id=id).first()
        if not journal:
            return make_response({'error': 'journal not found'}, 404)
        db.session.delete(journal)
        db.session.commit()
        return make_response('', 204)

    def patch(self, id):
        journal = Journal.query.get(id)
        # ipdb.set_trace()
        if not journal:
            return make_response({'error': 'journal not found'}, 404)
        params = request.json
        try:
            for attr in params:
                setattr(journal, attr, params[attr])
        except Exception as e:
            return make_response({'error': str(e)}, 400)
        db.session.commit()
        return make_response(journal.to_dict(), 200)

api.add_resource(JournalbyId, '/api/v1/journals/<int:id>')

class Links(Resource):
    def get(self):
        all_links = Link.query.all()
        return make_response({'links': [link.to_dict() for link in all_links]}, 200)

api.add_resource(Links, '/api/v1/resources')

class Users(Resource):
    def post(self):
        data = request.get_json()
        user = User(firstname=data['firstname'],lastname=data['lastname'],username=data['username'], email=data['email'], password_hash=data['password'], motherhood_status=data['motherhood'])
        db.session.add(user)
        db.session.commit()
        session['user_id'] = user.id
        return make_response({'user': user.to_dict()}, 201 )
api.add_resource(Users, '/api/v1/users')

@app.route('/api/v1/authorized')
def authorized():
    try:
        user = User.query.filter_by(id=session.get('user_id')).first()
        return make_response(user.to_dict(), 200)
    except:
        return make_response({'error': 'user not found'}, 404)

@app.route('/api/v1/logout', methods=['DELETE'])
def logout():
    session['user_id'] = None
    return make_response('', 204)

@app.route('/api/v1/login', methods=['POST'])
def login():
    data = request.get_json()
    try:
        user = User.query.filter_by(email=data['email']).first()
        if user.authenticate(data['password']):
            session['user_id'] = user.id
            return make_response({'user': user.to_dict()}, 200 )
        else:
            return make_response({'error': 'password incorrect'}, 401)
    except:
        return make_response({'error': 'email or password incorrect'}, 401)

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

