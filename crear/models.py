from django.db import models


# Create your models here.

class Crear(models.Model):
    nombres=models.CharField(max_length=30)
    edad=models.IntegerField()
    correo=models.EmailField(max_length=30)
    contraseña=models.CharField(max_length=30)

    def __str__(self):
        return self.nombres

