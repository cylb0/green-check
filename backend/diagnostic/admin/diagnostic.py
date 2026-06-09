from django.contrib import admin
from diagnostic.models.diagnostic import Diagnostic

@admin.register(Diagnostic)
class DiagnosticAdmin(admin.ModelAdmin):
    list_display = ['submission', 'detected_plant', 'detected_disease', 'status', 'created_at']
    list_filter = ['status', 'detected_plant', 'detected_disease']
    search_fields = ['submission__user__email', 'detected_plant']
    readonly_fields = [
        'id', 'submission', 'advice_rule', 'status', 'detected_plant', 
        'plant_confidence', 'detected_disease', 'disease_confidence', 
        'advice_text', 'raw_model_response', 'created_at'
    ]

    fieldsets = (
        ("Informations générales", {
            'fields': ('id', 'submission', 'created_at', 'status'),
        }),
        ("Résultats de l'analyse (IA)", {
            'fields': (
                'detected_plant', 
                'plant_confidence', 
                'detected_disease', 
                'disease_confidence',
            ),
            'description': "Scores de confiance retournés par le modèle."
        }),
        ("Conseils et résultats", {
            'fields': ('advice_rule', 'advice_text'),
        }),
        ("Données brutes", {
            'fields': ('raw_model_response',),
            'classes': ('collapse',), 
        }),
    )

    def has_add_permission(self, request, obj=None):
        return False
    
    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    ordering = ('-created_at',)
