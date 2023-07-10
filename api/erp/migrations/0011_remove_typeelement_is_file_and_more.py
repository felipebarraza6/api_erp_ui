# Generated by Django 4.2.3 on 2023-07-07 17:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('erp', '0010_noteproject_for_user_noteproject_is_note_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='typeelement',
            name='is_file',
        ),
        migrations.RemoveField(
            model_name='typeelement',
            name='is_info',
        ),
        migrations.RemoveField(
            model_name='typeelement',
            name='type_file',
        ),
        migrations.AddField(
            model_name='valueelement',
            name='is_file',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='valueelement',
            name='is_info',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='valueelement',
            name='type_file',
            field=models.CharField(blank=True, max_length=1200, null=True),
        ),
    ]
