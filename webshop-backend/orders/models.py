from django.db import models
from users.models import User

class Order(models.Model):
    consumer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    paid_at = models.DateTimeField(null=True)

    class Meta:
        ordering = ['paid_at']