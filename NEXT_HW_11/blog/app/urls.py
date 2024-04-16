from app import views
from django.urls import path

urlpatterns = [
    path('', views.home, name='home'),
    path('detail/<int:post_pk>', views.detail, name='detail'),
    path('new/', views.new, name='new'),
    path('edit/<int:post_pk>', views.edit, name='edit'),
    path('delete/<int:post_pk>', views.delete, name='delete'),
    path('delete-comment/<int:post_pk>/<int:comment_pk>', views.delete_comment, name='delete_comment'),
]