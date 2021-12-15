from django.contrib.auth import get_user_model
from .models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'email', 'username', 'password', 'is_staff', 'is_active', 'date_created']
        extra_kwargs = {
            'date_created': {'read_only': True},
            'password': {'write_only': True},
            'is_active': {'default': True},
        }

    def update(self, instance, validated_data):
        if ('password' in validated_data):
            raise serializers.ValidationError("Use API endpoint /users/set_password/ to update passwords.")
        elif ('is_staff' in validated_data):
            raise serializers.ValidationError("Contact the database administrator to update is_staff")
        elif ('is_superuser' in validated_data):
            raise serializers.ValidationError("Contact the database administrator to update is_superuser")
        return super().update(instance, validated_data)


