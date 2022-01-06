from .serializers import OrderSerializer, OrderWithItemsSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from .models import Order
from items.models import Item
from rest_framework import permissions
from decimal import Decimal
from django.core.mail import send_mail

class OrderList(APIView):
    """
    List all orders, or create a new order.
    """
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, format=None):
        user = request.user
        orders = Order.objects.all().filter(consumer=user)
        serializer = OrderWithItemsSerializer(orders, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        cart = request.data['cart']

        #validate items
        warnings = {}
        for id, cart_item in cart.items():
            item = Item.objects.filter(pk=id, order=None).first()
            if item: 
                #Item still exists and is not purchased by another user
                if Decimal(cart_item['price']) != item.price:
                    warnings[id] = {"exists": True, "new_price": str(item.price)}
            else:
                warnings[id] = {"exists": False}
        if warnings:
            return Response(warnings, status=status.HTTP_300_MULTIPLE_CHOICES)
        
        request.data['consumer'] = request.user.pk
        request.data['items'] = list(cart.keys())
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            #send emails to sellers
            bought_items_string = ''
            for id, cart_item in cart.items():
                item = Item.objects.filter(pk=id).first()
                bought_items_string += item.title + ': '+ str(item.price) + '€ \n'
                send_mail(
                    'Your item has been sold on Scamazon',
                    'Dear scamazon user, \nYour item ' + item.title + ' has been sold for the price of ' + str(item.price) + ' €',
                    'info@scamazon.com',
                    [item.owner],
                    fail_silently=False,
                    )
            send_mail(
                'Your item has been sold on Scamazon',
                'Dear scamazon user, \nYour purchase was successful. Here is your receipt: \n' + bought_items_string,
                'info@scamazon.com',
                [request.user.email],
                fail_silently=False,
                )
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

