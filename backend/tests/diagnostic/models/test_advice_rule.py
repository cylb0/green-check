import pytest
from diagnostic.models import AdviceRule
from diagnostic.models.choices import DiseaseLabelChoice, ExposureChoice, PlantTypeChoice, SoilTypeChoice
from django.core.exceptions import ValidationError
from django.db import IntegrityError

@pytest.fixture
def rule():
    return AdviceRule.objects.create(
        plant_type=PlantTypeChoice.TOMATO,
        disease_label=DiseaseLabelChoice.EARLY_BLIGHT,
        severity=AdviceRule.SeverityChoice.MEDIUM,
        exposure=ExposureChoice.FULL_SUN,
        soil_type=SoilTypeChoice.CLAY,
        advice_text='Advice text'
    )

@pytest.mark.django_db
class TestAdviceRule:
    def test_create_advice_rule(self, rule):
        assert rule.pk is not None
        assert rule.plant_type == PlantTypeChoice.TOMATO
        assert rule.disease_label == DiseaseLabelChoice.EARLY_BLIGHT
        assert rule.severity == AdviceRule.SeverityChoice.MEDIUM
        assert rule.exposure == ExposureChoice.FULL_SUN
        assert rule.soil_type == SoilTypeChoice.CLAY
        assert rule.advice_text == 'Advice text'

    def test_create_advice_rule_with_empty_fields(self):
        rule = AdviceRule(
            plant_type=PlantTypeChoice.TOMATO,
            disease_label=None,
            severity=AdviceRule.SeverityChoice.MEDIUM,
            exposure=ExposureChoice.FULL_SUN,
            soil_type=SoilTypeChoice.CLAY,
            advice_text='Advice text'
        )

        with pytest.raises(ValidationError) as e:
            rule.full_clean()

        assert 'disease_label' in e.value.message_dict
            
    def test_create_advice_rule_with_invalid_fields(self):
        rule = AdviceRule(
            plant_type='Foo plant',
            disease_label='Foo disease',
            severity=AdviceRule.SeverityChoice.MEDIUM,
            exposure=ExposureChoice.FULL_SUN,
            soil_type=SoilTypeChoice.CLAY,
            advice_text='Advice text'
        )

        with pytest.raises(ValidationError) as e:
            rule.full_clean()

        assert 'plant_type' in e.value.message_dict

    def test_update_advice_rule(self, rule):
        new_advice_text = 'Updated advice text'
        rule.advice_text = new_advice_text
        rule.save()

        updated_rule = AdviceRule.objects.get(pk=rule.pk)

        assert updated_rule.advice_text == new_advice_text

    def test_delete_advice_rule(self, rule):
        rule.delete()

        with pytest.raises(AdviceRule.DoesNotExist):
            AdviceRule.objects.get(pk=rule.pk)

    def test_unique_constraint(self, rule):
        with pytest.raises(IntegrityError):
            AdviceRule.objects.create(
                plant_type=PlantTypeChoice.TOMATO,
                disease_label=DiseaseLabelChoice.EARLY_BLIGHT,
                severity=AdviceRule.SeverityChoice.MEDIUM,
                exposure=ExposureChoice.FULL_SUN,
                soil_type=SoilTypeChoice.CLAY,
                advice_text='Advice text'
            )
