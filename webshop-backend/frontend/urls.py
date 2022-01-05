from django.urls import path
from . import views

urlpatterns = [
    path('shop/', views.index),
    path('signin/', views.index),
    path('signup/', views.index),
    path('myItems/', views.index),
    path('populate/', views.populate),
    path('', views.home),
]