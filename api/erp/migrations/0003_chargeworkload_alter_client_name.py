# Generated by Django 4.2.2 on 2023-06-19 14:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('erp', '0002_lifting_well_remove_typeelement_section_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='ChargeWorkload',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, help_text='Fecha de creacion.', verbose_name='created at')),
                ('modified', models.DateTimeField(auto_now_add=True, help_text='Fecha de modificacion.', verbose_name='modified at')),
                ('name', models.CharField(max_length=1200)),
            ],
            options={
                'ordering': ['-created', '-modified'],
                'abstract': False,
            },
        ),
        migrations.AlterField(
            model_name='client',
            name='name',
            field=models.CharField(max_length=200),
        ),
    ]
