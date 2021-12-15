from django.http.response import HttpResponse
from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from items.models import Item

def index(request):
    return render(request, 'build/index.html')

def home(request):
    items = Item.objects.all()
    print(len(items))
    print("hello")
    context = {
        'items': items,
        'item_count': len(items)
    }
    return render(request, 'home.html', context)