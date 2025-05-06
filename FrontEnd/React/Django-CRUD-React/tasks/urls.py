from django.urls import path, include
from rest_framework import routers
from tasks import views
from rest_framework.documentation import include_docs_urls
 
# api versioning / versionados de api
router = routers.DefaultRouter()
router.register(r'task', views.TaskView, 'task') # traer desde views, la funcion "N" y darle el nombre task

urlpatterns = [
    path("api/v1/", include(router.urls)), # traer las urls de router ==> GET,POST,PUT,DELETE ...
    path("docs/", include_docs_urls(title="Task API")), #urls de modulo de auto documentacion
]
