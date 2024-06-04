from django.shortcuts import render
from .models import Magazine
from magazine.serializers import MagazineSerializer
from django.http.response import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json 

@api_view(['GET', 'POST', 'PUT'])
def magazine(request):
    if request.method == 'GET':
        magazine = Magazine.objects.all()
        serializer = MagazineSerializer(magazine, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        json_data = json.loads(request.body)
        serializer = MagazineSerializer(data=json_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

@api_view(['GET', 'PUT', 'DELETE'])
def magazine_detail(request, id):
    try:
        magazine = Magazine.objects.get(id=id)
    except Magazine.DoesNotExist as e:
        return JsonResponse({'error': str(e)}, status=404)

    if request.method == 'GET':
        serializer = MagazineSerializer(magazine)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = json.loads(request.body)
        serializer = MagazineSerializer(magazine, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        magazine.delete()
        return JsonResponse({'message': 'Magazine deleted successfully'}, status=204)