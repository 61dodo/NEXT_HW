from django.contrib.auth.models import User
from django.db import models


class Post(models.Model):
   title = models.CharField(max_length=50)
   content = models.TextField()
   author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts', default=1)


   def __str__(self):
       return self.title
   

class Comment(models.Model):
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey('Post', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)  # 생성 시간을 저장할 필드 추가

    def __str__(self):
        return self.content


class Like(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="likes")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="likes")
    