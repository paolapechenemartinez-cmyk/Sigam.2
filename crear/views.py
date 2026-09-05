from django.shortcuts import render
from rest_framework.views import APIView   
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .serializer import CrearUsuarioSerializer, LoginSerializer
from .models import Crear

# Create your views here.

class CrearView(APIView):
    @swagger_auto_schema(
        request_body=CrearUsuarioSerializer
    )
    def post(self, request):
        nombres=request.data.get("nombres")
        edad=request.data.get("edad")
        correo=request.data.get("correo")
        contraseña=request.data.get("contraseña")
        usuarioNuevo=Crear.objects.create_User(
            nombres=nombres,
            edad=edad,
            correo=correo,
            contraseña=contraseña
        )
        token=Token.objects.create(user=usuarioNuevo)
        return Response({
            "mensaje":"Usuario creado correctamente",
            "token": token.key
        })

class LoginView(APIView):
        @swagger_auto_schema(
            request_body=LoginSerializer
        )
        def post(self, request):
            correo=request.data.get("correo")
            contraseña=request.data.get("contraseña")
            usuario=User.objects.filter(correo=correo, contraseña=contraseña).first()
            if usuario:
                token, created = Token.objects.get_or_create(user=usuario)
                return Response({
                    "mensaje":"Perfecto ✅",
                    "token": token.key
                })
            else:
                return Response({
                    "mensaje":"Usuario Denegado ⛔️ Por favor verificamente nuevamente"
                })
