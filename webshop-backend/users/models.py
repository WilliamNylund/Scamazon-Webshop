from django.contrib.auth.models import AbstractBaseUser
from django.db import models
from django.utils import timezone
from .managers import UserManager

class User(AbstractBaseUser):
    email = models.EmailField('email address', max_length=255, unique=True, blank=False, null=False)
    username = models.CharField('username', unique=False, max_length=20, blank=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_created = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def __str__(self):
        return self.email