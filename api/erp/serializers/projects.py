# Django REST Framework
from rest_framework import serializers

# Models
from api.erp.models import Project, TypeElement, ValueElement, CompanyDeparment
from .clients import ClientModelSerializer

class CompanyDeparmentModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyDeparment
        fields = '__all__'

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

class TypeElementRetrieveModelSerializer(serializers.ModelSerializer):
    deparment = CompanyDeparmentModelSerializer()
    class Meta:
        model = TypeElement
        fields = '__all__'


class ValueElementSerializer(serializers.ModelSerializer):
    class Meta:
        model = ValueElement
        fields = '__all__'
