from rest_framework import serializers
from magazine.models import Magazine

class MagazineSerializer(serializers.Serializer):
    class Meta:
        model = Magazine
        fileds = '__all__'
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()
    text = serializers.CharField()
    date = serializers.DateField()
    picture = serializers.CharField()
    type = serializers.CharField()

    def create(self, validated_data):
        return Magazine.objects.create(**validated_data)
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.text = validated_data.get('text', instance.text)
        instance.date = validated_data.get('date', instance.date)
        instance.picture = validated_data.get('picture', instance.picture)
        instance.type = validated_data.get('type', instance.type)
        instance.save()
        return instance