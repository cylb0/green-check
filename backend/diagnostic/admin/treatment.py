from django.contrib import admin
from django.db.models import Count
from diagnostic.models import Treatment

@admin.register(Treatment)
class TreatmentAdmin(admin.ModelAdmin):
    list_display = ['title', 'icon', 'rules_count']
    list_filter = ['icon']
    search_fields = ['title', 'description']

    fieldsets = (
        ("Présentation", {
            'fields': ('title', 'icon'),
            'description': "L'icône est une clé sémantique, associée à un pictogramme côté application."
        }),
        ("Contenu", {
            'fields': ('description',),
        }),
    )

    ordering = ('title',)

    def get_queryset(self, request):
        return super().get_queryset(request).annotate(_rules_count=Count('advice_rules'))

    @admin.display(description="Règles associées", ordering='_rules_count')
    def rules_count(self, obj):
        return obj._rules_count
