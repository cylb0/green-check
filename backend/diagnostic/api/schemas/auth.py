from ninja import ModelSchema, Schema
from django.contrib.auth import get_user_model
from pydantic import field_validator

User = get_user_model()

class RegisterSchema(Schema):
    email: str
    password: str

class LoginSchema(Schema):
    email: str
    password: str

class ChangePasswordSchema(Schema):
    old_password: str
    new_password: str
    new_password_confirm: str

    @field_validator('new_password_confirm')
    def passwords_match(cls, v, values):
        if 'new_password' in values.data and v != values.data['new_password']:
            raise ValueError("Passwords do not match")
        return v

class UserOut(ModelSchema):
    class Meta:
        model = User
        fields = ['id', 'email']
