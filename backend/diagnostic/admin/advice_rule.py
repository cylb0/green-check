from django.contrib import admin
from diagnostic.models import AdviceRule

@admin.register(AdviceRule)
class AdviceRuleAdmin(admin.ModelAdmin):
    list_display = [
        'disease_label', 
        'plant_type', 
        'severity', 
        'exposure', 
        'soil_type'
    ]
    
    list_filter = [
        'disease_label', 
        'plant_type', 
        'severity', 
        'exposure', 
        'soil_type'
    ]
    
    search_fields = ['advice_text', 'disease_label']

    fieldsets = (
        ("Identification de la règle", {
            'fields': ('disease_label', 'plant_type', 'severity'),
        }),
        ("Conditions environnementales", {
            'fields': ('exposure', 'soil_type'),
            'description': "Laissez vide si la règle s'applique à tous les types d'expositions/sols."
        }),
        ("Contenu du conseil", {
            'fields': ('advice_text',),
        }),
    )

    def get_list_display(self, request):
        return self.list_display

    ordering = ('disease_label', 'plant_type')
