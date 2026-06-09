from django.contrib import admin
from diagnostic.models import AuditLog

@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = ['id']
    list_filter = ['action']
    search_fields = ['user', 'ip_hash']

    ordering = ['-created_at']

    def has_add_permission(self, request, obj=None):
        return False
    
    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False
