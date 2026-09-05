"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.contrib.auth import views as auth_views
from usuarios.views import login_usuario, inicio


urlpatterns = [

    path(
        'admin/',
        admin.site.urls
    ),

    # LOGIN
    path(
        'login/',
        login_usuario,
        name='login'
    ),

    # INICIO
    path(
        'inicio/',
        inicio,
        name='inicio'
    ),

    # RECUPERAR CONTRASEÑA
    path(
        'recuperar/',
        auth_views.PasswordResetView.as_view(
            template_name='usuarios/recuperar.html',
            email_template_name='registration/password_reset_email.html',
            subject_template_name='registration/password_reset_subject.txt',
            success_url='/recuperar/enviado/'
        ),
        name='password_reset'
    ),

    # CORREO ENVIADO
    path(
        'recuperar/enviado/',
        auth_views.PasswordResetDoneView.as_view(
            template_name='usuarios/recuperar_enviado.html'
        ),
        name='password_reset_done'
    ),

    # CREAR NUEVA CONTRASEÑA
    path(
        'recuperar/<uidb64>/<token>/',
        auth_views.PasswordResetConfirmView.as_view(
            template_name='usuarios/password_reset_confirm.html',
            success_url='/recuperar/completado/'
        ),
        name='password_reset_confirm'
    ),

    # CONTRASEÑA CAMBIADA
    path(
        'recuperar/completado/',
        auth_views.PasswordResetCompleteView.as_view(
            template_name='usuarios/password_reset_complete.html'
        ),
        name='password_reset_complete'
    ),
]