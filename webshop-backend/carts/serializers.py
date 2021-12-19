from .models import Item
from rest_framework import serializers

class CartSerializer(serializers.ModelSerializer):
    paid_at = serializers.DateTimeField(format="%d.%m.%Y %H:%M", required=False, read_only=True)
    items = serializers.PrimaryKeyRelatedField(queryset=Item.objects.all(), many=True)

    class Meta:
        model = Item
        fields = ['id', 'owner', 'paid_at', 'items']
        extra_kwargs = {
            'date_created': {'read_only': True}
        }