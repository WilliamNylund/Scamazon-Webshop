from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('items/', views.ItemList.as_view()),
    path('items/<int:pk>/', views.ItemDetail.as_view()),
    path('my-items/', views.MyItemList.as_view()),

]
urlpatterns = format_suffix_patterns(urlpatterns)

