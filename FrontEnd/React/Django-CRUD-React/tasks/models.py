from django.db import models

# Create your models here. / crear la tabla en BBDD de el modulo/app

class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    done = models.BooleanField(default=False)
    
    def __str__(self):
        return self.title # ver el titulo en la tabla de vistas