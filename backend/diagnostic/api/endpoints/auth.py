from auth import create_access_token, create_refresh_token
from diagnostic.api.schemas.auth import LoginSchema, RegisterSchema, UserOut
from ninja import Router
from django.contrib.auth import authenticate, get_user_model
from django.http import HttpResponse
from ninja.errors import HttpError
from django.db.models import F

router = Router()
User = get_user_model()

@router.post('/register', response={201: UserOut}, auth=None)
def register(request, payload: RegisterSchema):
    if User.objects.filter(email=payload.email).exists():
        raise HttpError(400, "Email already exists")
    return 201, User.objects.create_user(email=payload.email, password=payload.password)

@router.post('/login', response={200: None}, auth=None)
def login(request, payload: LoginSchema):
    user = authenticate(request, email=payload.email, password=payload.password)
    if not user:
        raise HttpError(401, "Invalid credentials")
    
    response = HttpResponse(status=200)
    response.set_cookie('access_token', create_access_token(user), httponly=True, samesite='Lax', secure=False)
    response.set_cookie('refresh_token', create_refresh_token(user), httponly=True, samesite='Lax', secure=False)
    return response

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