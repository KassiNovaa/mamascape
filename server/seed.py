#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Affirmation, Favorite, Journal, Link as Resource

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Deleting data...")
        User.query.delete()
        Affirmation.query.delete()
        Favorite.query.delete()
        Journal.query.delete()
        Resource.query.delete()

        print("creating users...")
       
        u1 = User(firstname = 'Mama', lastname = '1', motherhood_status = 'Pregnant', username = 'mama', email = 'mama@mail.com', password_hash = 'test1')
        u2 = User(firstname = 'Mama2', lastname = '2', motherhood_status = 'Newborn', username = 'mama2', email = 'test@mail',password_hash = 'test2')
        
        users = [u1,u2]

        print("creating affirmations...")
        a1 = Affirmation(quote = '" I am strong "', like_count = 0)
        a2 = Affirmation(quote = '" I am beautiful "', like_count = 0)
        a3 = Affirmation(quote = '" I am capable "', like_count = 0)
        a4 = Affirmation(quote = '" I am loved "', like_count = 0)
        a5 = Affirmation(quote = '" I am a good mother "', like_count = 0)
        a6 = Affirmation(quote = '" I am patient "', like_count = 0)

        affirmations = [a1,a2,a3,a4,a5,a6]

        print("creating favorites...")
        f1 = Favorite(user = u1, affirmation = a1)
        f2 = Favorite(user = u1, affirmation = a2)
        f3 = Favorite(user = u2, affirmation = a2)
        f4 = Favorite(user = u2, affirmation = a3)

        favorites = [f1,f2,f3,f4]

        print("creating journals...")
        j1 = Journal(user = u1, date = '2020-01-01', entry = 'Today was a good day')
        j2 = Journal(user = u1, date = '2020-01-02', entry = 'Today was a bad day')
        j3 = Journal(user = u2, date = '2020-01-01', entry = 'Today was a happy day')
        j4 = Journal(user = u2, date = '2020-01-02', entry = 'Today was a sad day')

        journals = [j1,j2,j3,j4]

        print("creating resources...")
        r1 = Resource(title = 'Therapy And Support For New Moms', description = 'Being a parent is tough. Lets do this together.', url = 'https://chsfl.org/services/for-parents/' )
        r2 = Resource(title = 'Resource 2', description = 'This is a resource', url = 'www.resource.com')

        resources = [r1,r2]

        db.session.add_all(users)
        db.session.add_all(affirmations)
        db.session.add_all(favorites)
        db.session.add_all(journals)
        db.session.add_all(resources)

        db.session.commit()

        print("Congrats, you've planted the seed! It's a beautiful baby database!")