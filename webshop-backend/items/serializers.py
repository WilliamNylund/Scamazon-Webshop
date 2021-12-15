from .models import Item
from rest_framework import serializers

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'title', 'description', 'price', 'created_at']
        extra_kwargs = {
            'date_created': {'read_only': True}
        }