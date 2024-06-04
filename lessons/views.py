from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
import json
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.http.response import JsonResponse
from .models import Lesson
from lessons.serializers import LessonSerializer

@csrf_exempt
@api_view(['GET','POST'])
def lessons(request):
    if request.method == 'GET':
        lessons = Lesson.objects.all()
        serializer = LessonSerializer(lessons, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        json_data = json.loads(request.body)
        serializer = LessonSerializer(data=json_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

def lessons_detail(request, pk=None):
    try:
        lesson = Lesson.objects.get(id=pk)
    except Lesson.DoesNotExist as e:
        return JsonResponse({'error': str(e)}, status=404)
    if request.method == 'GET':
        serializer = LessonSerializer(lesson)
        return JsonResponse(serializer.data)
