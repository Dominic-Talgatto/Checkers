from django.db import models

class Lesson(models.Model):
    name = models.CharField(max_length=50)
    text = models.TextField()
    level = models.CharField(max_length=15)
    video = models.URLField()
    def __str__(self):
        return f"name: {self.name}, text: {self.text}, level: {self.level}, address: {self.video}"
    