from django import forms
from django.contrib import admin
from diagnostic.models.plan import Plan

class PlanForm(forms.ModelForm):
    price_euros = forms.DecimalField(
        label="Prix (€)",
        max_digits=10,
        decimal_places=2,
        help_text = "Price will be automatically converted to cents."
    )

    class Meta:
        model = Plan
        fields = ['name', 'description', 'quota_limit', 'price_euros', 'is_active', 'duration_days']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance.pk:
            self.fields['price_euros'].initial = self.instance.price_in_cents / 100

    def save(self, commit=True):
        instance = super().save(commit=False)
        instance.price_in_cents = int(self.cleaned_data['price_euros'] * 100)
        if commit:
            instance.save()
        return instance

@admin.register(Plan)
class PlanAdmin(admin.ModelAdmin):
    form = PlanForm
    list_display = ['name', 'description', 'price_display', 'is_active', 'duration_days']