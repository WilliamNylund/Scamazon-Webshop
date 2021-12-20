from .models import Item
from rest_framework import serializers
from items.serializers import ItemSerializer

class CartSerializer(serializers.ModelSerializer):
    paid_at = serializers.DateTimeField(format="%d.%m.%Y %H:%M", required=False, read_only=True)
    items = ItemSerializer(many=True)
    class Meta:
        model = Item
        fields = ['id', 'owner', 'paid_at', 'items']
        extra_kwargs = {
            'owner': {'read_only': True}
        }