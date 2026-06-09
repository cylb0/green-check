from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model
from diagnostic.models import Subscription

User = get_user_model()

class SubscriptionInline(admin.TabularInline):
    model = Subscription
    extra = 0
    readonly_fields = ('activated_at', 'current_period_start', 'quota_used')
    ordering = ('-current_period_end',)

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    inlines = [SubscriptionInline]
    ordering = ['email']
    list_display = ['email', 'is_active', 'is_staff', 'created_at']
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide'),
            'fields': ('email', 'password1', 'password2'),
        }),
    )
    search_fields = ['email']
    readonly_fields = ['created_at']
