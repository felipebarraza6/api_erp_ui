from django.db import models
from .utils import ModelApi
from .clients import Client, ExternalClient
import uuid

class Lifting(ModelApi):
    uuid = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, blank=True, null=True)
    external_client = models.ForeignKey(ExternalClient, on_delete=models.CASCADE, blank=True, null=True)
    general_note = models.TextField(max_length=1200, blank=True, null=True)
    is_external = models.BooleanField(default=True)

    def __str__(self):
        return str(self.uuid)


class Well(ModelApi):
    lifting = models.ForeignKey(Lifting, on_delete=models.CASCADE)
    name = models.CharField(max_length=400, blank=True, null=True)
    pickup_type = models.CharField(max_length=600, blank=True, null=True)
    address_exact = models.CharField(max_length=2000, blank=True, null=True)
    link_location = models.CharField(max_length=2000, blank=True, null=True)
    latitude = models.CharField(max_length=2000, blank=True, null=True)
    longitude = models.CharField(max_length=2000, blank=True, null=True)    
    flow_granted_dga = models.FloatField(blank=True, null=True)
    id_sh_api = models.CharField(max_length=300, blank=True, null=True)
    depth = models.FloatField(blank=True, null=True)
    pupm_depth = models.FloatField(blank=True, null=True)
    static_level = models.FloatField(blank=True, null=True)
    dynamic_level = models.FloatField(blank=True, null=True)
    inside_diameter = models.FloatField(blank=True, null=True)
    outside_diameter = models.FloatField(blank=True, null=True)    
    is_sensor_flow = models.BooleanField(default=False)
    is_feasibility_electrical = models.BooleanField(default=False)
    note = models.TextField(max_length=1200, blank=True, null=True)
    is_dga = models.BooleanField(default=False)
    

    def __str__(self):
        return str(self.name)
    
class PhotoWell(ModelApi):
    well = models.ForeignKey(Well, on_delete=models.CASCADE)
    photo = models.FileField(upload_to='liftings/wells/photos')

    def __str__(self):
        return str(self.well)

class ResolutionInfo(ModelApi):
    well = models.ForeignKey(Well, on_delete=models.CASCADE)
    dga_resolution = models.CharField(max_length=1200, blank=True, null=True)
    shac = models.CharField(max_length=1200, blank=True, null=True) 
    daily_publication_date = models.DateField(blank=True, null=True)
    term_installation_measurement = models.DateField(blank=True, null=True)
    initial_transmission_term = models.DateField(blank=True, null=True)
    dga_standard = models.CharField(max_length=1200, blank=True, null=True)
    date_monitoring = models.DateField(blank=True, null=True)
    date_initial = models.DateField(blank=True, null=True) 
    

    def __str__(self):
        return str(self.well)
