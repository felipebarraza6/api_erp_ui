# Generated by Django 4.2.3 on 2023-08-03 15:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('erp', '0011_remove_typeelement_is_file_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='resolutioninfo',
            name='date_initial',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='resolutioninfo',
            name='date_monitoring',
            field=models.DateField(blank=True, null=True),
        ),
    ]
