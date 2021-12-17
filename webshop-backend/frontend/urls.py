from django.urls import path
from . import views

urlpatterns = [
    path('shop/', views.index),
    path('populate/', views.populate),
    path('', views.home),
]