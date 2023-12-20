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
        a7 = Affirmation(quote = '" I am enough "', like_count = 0)
        a8 = Affirmation(quote = ' "I am a loving and nurturing mother, and my children feel safe and cherished in my presence."', like_count = 0)
        a9 = Affirmation(quote = ' "I embrace the imperfections of motherhood, knowing that my love and effort are more than enough for my family."', like_count = 0)
        a10 = Affirmation(quote = ' "I am a strong, confident, and capable mother."', like_count = 0)
        a11 = Affirmation(quote = ' "I am a loving mother."', like_count = 0)
        a12 = Affirmation(quote = ' "I prioritize self-care to replenish my own well-being, knowing that a happy and fulfilled mother positively influences her family."', like_count = 0)
        a13 = Affirmation(quote = ' "I let go of the pressure to have it all figured out; I am a work in progress, and thats perfectly okay."', like_count = 0)
        a14 = Affirmation(quote = ' "My children dont need a perfect mother... they need a loving and authentic one, and thats who I am."', like_count = 0)

        affirmations = [a1,a2,a3,a4,a5,a6, a7, a8, a9, a10, a11, a12, a13, a14]

        print("creating favorites...")
        f1 = Favorite(user = u1, affirmation = a1)
        f2 = Favorite(user = u1, affirmation = a2)
        f3 = Favorite(user = u2, affirmation = a2)
        f4 = Favorite(user = u2, affirmation = a3)

        favorites = [f1,f2,f3,f4]

        print("skipping journals...")

        print("creating resources...")
        r1 = Resource(title = 'Therapy And Support For New Moms', description = 'Being a parent is tough. Lets do this together.', url = 'https://chsfl.org/services/for-parents/' )
        r2 = Resource(title = 'Domestic Violence Support', description = 'Here for you.', url = 'https://www.thehotline.org/')
        r3 = Resource(title = 'Postpartum Support International', description = 'Here for you.', url = 'https://www.postpartum.net/')

        r4 = Resource(title = 'Child Care Help', description = 'Here for you.', url = 'https://familyservices.floridaearlylearning.com/')

        r5 = Resource(title = 'Family Assitance Programs', description = 'Here for you.', url = 'https://www.floridahealth.gov/programs-and-services/wic/links.html')
        r6 = Resource(title = 'Healthcare Assistance Programs', description = 'Here for you.', url = 'https://www.floridahealth.gov/programs-and-services/childrens-health/child-care-for-children-with-special-health-care-needs/index.html')
        r7 = Resource(title = 'Food Assistance Programs', description = 'Here for you.', url = 'https://www.myflfamilies.com/service-programs/access/food-assistance.shtml')
        r8 = Resource(title = 'WIC', description = 'Here for you.', url = 'https://www.myflfamilies.com/service-programs/access/child-care.shtml')
        r9 = Resource(title = 'BreastFeeding Helpline', description = 'Here for you.', url = 'https://www.myflfamilies.com/service-programs/access/child-care.shtml')
        r10 = Resource(title = 'Pregnancy and Postpartum workouts', description = 'Here for you.', url = 'https://www.youtube.com/@PregnancyandPostpartumTV')

        resources = [r1,r2, r3, r4, r5, r6, r7, r8, r9, r10]

        db.session.add_all(users)
        db.session.add_all(affirmations)
        db.session.add_all(favorites)
        db.session.add_all(resources)

        db.session.commit()

        print("Congrats, you've planted the seed! It's a beautiful baby database!")