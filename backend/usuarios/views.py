from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login


def login_usuario(request):

    if request.method == "POST":

        username = request.POST.get("username")
        password = request.POST.get("password")

        usuario = authenticate(
            request,
            username=username,
            password=password
        )

        if usuario is not None:
            login(request, usuario)

            return redirect("inicio")

        return render(
            request,
            "usuarios/login.html",
            {
                "error": "Usuario o contraseña incorrectos."
            }
        )

    return render(
        request,
        "usuarios/login.html"
    )


def inicio(request):
    return render(
        request,
        "usuarios/inicio.html"
    )