from rest_framework import viewsets # importar vistas
from .serializer import TaskSerializer # importar campos asigandos para el JSON
from .models import Task # campos de la tabla

# Create your views here.
# crear clase con las vistas que se van a usar en el crud "Reutilizar"
class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all() # traer todos los campos