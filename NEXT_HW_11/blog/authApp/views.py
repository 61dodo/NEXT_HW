from django.shortcuts import render, redirect
from django.contrib import auth
from django.contrib.auth.models import User
from .forms import SignUpForm
from django.contrib.auth import login as auth_login, authenticate

# Create your views here.

def login(request):
   if request.method == 'POST':
      username = request.POST['username']
      password = request.POST['password']
      user = auth.authenticate(username=username, password=password)
      if user is not None:
           auth.login(request, user, backend="django.contrib.auth.backends.ModelBackend")
           return redirect(request.GET.get('next', '/'))
      error = "아이디 또는 비밀번호가 틀립니다"
      return render(request, 'login.html', {"error":error})
        
   return render(request, 'login.html')


def logout(request):
   auth.logout(request)
   
   return redirect('home')
 

def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            
            if User.objects.filter(username=username).exists():
                error = "이미 존재하는 사용자 이름입니다."
                return render(request, 'signup.html', {'form': form, 'error': error})
            else:
                new_user = User.objects.create_user(username=username, password=password)
                
                user = authenticate(request, username=username, password=password)
                auth_login(request, user)
                return redirect('home')
    else:
        form = SignUpForm()
    
    return render(request, 'signup.html', {'form': form})