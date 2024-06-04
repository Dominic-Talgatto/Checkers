from django.contrib import admin
from magazine.models import Magazine
@admin.register(Magazine)
class MagazineAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'text', 'date', 'type')
    search_fields = ['name', 'text', 'date'] 