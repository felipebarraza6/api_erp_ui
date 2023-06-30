from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.decorators import action

from rest_framework import status
from rest_framework import mixins, viewsets, status


from rest_framework import generics

# Filters
from django_filters import rest_framework as filters

# Permissions
from rest_framework.permissions import ( 
    AllowAny,
    IsAuthenticated
)

from api.erp.models import Well, Lifting, PhotoWell, ResolutionInfo
from api.erp.serializers.liftings import ResolutionInfoModelSerializer, RetrieveLiftingModelSerialzer, WellModelSerializer, LiftingModelSerializer, PhotoWellModelSerializer



class PhotoWellViewSet(mixins.CreateModelMixin,
                            mixins.RetrieveModelMixin,
                            mixins.UpdateModelMixin,
                            mixins.ListModelMixin,
                            mixins.DestroyModelMixin,
                            viewsets.GenericViewSet):

    permission_classes = [AllowAny]
    filter_backends = (filters.DjangoFilterBackend,)
    ordering = ('created', )
    queryset =  PhotoWell.objects.all()
    serializer_class = PhotoWellModelSerializer

class ResolutionInfoViewSet(mixins.CreateModelMixin,
                            mixins.RetrieveModelMixin,
                            mixins.UpdateModelMixin,
                            mixins.ListModelMixin,
                            mixins.DestroyModelMixin,
                            viewsets.GenericViewSet):

    permission_classes = [AllowAny]
    filter_backends = (filters.DjangoFilterBackend,)
    ordering = ('created', )
    queryset =  ResolutionInfo.objects.all()
    serializer_class = ResolutionInfoModelSerializer
    
    class ResolutionInfoFilter(filters.FilterSet):
        class Meta:
            model = ResolutionInfo
            fields = {
                'well': ['exact'],                           
            }

    filterset_class = ResolutionInfoFilter


class LiftingsViewSet(mixins.CreateModelMixin,
                            mixins.RetrieveModelMixin,
                            mixins.UpdateModelMixin,
                            mixins.ListModelMixin,
                            mixins.DestroyModelMixin,
                            viewsets.GenericViewSet):

    permission_classes = [AllowAny]
    filter_backends = (filters.DjangoFilterBackend,)
    ordering = ('created', )
    queryset = Lifting.objects.all()
    serializer_class = LiftingModelSerializer
    lookup_field = 'uuid'

    class LiftingFilter(filters.FilterSet):

        class Meta:
            model = Lifting
            fields = {
               
                'is_external': ['exact'],  
                'client': ['exact']                         
             
                }

    filterset_class = LiftingFilter

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return RetrieveLiftingModelSerialzer
        elif self.action == 'list':
            return RetrieveLiftingModelSerialzer
        else:
            return LiftingModelSerializer

    

class WellsViewSet(mixins.CreateModelMixin,
                            mixins.RetrieveModelMixin,
                            mixins.UpdateModelMixin,
                            mixins.ListModelMixin,
                            mixins.DestroyModelMixin,
                            viewsets.GenericViewSet):

    permission_classes = [AllowAny]
    filter_backends = (filters.DjangoFilterBackend,)
    ordering = ('created', )
    queryset = Well.objects.all()
    serializer_class = WellModelSerializer

    


