from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone
import uuid

class UserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("Email required")
        if not password:
            raise ValueError("Password required")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def active_subscriptions(self):
        return self.subscriptions.active()

    def active_plans(self):
        from diagnostic.models.plan import Plan
        from diagnostic.models.subscription import Subscription
        return Plan.objects.filter(
            subscriptions__user=self,
            subscriptions__status=Subscription.StatusChoice.ACTIVE,
            subscriptions__current_period_end__gte=timezone.now().date()
        ).distinct()
    
    def subscribe(self, plan):
        from diagnostic.models.subscription import Subscription
        return Subscription.objects.subscribe(user=self, plan=plan)

    def __str__(self):
        return self.email
