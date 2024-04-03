from django.shortcuts import render, redirect
from .models import Post
from django.utils import timezone

# Create your views here.
def home(request):
  posts = Post.objects.filter(deadline__isnull=False).order_by('deadline')
  for post in posts:
        if post.deadline:
            d_day = (post.deadline - timezone.now()).days
            post.d_day = d_day
  return render(request, 'home.html', {'posts':posts})

def new(request):
    if request.method == 'POST':
        title = request.POST['title']
        content = request.POST['content']
        deadline = request.POST.get('deadline', None)  # 폼에서 마감일을 가져옴

        new_post = Post.objects.create(
            title=title,
            content=content,
            deadline=deadline  # 마감일을 모델에 저장
        )
        return redirect('detail', new_post.pk)

    return render(request, 'new.html')

def detail(request, post_pk):
  post=Post.objects.get(pk=post_pk)
  
  return render(request, 'detail.html', {'post': post})

def update(request, post_pk):
  post=Post.objects.get(pk=post_pk)
  
  if request.method=='POST':
    Post.objects.filter(pk=post_pk).update(
      title=request.POST['title'],
      content=request.POST['content'],
      deadline=request.POST['deadline']
    )
    return redirect('detail', post_pk)
  
  return render(request, 'update.html', {'post': post})

def delete(request, post_pk):
  post=Post.objects.get(pk=post_pk)
  post.delete()
  
  return redirect('home')