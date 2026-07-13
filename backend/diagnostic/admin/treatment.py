from django.contrib import admin
from django.db.models import Count
from diagnostic.models import Treatment

@admin.register(Treatment)
class TreatmentAdmin(admin.ModelAdmin):
    list_display = ['title_en', 'icon', 'rules_count']
    list_filter = ['icon']
    search_fields = ['title_en', 'title_fr', 'description_en', 'description_fr']
    ordering = ('title_en',)

    fieldsets = (
        ("Présentation", {'fields': ('icon',)}),
        ("Français", {'fields': ('title_fr', 'description_fr')}),
        ("English", {'fields': ('title_en', 'description_en')}),
    )

    def get_queryset(self, request):
        return super().get_queryset(request).annotate(_rules_count=Count('advice_rules'))

    @admin.display(description="Règles associées", ordering='_rules_count')
    def rules_count(self, obj):
        return obj._rules_count
