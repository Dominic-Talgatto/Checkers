from django.db import models

class Magazine(models.Model):
    name = models.CharField(max_length=100)
    text = models.TextField()
    date = models.DateField()
    picture = models.TextField()
    type = models.CharField(max_length=10)

    def __str__(self):
        return f"name: {self.name}, text: {self.text}, date: {self.date}, picture: {self.picture}, type:{self.type}"
