from .serializers import OrderSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from .models import Order
from rest_framework import permissions

class OrderList(APIView):
    """
    List all orders, or create a new order.
    """
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, format=None):
        user = request.user
        orders = Order.objects.all().filter(consumer=user)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OrderDetail(APIView):
    """
    Retrieve, update or delete a order instance.
    """
    permission_classes = [permissions.IsAuthenticated]
    def get_object(self, user):
        try:
            obj = Order.objects.get(consumer=user)
            return obj
        except Order.DoesNotExist:
            order = Order(consumer=user)
            order.save()
            return order

    def get(self, request, format=None):
        order = self.get_object(request.user)
        serializer = OrderSerializer(order)
        return Response(serializer.data)

    def put(self, request, format=None):
        order = self.get_object(request.user)
        itemId = request.data.get("item")
        if order.items.filter(pk=itemId).exists():
            order.items.remove(itemId)
        else:
            order.items.add(itemId)
        order.save()
        serializer = OrderSerializer(order)
        return Response(serializer.data)

    def delete(self, request, format=None):
        cart = self.get_object(request.user)
        cart.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

