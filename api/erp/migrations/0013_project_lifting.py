# Generated by Django 4.2.3 on 2023-08-07 20:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('erp', '0012_resolutioninfo_date_initial_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='lifting',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='erp.lifting'),
        ),
    ]
