from django.contrib import admin
from diagnostic.models.plant_submission import PlantSubmission

@admin.register(PlantSubmission)
class PlantSubmissionAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'plant_type', 'exposure', 'soil_type', 'submitted_at']
    list_filter = ['exposure', 'soil_type', 'submitted_at']
    search_fields = ['plant_type', 'user__email']
    readonly_fields = ['id', 'submitted_at']

    fieldsets = (
        ("User Info", {
            'fields': ('user',)
        }),
        ("Plant Data", {
            'fields': (
                'plant_type',
                'exposure',
                'soil_type',
                'latitude',
                'longitude',
                'image',
            )
        }),
        ("Metadata", {
            'fields': ('id', 'submitted_at'),
        }),
    )

    ordering = ('-submitted_at',)

    def has_add_permission(self, request, obj=None):
        return False
    
    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False
