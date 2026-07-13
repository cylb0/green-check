from django import forms
from django.contrib import admin
from django.utils.text import Truncator
from diagnostic.models import AdviceRule

class TreatmentChoiceField(forms.ModelMultipleChoiceField):
    def label_from_instance(self, obj):
        return f"{obj.title_en} - {Truncator(obj.description_en).chars(100)}"

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

    filter_horizontal = ['treatments']

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
        ("Traitements associés", {
            'fields': ('treatments',),
        }),
    )

    def formfield_for_manytomany(self, db_field, request, **kwargs):
        if db_field.name == 'treatments':
            kwargs['form_class'] = TreatmentChoiceField
        return super().formfield_for_manytomany(db_field, request, **kwargs)

    def get_list_display(self, request):
        return self.list_display

    ordering = ('disease_label', 'plant_type')
