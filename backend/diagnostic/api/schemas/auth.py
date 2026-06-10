from ninja import ModelSchema, Schema
from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterSchema(Schema):
    email: str
    password: str

class LoginSchema(Schema):
    email: str
    password: str

class UserOut(ModelSchema):
    class Meta:
        model = User
        fields = ['id', 'email']
