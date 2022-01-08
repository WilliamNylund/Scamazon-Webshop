from django.urls import path
from . import views

urlpatterns = [
    path('shop/', views.index),
    path('login/', views.index),
    path('signup/', views.index),
    path('myitems/', views.index),
    path('account/', views.index),
    path('populate/', views.populate),
    path('', views.home),
]