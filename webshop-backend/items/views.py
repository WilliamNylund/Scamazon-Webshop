from math import log
from random import lognormvariate
from .serializers import ItemSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from .models import Item
from django.core.paginator import Paginator
class ItemList(APIView):
    """
    List all items, or create a new item.
    """
    def get(self, request, format=None):
        items = Item.objects.all()
        page_number = self.request.query_params.get('page_number', 1) #1 is default
        page_size = 10
        paginator = Paginator(items , page_size)

        serializer = ItemSerializer(paginator.page(page_number), many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ItemDetail(APIView):
    """
    Retrieve, update or delete a item instance.
    """

    def get_object(self, pk):
        try:
            obj = Item.objects.get(pk=pk)
            self.check_object_permissions(self.request, obj)
            return obj
        except Item.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        item = self.get_object(pk)
        serializer = ItemSerializer(item)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        item = self.get_object(pk)
        serializer = ItemSerializer(item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        item = self.get_object(pk)
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

