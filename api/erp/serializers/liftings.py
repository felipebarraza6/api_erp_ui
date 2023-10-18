from rest_framework import serializers
from api.erp.models import Well, Lifting, PhotoWell, ResolutionInfo, Employee
from .clients import ExternalClientModelSerializer, ClientModelSerializer, EmployeeModelSerializer


class ResolutionInfoModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResolutionInfo
        fields = '__all__'


class PhotoWellModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhotoWell
        fields = '__all__'


class RetrieveWellModelSerializer(serializers.ModelSerializer):
    photos = serializers.SerializerMethodField('get_photos')

    def get_photos(self, well):
        qs = PhotoWell.objects.filter(well=well)
        serializer = PhotoWellModelSerializer(instance=qs, many=True)
        return serializer.data

    class Meta:
        model = Well
        fields = '__all__'


class WellModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Well
        fields = '__all__'


class LiftingModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lifting
        fields = '__all__'


class RetrieveLiftingModelSerialzer(serializers.ModelSerializer):
    wells = serializers.SerializerMethodField('get_wells')
    external_client = ExternalClientModelSerializer()
    person_in_charge_client = EmployeeModelSerializer()
    client = ClientModelSerializer()

    def get_wells(self, lifting):
        qs = Well.objects.filter(lifting=lifting)
        serializer = RetrieveWellModelSerializer(instance=qs, many=True)
        return serializer.data

    class Meta:
        model = Lifting
        fields = '__all__'
