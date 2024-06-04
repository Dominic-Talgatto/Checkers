from rest_framework import serializers
from lessons.models import Lesson

class LessonSerializer(serializers.Serializer):
    class Meta:
        model = Lesson
        fields = '__all__'
    id = serializers.IntegerField(read_only =True)
    name = serializers.CharField(max_length=50)
    text = serializers.CharField()
    level = serializers.CharField(max_length=15)
    video = serializers.URLField()

    def create(self, validated_data):
        instance = Lesson.objects.create(**validated_data)
        return instance
    