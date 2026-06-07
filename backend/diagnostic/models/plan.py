from django.db import models

class Plan(models.Model):
    id = models.SmallAutoField(primary_key=True)
    name = models.CharField(max_length=20, unique=True)
    description = models.TextField(blank=True, null=True)
    quota_limit = models.PositiveIntegerField(help_text="Maximum allowed quota")
    price_in_cents = models.PositiveIntegerField(default=0, help_text="Price in cents")

    is_active = models.BooleanField(default=True)

    duration_days = models.PositiveIntegerField(default=30)

    @property
    def price_display(self):
        return f"{self.price_in_cents / 100:.2f}"
    
    def __str__(self):
        return self.name
