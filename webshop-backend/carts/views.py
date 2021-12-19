from .serializers import CartSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from .models import Cart
from rest_framework import permissions

class CartList(APIView):
    """
    List all carts, or create a new cart.
    """
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, format=None):
        user = request.user
        carts = Cart.objects.all().filter(owner=user)
        print(len(carts))
        serializer = CartSerializer(carts, many=True)
        return Response(serializer.data)

class CartDetail(APIView):
    """
    Retrieve, update or delete a cart instance.
    """
    permission_classes = [permissions.IsAuthenticated]
    def get_object(self, user):
        try:
            obj = Cart.objects.get(owner=user)
            return obj
        except Cart.DoesNotExist:
            cart = Cart(owner=user)
            cart.save()
            return cart

    def get(self, request, format=None):
        cart = self.get_object(request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def put(self, request, format=None):
        cart = self.get_object(request.user)
        itemId = request.data.get("item")
        if cart.items.filter(pk=itemId).exists():
            cart.items.remove(itemId)
        else:
            cart.items.add(itemId)
        cart.save()
        serializer = CartSerializer(cart)
        return Response(serializer.data)
        #return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        cart = self.get_object(request.user)
        cart.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

