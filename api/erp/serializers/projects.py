# Django REST Framework
from rest_framework import serializers

# Models
from api.erp.models import Project, TypeElement, ValueElement, CompanyDeparment
from .users import UserModelSerializer
from .clients import ClientModelSerializer


class CompanyDeparmentModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyDeparment
        fields = '__all__'


class TypeElementModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeElement
        fields = '__all__'


class CompanyDeparmenRetrievetModelSerializer(serializers.ModelSerializer):
    elements = serializers.SerializerMethodField('get_elements')
    
    def get_elements(self, deparment):
        qs = TypeElement.objects.filter(deparment=deparment.id)
        serializer = TypeElementModelSerializer(instance=qs, many=True)
        data = serializer.data
        return data

    class Meta:
        model = CompanyDeparment
        fields = '__all__'


class ProjectModelSerializer(serializers.ModelSerializer):   
    class Meta:
        model = Project
        fields = '__all__'


class ProjectRetrieveModelSerializer(serializers.ModelSerializer):
    client = ClientModelSerializer()
    deparments = serializers.SerializerMethodField('get_deparments')
    
    def get_deparments(self, profile):
        qs = CompanyDeparment.objects.all()
        serializer = CompanyDeparmenRetrievetModelSerializer(instance=qs, many=True)
        data = serializer.data
        return data

    class Meta:
        model = Project
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

class RetrieveValueElementSerializer(serializers.ModelSerializer):
    user = UserModelSerializer()
    class Meta:
        model = ValueElement
        fields = '__all__'
