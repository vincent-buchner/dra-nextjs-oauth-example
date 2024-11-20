# utils.py
from google.oauth2 import id_token
from google.auth.transport import requests
import requests as req
from rest_framework.exceptions import AuthenticationFailed
from dotenv import load_dotenv
import os

load_dotenv()


GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")

def verify_google_token(token):
    try:
        # Verify the token
        print(GOOGLE_CLIENT_ID)
        print(token)
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)
        print(idinfo)
        return idinfo  # Token is valid
    except ValueError as e:
        raise AuthenticationFailed(f"Invalid token: {e}")
    
def verify_access_token(access_token):
    """
    Verify the Google OAuth 2.0 access token using Google's introspection endpoint.
    """
    GOOGLE_TOKEN_INFO_URL = "https://www.googleapis.com/oauth2/v3/tokeninfo"
    GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
    
    response = req.get(GOOGLE_TOKEN_INFO_URL, params={"access_token": access_token})
    
    if response.status_code != 200:
        raise AuthenticationFailed("Invalid or expired access token")
    
    token_info = response.json()

    if token_info.get("aud") != GOOGLE_CLIENT_ID:
        raise AuthenticationFailed("Invalid token audience")

    return token_info  # Contains details like email, scope, and expiration
