

# Django
from django.contrib import admin

# Models
from api.erp.models import (User, Well, Lifting, PhotoWell,
                            ExternalClient, Client, Project,
                            EconomicActivity, Employee, TypeElement, ValueElement,
                            FormLandingContact, CompanyDeparment,
                            Webinars, ElementsProgramation, NoteProject, AnswerNote,
                            SupportSection, ResolutionInfo, UserCatchmentPoints,
                            TicketSupport, AnswerTicket, ChargeWorkload)

from import_export.admin import ExportActionMixin

admin.site.register(SupportSection)
admin.site.register(Project)
admin.site.register(TypeElement)
admin.site.register(UserCatchmentPoints)
admin.site.register(ValueElement)
admin.site.register(Employee)
admin.site.register(EconomicActivity)
admin.site.register(TicketSupport)
admin.site.register(ResolutionInfo)
admin.site.register(AnswerTicket)
admin.site.register(ExternalClient)
admin.site.register(User)
admin.site.register(Client)
admin.site.register(ChargeWorkload)
admin.site.register(FormLandingContact)
admin.site.register(Webinars)
admin.site.register(ElementsProgramation)
admin.site.register(Well)
admin.site.register(Lifting)
admin.site.register(PhotoWell)
admin.site.register(CompanyDeparment)

admin.site.register(NoteProject)
admin.site.register(AnswerNote)
