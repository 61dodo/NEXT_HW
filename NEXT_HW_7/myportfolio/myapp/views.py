from django.shortcuts import render
from django.shortcuts import redirect

# Create your views here.
def info(request):
  
  return render(request, 'info.html')

def project(request):
  
  return render(request, 'project.html')

def contact(request):
  
  return render(request, 'contact.html')

def instagram_view(request):
    
    return redirect('https://www.instagram.com/61_dodo/')
  
def github_view(request):
    
    return redirect('https://github.com/61dodo')
  
def blog_view(request):
  
  return redirect('https://blog.naver.com/veritas0601')