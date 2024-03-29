# Generated by Django 4.2.2 on 2023-06-12 19:40

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('erp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Lifting',
            fields=[
                ('created', models.DateTimeField(auto_now_add=True, help_text='Fecha de creacion.', verbose_name='created at')),
                ('modified', models.DateTimeField(auto_now_add=True, help_text='Fecha de modificacion.', verbose_name='modified at')),
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('general_note', models.TextField(blank=True, max_length=1200, null=True)),
                ('is_external', models.BooleanField(default=True)),
                ('client', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='erp.client')),
                ('external_client', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='erp.externalclient')),
            ],
            options={
                'ordering': ['-created', '-modified'],
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Well',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, help_text='Fecha de creacion.', verbose_name='created at')),
                ('modified', models.DateTimeField(auto_now_add=True, help_text='Fecha de modificacion.', verbose_name='modified at')),
                ('name', models.CharField(max_length=400)),
                ('pickup_type', models.CharField(max_length=600)),
                ('note', models.TextField(blank=True, max_length=1200, null=True)),
                ('is_dga', models.BooleanField(default=False)),
                ('flow_granted_dga', models.FloatField(blank=True, null=True)),
                ('depth', models.FloatField(blank=True, null=True)),
                ('pupm_depth', models.FloatField(blank=True, null=True)),
                ('static_level', models.FloatField(blank=True, null=True)),
                ('dynamic_level', models.FloatField(blank=True, null=True)),
                ('inside_diameter', models.FloatField(blank=True, null=True)),
                ('outside_diameter', models.FloatField(blank=True, null=True)),
                ('is_sensor_flow', models.BooleanField(default=False)),
                ('lifting', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='erp.lifting')),
            ],
            options={
                'ordering': ['-created', '-modified'],
                'abstract': False,
            },
        ),
        migrations.RemoveField(
            model_name='typeelement',
            name='section',
        ),
        migrations.AddField(
            model_name='typeelement',
            name='origin_element',
            field=models.CharField(default='EP', max_length=200),
        ),
        migrations.AlterField(
            model_name='valueelement',
            name='project',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='erp.project'),
        ),
        migrations.DeleteModel(
            name='SectionElement',
        ),
        migrations.AddField(
            model_name='valueelement',
            name='well',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='erp.well'),
        ),
    ]
