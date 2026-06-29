import pytest
from diagnostic.models import AdviceRule
from diagnostic.models.choices import DiseaseLabelChoice, ExposureChoice, PlantTypeChoice, SoilTypeChoice
from django.core.exceptions import ValidationError
from django.db import IntegrityError

@pytest.fixture
def rule():
    return AdviceRule.objects.create(
        plant_type=PlantTypeChoice.TOMATO,
        disease_label=DiseaseLabelChoice.BACTERIAL_SPOT,
        severity=AdviceRule.SeverityChoice.MEDIUM,
        exposure=ExposureChoice.FULL_SUN,
        soil_type=SoilTypeChoice.CLAY,
        advice_text='Advice text'
    )

def make_rule(**kwargs):
    defaults = dict(
        disease_label=DiseaseLabelChoice.BACTERIAL_SPOT,
        plant_type=None,
        soil_type=None,
        exposure=None,
        advice_text='Advice',
    )
    return AdviceRule.objects.create(**defaults | kwargs)

@pytest.mark.django_db
class TestAdviceRuleBestMatch:
    DISEASE = DiseaseLabelChoice.BACTERIAL_SPOT
    PLANT = PlantTypeChoice.TOMATO
    SOIL = SoilTypeChoice.CLAY
    EXPO = ExposureChoice.FULL_SUN

    def test_exact_match_wins_over_generic(self):
        generic = make_rule(disease_label=self.DISEASE)
        exact = make_rule(disease_label=self.DISEASE, plant_type=self.PLANT, soil_type=self.SOIL, exposure=self.EXPO)
        result = AdviceRule.objects.best_match(self.DISEASE, self.PLANT, self.SOIL, self.EXPO)
        assert result == exact

    def test_plant_and_soil_wins_over_plant_only(self):
        plant_only = make_rule(disease_label=self.DISEASE, plant_type=self.PLANT)
        plant_and_soil = make_rule(disease_label=self.DISEASE, plant_type=self.PLANT, soil_type=self.SOIL)
        result = AdviceRule.objects.best_match(self.DISEASE, self.PLANT, self.SOIL, self.EXPO)
        assert result == plant_and_soil

    def test_plant_only_wins_over_fully_generic(self):
        fully_generic = make_rule(disease_label=self.DISEASE)
        plant_only = make_rule(disease_label=self.DISEASE, plant_type=self.PLANT)
        result = AdviceRule.objects.best_match(self.DISEASE, self.PLANT, self.SOIL, self.EXPO)
        assert result == plant_only

    def test_returns_none_when_no_rule_for_disease(self):
        make_rule(disease_label=DiseaseLabelChoice.COMMON_RUST)
        result = AdviceRule.objects.best_match(self.DISEASE, self.PLANT, self.SOIL, self.EXPO)
        assert result is None

    def ignores_rules_for_other_disease(self):
        make_rule(disease_label=DiseaseLabelChoice.COMMON_RUST, plant_type=self.PLANT, soil_type=self.SOIL, exposure=self.EXPO)
        good = make_rule(disease_label=self.DISEASE)
        result = AdviceRule.objects.best_match(self.DISEASE, self.PLANT, self.SOIL, self.EXPO)
        assert result == good

    def test_rule_with_different_plant_is_excluded(self):
        make_rule(disease_label=self.DISEASE, plant_type=PlantTypeChoice.CHERRY)
        result = AdviceRule.objects.best_match(self.DISEASE, self.PLANT, self.SOIL, self.EXPO)
        assert result is None

    def test_rule_with_different_soil_is_excluded(self):
        make_rule(disease_label=self.DISEASE, plant_type=self.PLANT, soil_type=SoilTypeChoice.SANDY)
        result = AdviceRule.objects.best_match(self.DISEASE, self.PLANT, self.SOIL, self.EXPO)
        assert result is None

    def test_rule_with_different_exposure_is_excluded(self):
        make_rule(disease_label=self.DISEASE, plant_type=self.PLANT, exposure=ExposureChoice.FULL_SHADE)
        result = AdviceRule.objects.best_match(self.DISEASE, self.PLANT, self.SOIL, self.EXPO)
        assert result is None

    def test_returns_none_on_empty_table(self):
        result = AdviceRule.objects.best_match(self.DISEASE, self.PLANT, self.SOIL, self.EXPO)
        assert result is None

    def test_generic_rule_matches_any_context(self):
        generic = make_rule(disease_label=self.DISEASE)
        result = AdviceRule.objects.best_match(self.DISEASE, PlantTypeChoice.POTATO, soil_type=SoilTypeChoice.SANDY, exposure=ExposureChoice.PARTIAL_SHADE)
        assert result == generic

@pytest.mark.django_db
class TestAdviceRule:
    def test_create_advice_rule(self, rule):
        assert rule.pk is not None
        assert rule.plant_type == PlantTypeChoice.TOMATO
        assert rule.disease_label == DiseaseLabelChoice.BACTERIAL_SPOT
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
                disease_label=DiseaseLabelChoice.BACTERIAL_SPOT,
                severity=AdviceRule.SeverityChoice.MEDIUM,
                exposure=ExposureChoice.FULL_SUN,
                soil_type=SoilTypeChoice.CLAY,
                advice_text='Advice text'
            )
