import jwt
from datetime import datetime, timedelta, timezone
from django.conf import settings
from django.contrib.auth import get_user_model
from ninja.security import APIKeyCookie

User = get_user_model()

def create_access_token(user) -> str:
    payload = {
        'user_id': str(user.id),
        'version': user.token_version,
        'exp': datetime.now(timezone.utc) + timedelta(hours=24),
        'type': 'access'
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

def create_refresh_token(user) -> str:
    payload = {
        'user_id': str(user.id),
        'version': user.token_version,
        'exp': datetime.now(timezone.utc) + timedelta(days=7),
        'type': 'refresh'
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

class CookieJWTAuth(APIKeyCookie):
    param_name = 'access_token'

    def authenticate(self, request, key):
        """
            Authenticate the user with a JWT retrieved inside cookies.
            It first looks for the cookie with APIKeyCookies internal mechanism, APIKeyCookies
            looks for cookie in request.COOKIES[param_name] by default.
            It is only passed as `key` if request goes through complete ninja middleware,
            hence fallback 'if not key:' when Django client is used (testing).
            Retrieves access_token cookie, decode it and returns the User object if 
            token is valid or None otherwise.
        """
        if not key:
            key = request.COOKIES.get('access_token')
        if not key:
            return None
        try:
            payload = jwt.decode(key, settings.SECRET_KEY, algorithms=['HS256'])
            if payload.get('type') != 'access':
                return None
            user = User.objects.get(id=payload['user_id'])
            if user.token_version != payload.get('version'):
                return None
            return user
        except (jwt.ExpiredSignatureError, jwt.InvalidTokenError, User.DoesNotExist):
            return None
