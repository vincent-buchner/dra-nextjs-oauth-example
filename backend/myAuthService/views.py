from django.http import JsonResponse
from django.shortcuts import render

# views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .middleware import verify_google_token, verify_access_token

# @api_view(['GET'])
# def protected_view(request):
#     auth_header = request.headers.get('Authorization')
#     if not auth_header or not auth_header.startswith('Bearer '):
#         return Response({"error": "Authorization header required"}, status=401)
    
#     token = auth_header.split("Bearer ")[1]
#     user_info = verify_google_token(token)
#     print(user_info)
#     return JsonResponse({"message": "Protected content", "user": user_info})

@api_view(['GET'])
def protected_view(request):

    print("Verifying access token")
    # Extract the access token from the Authorization header
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return Response({"error": "Authorization header missing"}, status=401)
    
    access_token = auth_header.split("Bearer ")[1]
    try:
        token_info = verify_access_token(access_token)
        return Response({"message": "Access granted", "user": token_info})
    except Exception as e:
        return Response({"error": str(e)}, status=401)