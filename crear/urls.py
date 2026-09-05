from django.urls import path
from .views import CrearView, LoginView

urlpatterns = [ 
    path('crear/', CrearView.as_view()),
    path('login/', LoginView.as_view()),
]