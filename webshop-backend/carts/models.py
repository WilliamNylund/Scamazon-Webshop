from django.db import models
from users.models import User
from items.models import Item

class Cart(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='carts')
    items = models.ManyToManyField(Item, related_name='carts')
    paid_at = models.DateTimeField(null=True)

    class Meta:
        ordering = ['paid_at']