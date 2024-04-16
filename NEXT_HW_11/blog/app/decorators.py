from functools import wraps
from django.utils import timezone
from django.db import IntegrityError
from .models import LastAccessed
from .models import Post

def update_last_accessed(view_func):
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        if request.user.is_authenticated:
            post_pk = kwargs.get('post_pk')
            if post_pk:
                post = Post.objects.get(pk=post_pk)
                try:
                    last_accessed = LastAccessed.objects.get(post=post)
                    if last_accessed.user != request.user:
                        last_accessed = None
                except LastAccessed.DoesNotExist:
                    last_accessed = None

                if last_accessed:
                    last_accessed.accessed_at = timezone.now()
                    last_accessed.save()
                else:
                    try:
                        last_accessed = LastAccessed.objects.create(post=post, user=request.user, accessed_at=timezone.now())
                    except IntegrityError:
                        last_accessed = LastAccessed.objects.get(post=post)
                        last_accessed.accessed_at = timezone.now()
                        last_accessed.save()

                post.last_accessed = last_accessed

        return view_func(request, *args, **kwargs)
    return wrapper
