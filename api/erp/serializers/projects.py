# Django REST Framework
from rest_framework import serializers

# Models
from api.erp.models import Project, TypeElement, ValueElement
from .clients import ClientModelSerializer


class ProjectModelSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Project
        fields = '__all__'


class ProjectRetrieveModelSerializer(serializers.ModelSerializer):
    client = ClientModelSerializer()
    class Meta:
        model = Project
        fields = '__all__'


class TypeElementModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeElement
        fields = '__all__'


class ValueElementSerializer(serializers.ModelSerializer):
    class Meta:
        model = ValueElement
        fields = '__all__'
