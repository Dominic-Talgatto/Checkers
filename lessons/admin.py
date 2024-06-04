from django.contrib import admin
from lessons.models import Lesson

@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'text', 'level', 'video')
    search_fields = ['name', 'text', 'level'] 