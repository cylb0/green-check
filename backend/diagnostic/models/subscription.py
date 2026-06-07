from datetime import timedelta
from django.conf import settings
from django.db import models, transaction
from django.utils import timezone

class SubscriptionQuerySet(models.QuerySet):
    def active(self):
        return self.filter(
            status=Subscription.StatusChoice.ACTIVE,
            current_period_end__gte=timezone.now().date()
        )

    def expired(self):
        return self.filter(status=Subscription.StatusChoice.EXPIRED)
    
    def stale(self):
        return self.filter(status=Subscription.StatusChoice.ACTIVE, current_period_end__lt=timezone.now().date())
    
class SubscriptionManager(models.Manager):
    def get_queryset(self):
        return SubscriptionQuerySet(self.model, using=self._db)
    
    def active(self):
        return self.get_queryset().active()
    
    def expired(self):
        return self.get_queryset().expired()
    
    def stale(self):
        return self.get_queryset().stale()
    
    def subscribe(self, user, plan):
        already_active = self.active().filter(user=user, plan=plan).exists()
        if already_active:
            raise ValueError(f"User already has an active subscription to '{plan}'.")

        return self.create(
            user=user,
            plan=plan,
            current_period_start=timezone.now().date(),
            current_period_end=timezone.now().date() + timedelta(days=plan.duration_days)
        )
    
    def renew(self, user):
        with transaction.atomic():
            current = self.active().filter(user=user).first()
            if current is None:
                raise ValueError("No active subscription to renew.")
            current.expire()
            return self.create(
                user=user,
                plan=current.plan,
                current_period_start=timezone.now().date(),
                current_period_end=timezone.now().date() + timedelta(days=current.plan.duration_days)
            )
    
    def upgrade(self, user, new_plan):
        with transaction.atomic():
            current = self.active().filter(user=user).first()
            if current is None:
                raise ValueError("No active subscription to upgrade from.")
            if current.plan == new_plan:
                raise ValueError("User is already on this plan.")
            
            current.expire()
            return self.create(
                user=user,
                plan=new_plan,
                current_period_start=timezone.now().date(),
                current_period_end=timezone.now().date() + timedelta(days=new_plan.duration_days)
            )

class Subscription(models.Model):
    class StatusChoice(models.TextChoices):
        ACTIVE = 'active', 'Active'
        CANCELED = 'canceled', 'Cancelled'
        EXPIRED = 'expired', 'Expried'
        PAST_DUE = 'past_due', 'Pas due'

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='subscriptions')
    plan = models.ForeignKey('diagnostic.Plan', on_delete=models.CASCADE, related_name='subscriptions')
    status = models.CharField(max_length=20, choices=StatusChoice.choices, default=StatusChoice.ACTIVE)

    quota_used = models.PositiveIntegerField(default=0)

    activated_at = models.DateField(auto_now_add=True)
    current_period_start = models.DateField(default=timezone.now)
    current_period_end = models.DateField()

    canceled_at = models.DateField(null=True, blank=True)

    objects = SubscriptionManager()

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'plan'],
                condition=models.Q(status='active'),
                name='unique_active_subscription_per_plan'
            )
        ]
    
    @property
    def is_expired(self) -> bool:
        return timezone.now().date() > self.current_period_end
    
    @property
    def quota_remaining(self) -> int:
        return max(0, self.plan.quota_limit - self.quota_used)
    
    @property
    def has_quota(self) -> bool:
        return not self.is_expired and self.quota_remaining > 0
    
    def expire(self):
        self.status = self.StatusChoice.EXPIRED
        self.save(update_fields=['status'])

    def cancel(self):
        self.status = self.StatusChoice.CANCELED
        self.canceled_at = timezone.now().date()
        self.save(update_fields=['status', 'canceled_at'])

    def increment_quota(self, amount: int = 1):
        self.quota_used = models.F('quota_used') + amount
        self.save(update_fields=['quota_used'])
        self.refresh_from_db(fields=['quota_used'])

    def reset_quota(self):
        self.quota_used = 0
        self.save(update_fields=['quota_used'])

    def __str__(self):
        return f"{self.user} - {self.plan} ({self.status}, ends {self.current_period_end})"

