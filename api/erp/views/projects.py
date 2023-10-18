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

from api.erp.models import Project, TypeElement, ValueElement, CompanyDeparment
from api.erp.serializers.projects import (TypeElementRetrieveModelSerializer, CompanyDeparmentModelSerializer, ProjectModelSerializer, ProjectRetrieveModelSerializer,TypeElementModelSerializer, ValueElementSerializer, RetrieveValueElementSerializer)



class ProjectViewSet(mixins.CreateModelMixin,
                            mixins.RetrieveModelMixin,
                            mixins.UpdateModelMixin,
                            mixins.ListModelMixin,
                            mixins.DestroyModelMixin,
                            viewsets.GenericViewSet):

    permission_classes = [AllowAny]
    filter_backends = (filters.DjangoFilterBackend,)
    ordering = ('created', )
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProjectRetrieveModelSerializer
        elif self.action == 'list':
            return ProjectRetrieveModelSerializer
        else:
            return ProjectModelSerializer

    class ProjectFilter(filters.FilterSet):

        class Meta:
            model = Project
            fields = {
                'client': ['exact'],
                'code_internal': ['icontains', 'exact'],   
                'created': ['contains', 'gte', 'lte', 'year', 'month', 'day', 'year__range', 'month__range',
                    'day__range', 'date__range', 'hour', 'minute', 'second', 'hour__range', 'minute__range', 'minute__range'],      
            }

    filterset_class = ProjectFilter

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProjectRetrieveModelSerializer
        elif self.action == 'list':
            return ProjectRetrieveModelSerializer
        else:
            return ProjectModelSerializer

class TypeEelementViewSet(mixins.CreateModelMixin,
                            mixins.RetrieveModelMixin,
                            mixins.UpdateModelMixin,
                            mixins.ListModelMixin,
                            mixins.DestroyModelMixin,
                            viewsets.GenericViewSet):

    permission_classes = [AllowAny]
    filter_backends = (filters.DjangoFilterBackend,)
    ordering = ('created', )
    queryset = TypeElement.objects.all()

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return TypeElementRetrieveModelSerializer
        elif self.action == 'list':
            return TypeElementRetrieveModelSerializer
        else:
            return TypeElementModelSerializer

    class TypeElementFilter(filters.FilterSet):

        class Meta:
            model = TypeElement
            fields = {
                'deparment': ['exact'],            
            }

    filterset_class = TypeElementFilter


class ValueElementViewSet(mixins.CreateModelMixin,
                            mixins.RetrieveModelMixin,
                            mixins.UpdateModelMixin,
                            mixins.ListModelMixin,
                            mixins.DestroyModelMixin,
                            viewsets.GenericViewSet):

    permission_classes = [AllowAny]
    filter_backends = (filters.DjangoFilterBackend,)
    ordering = ('created', )
    queryset = ValueElement.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return RetrieveValueElementSerializer
        else:
            return ValueElementSerializer 


    class ProjectFilter(filters.FilterSet):
        

        class Meta:
            model = ValueElement
            fields = {
                'project': ['exact'],                
                'user': ['exact'],
                'type_element': ['exact'],
            }

    filterset_class = ProjectFilter


class CompanyDeparmentViewSet(mixins.CreateModelMixin,
                            mixins.RetrieveModelMixin,
                            mixins.UpdateModelMixin,
                            mixins.ListModelMixin,
                            mixins.DestroyModelMixin,
                            viewsets.GenericViewSet):

    permission_classes = [AllowAny]
    filter_backends = (filters.DjangoFilterBackend,)
    ordering = ('created', )
    queryset = CompanyDeparment.objects.all()
    serializer_class = CompanyDeparmentModelSerializer

    

