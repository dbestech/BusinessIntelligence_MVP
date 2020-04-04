from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('upload_file', views.upload_file, name='file-upload'),
    path('get_filtered_data', views.get_filtered_data, name='get_filtered_data')
]