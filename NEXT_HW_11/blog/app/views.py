from django.shortcuts import render, redirect
from .models import Comment, Post
from django.contrib.auth.decorators import login_required
from .decorators import update_last_accessed

# Create your views here.

def home(request):
   posts = Post.objects.all()

   return render(request, 'home.html', {'posts':posts})


@login_required
@update_last_accessed
def detail(request, post_pk):
   post = Post.objects.get(pk=post_pk)
   
   if request.method == 'POST':
        content = request.POST['content']
        Comment.objects.create(
            post=post,
            content=content,
            author=request.user
        )
        return redirect('detail', post_pk)

   return render(request, 'detail.html', {'post':post})


@login_required
def new(request):
   if request.method == "POST":
       title = request.POST['title']
       content = request.POST['content']

       new_post = Post.objects.create(
           title=title,
           content=content,
           author=request.user
           )
       return redirect('detail', new_post.pk)
  
   return render(request, 'new.html')


def edit(request, post_pk):
   post = Post.objects.get(pk=post_pk)

   if request.method == 'POST':
       title = request.POST['title']
       content = request.POST['content']
       Post.objects.filter(pk=post_pk).update(
           title=title,
           content=content
       )
       return redirect('detail', post_pk)

   return render(request, 'edit.html', {'post':post})
 

def delete(request, post_pk):
   post = Post.objects.get(pk=post_pk)
   post.delete()
   
   return redirect('home')
 

def delete_comment(request, post_pk, comment_pk):
   comment = Comment.objects.get(pk=comment_pk)
   comment.delete()
   
   return redirect('detail', post_pk)