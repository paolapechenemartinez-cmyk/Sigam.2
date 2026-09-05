from django.urls import path
from .views import LeerUsuarios, CrearUsuario

urlpatterns = [
    path('usuarios/', LeerUsuarios.as_view(), name='leer-usuarios'),
    path('usuarios/crear/', CrearUsuario.as_view(), name='crear-usuario'),
    path('usuarios/<int:id>/', CrearUsuario.as_view(), name='gestionar-usuario'),
]