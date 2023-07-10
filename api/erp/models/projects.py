from .clients import Client
from .users import User
from django.db import models
from .utils import ModelApi
from .liftings import Well



class Project(ModelApi):
	client = models.ForeignKey(Client, on_delete=models.CASCADE)
	service = models.CharField(max_length=600, blank=True, null=True)
	code_internal = models.CharField(max_length=200, blank=True, null=True)
	description = models.TextField(max_length=1200, blank=True, null=True)

	def __str__(self):
		return str(self.id)

class NoteProject(ModelApi):
	project = models.ForeignKey(Project, on_delete=models.CASCADE, null=True, blank=True)	
	note = models.TextField(max_length=2200, blank=True, null=True)
	file = models.FileField(upload_to='projects/files_notes', blank=True, null=True)
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	for_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='for_user_note_project', blank=True, null=True)
	is_task = models.BooleanField(default=True)
	is_note = models.BooleanField(default=True)

	def __str__(self):
		return str(self.id)
	
class AnswerNote(ModelApi):
	note = models.ForeignKey(NoteProject, on_delete=models.CASCADE, null=True, blank=True)	
	answer = models.TextField(max_length=2200, blank=True, null=True)
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	file = models.FileField(upload_to='projects/files_notes/answers', blank=True, null=True)

	def __str__(self):
		return str(self.id)

class CompanyDeparment(ModelApi):
	name = models.CharField(max_length=1200)
	description = models.TextField(max_length=2200, blank=True, null=True)	
	
	def __str__(self):
		return str(self.name)


class TypeElement(ModelApi):
    deparment = models.ForeignKey(CompanyDeparment, on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=600)
    description = models.TextField(max_length=1200, blank=True, null=True)
    position = models.IntegerField()
    
	
    def __str__(self):
        return str(self.name)


class ValueElement(ModelApi):
	project = models.ForeignKey(Project, on_delete=models.CASCADE, null=True, blank=True)	
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	type_element = models.ForeignKey(TypeElement, on_delete=models.CASCADE)
	name = models.CharField(max_length=600, blank=True, null=True)
	code = models.CharField(max_length=600, blank=True, null=True)
	file = models.FileField(upload_to='files_clients', blank=True, null=True)
	value_input = models.TextField(max_length=1200, blank=True, null=True)
	
	type_file = models.CharField(max_length=1200, blank=True, null=True)
	is_file = models.BooleanField(default=False)
	is_info = models.BooleanField(default=True)    

	is_approved = models.BooleanField(default=False)
	is_read = models.BooleanField(default=False)
	is_cancel = models.BooleanField(default=False)

	def __str__(self):
		return str(self.type_element)


