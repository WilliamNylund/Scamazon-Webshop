from django.db import models

class Item(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=50, blank=False)
    description = models.CharField(max_length=250, blank=True, default='')
    price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        ordering = ['created_at']