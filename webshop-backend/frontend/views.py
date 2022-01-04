from django.http.response import HttpResponse
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.template import loader
from items.models import Item
from users.models import User
import random
import decimal
# 7
def index(request):
    return render(request, 'build/index.html')

def home(request):
    items = Item.objects.all()
    users = User.objects.all()
    context = {
        'item_count': len(items),
        'user_count': len(users)
    }
    return render(request, 'home.html', context)

#This method populates the database for testing purposes
def populate(request):
    # Delete all existing models
    Item.objects.all().delete()
    User.objects.all().delete()

    """
    Generate 6 users in the format:
        Username: testuser#
        Password: pass#
        Email address: testuser#@shop.aa
    # = [1-6]
    """
    for i in range(1,7):
        user = User.objects.create_user(email='testuser'+str(i)+'@shop.aa', password='pass'+str(i), username='testuser'+str(i))
        
        #Generate 10 items for 3 of the users
        if i > 3:
            item_titles = ['Banana', 'Apple','Wine', 'Fairy', 'Lamp', 'Juice', 'Pasta', 'Meatballs', 'Soy sauce', 'Kiwi']
            for title in item_titles:
                price = float(random.randrange(155, 389))/100
                item = Item(title=title, price=price, owner=user, description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.')
                item.save()

    return redirect(home)
