from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('carts/', views.CartList.as_view()),
    path('carts/current/', views.CartDetail.as_view()),
]
urlpatterns = format_suffix_patterns(urlpatterns)

