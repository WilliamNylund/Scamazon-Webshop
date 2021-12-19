from django.db import models
from users.models import User

class Item(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=50, blank=False)
    description = models.CharField(max_length=250, blank=True, default='')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    
    class Meta:
        ordering = ['created_at']