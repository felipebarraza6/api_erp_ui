"""Urls Customers."""

# Django
from django.urls import include,path

# Django REST Framework
from rest_framework.routers import DefaultRouter

# Views
from api.erp.views import supports as views_supports
from api.erp.views import actions as views_actions
from api.erp.views import clients as views_clients
from api.erp.views import employess as views_employess
from api.erp.views import users as views_users
from api.erp.views import webinars as views_webinars
from api.erp.views import projects as views_projects
from api.erp.views import liftings as views_liftings

router = DefaultRouter()

#Actions
router.register(r'users', views_users.UserViewSet, basename='users')
router.register(r'actions', views_actions.ActionViewSet, basename='actions')
router.register(r'type_actions', views_actions.TypeActionViewSet, basename= 'type_actions')
router.register(r'clients', views_clients.ClientViewSet, basename= 'clients')
router.register(r'employess', views_employess.EmployeeViewSet, basename= 'employess')
router.register(r'webinars', views_webinars.WebinarsViewSet, basename= 'webinars')
router.register(r'clients_external', views_clients.ClientExternalViewSet, basename='clients_external')
router.register(r'support_sections', views_supports.SupportSectionViewSet, basename='support_sections')
router.register(r'ticket_answers', views_supports.AnswerTicketViewSet, basename='ticket_answer')
router.register(r'economic_activities', views_clients.EconomicActivityViewSet, basename='economic_activities')
router.register(r'projects', views_projects.ProjectViewSet, basename='projects')
router.register(r'type_element', views_projects.TypeEelementViewSet, basename='type_element')
router.register(r'value_element', views_projects.ValueElementViewSet, basename='value_element')
router.register(r'liftings', views_liftings.LiftingsViewSet, basename='liftings')
router.register(r'wells', views_liftings.WellsViewSet, basename='wells')
router.register(r'workloads', views_clients.ChargeWorkloadViewSet, basename='workloads')
router.register(r'photos_well', views_liftings.PhotoWellViewSet, basename='photos_well')
router.register(r'resolution_info', views_liftings.ResolutionInfoViewSet, basename='resolution_info')


urlpatterns = [
    path('', include(router.urls))
]
