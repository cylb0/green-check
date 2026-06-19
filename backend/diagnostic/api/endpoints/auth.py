from auth import create_access_token, create_refresh_token
from diagnostic.api.schemas.auth import ChangePasswordSchema, LoginSchema, RegisterSchema, UserOut
from ninja import Router, Status
from django.contrib.auth import authenticate, get_user_model
from django.http import HttpResponse
from ninja.errors import HttpError
from django.db.models import F
from django.middleware.csrf import get_token

router = Router()
User = get_user_model()

@router.post('/register', response={201: UserOut}, auth=None)
def register(request, payload: RegisterSchema):
    if User.objects.filter(email=payload.email).exists():
        raise HttpError(400, "Email already exists")
    return Status(201, User.objects.create_user(email=payload.email, password=payload.password))

@router.post('/login', response={200: UserOut}, auth=None)
def login(request, payload: LoginSchema, response: HttpResponse):
    user = authenticate(request, email=payload.email, password=payload.password)
    if not user:
        raise HttpError(401, "Invalid credentials")
    
    csrf_token = get_token(request)
    response.set_cookie('csrftoken', csrf_token, samesite='Lax', secure=False)
    response.set_cookie('access_token', create_access_token(user), httponly=True, samesite='Lax', secure=False)
    response.set_cookie('refresh_token', create_refresh_token(user), httponly=True, samesite='Lax', secure=False)
    return UserOut(id=str(user.id), email=user.email)

@router.post('/logout', response={204: None})
def logout(request):
    User.objects.filter(pk=request.auth.pk).update(token_version=F('token_version') + 1)
    response = HttpResponse(status=204)
    response.delete_cookie('access_token')
    response.delete_cookie('refresh_token')
    return response

@router.get('/me', response={200: UserOut})
def me(request):
    return UserOut(id=str(request.auth.id), email=request.auth.email)

@router.post('/change-password', response={204: None})
def change_password(request, payload: ChangePasswordSchema):
    user = request.auth
    
    if not user.check_password(payload.old_password):
        raise HttpError(400, "Old password is incorrect")
    
    user.set_password(payload.new_password)
    user.save()

    return Status(204, None)