from rest_framework import serializers
from .models import Task
# empezar a crear el Json para la Api

# campos
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task # modelo
        # fields = ('id', 'title', 'description', 'done') # traer los campos que se quiera o todos añadiendolos manualmente
        fields = '__all__' # traer todos los campos automaticamente
        