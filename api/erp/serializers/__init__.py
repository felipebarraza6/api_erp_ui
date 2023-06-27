from .actions import (ActionModelSerializer, 
                    CreateActionSerializer,
                    UpdateActionSerializer,
                    FinishActionSerializer,
                    TypeActionModelSerializer)

from .clients import EconomicActivityModelSerializer, ClientModelSerializer, ClientShortSerializer, RetrieveClientModel, ChargeWorkload
from .employees import EmployeeModelSerializer, EmployeeListSerializer
from .users import UserModelSerializer, UserLoginSerializer, UserSignUpSerializer
from .webinars import WebinarsModelSerializer
from .supports import (SupportSectionModelSerializer,
                        TicketSupportModelSerializer,
                        AnswerTicketModelSerializer,
                        AnswerTicketModelSerializerRetrieve,
                        TicketSupportModelSerializerRetrieve)

from .projects import ProjectModelSerializer, ProjectRetrieveModelSerializer,TypeElement, ValueElement
from .liftings import RetrieveWellModelSerializer, WellModelSerializer, LiftingModelSerializer, PhotoWellModelSerializer, RetrieveLiftingModelSerialzer, ResolutionInfoModelSerializer
