from django.db import models

# Create your models here.
class Task(models.Model):
   title = models.CharField(max_length=128)
   description = models.TextField()
   completed = models.BooleanField(default=False)
   created_on = models.DateTimeField(auto_now_add=True, null=True, blank=True)
   modified_on = models.DateTimeField(null=True, blank=True)

   def __str__(self):
     return self.title