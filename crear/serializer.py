from rest_framework import serializers

class CrearUsuarioSerializer(serializers.Serializer):
    nombres = serializers.CharField(max_length=30)
    edad = serializers.IntegerField()
    correo = serializers.EmailField(max_length=30)
    contraseña = serializers.CharField(max_length=30)


class LoginSerializer(serializers.Serializer):
    correo = serializers.EmailField(max_length=30)
    contraseña = serializers.CharField(max_length=30)