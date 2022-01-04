from django.db import models
from users.models import User
from orders.models import Order
class Item(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=50, blank=False)
    description = models.CharField(max_length=250, blank=True, default='')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True)

    class Meta:
        ordering = ['-created_at']