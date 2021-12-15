# Generated by Django 3.2.8 on 2021-12-14 20:48

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('title', models.CharField(max_length=50)),
                ('description', models.CharField(blank=True, default='', max_length=250)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
            options={
                'ordering': ['created_at'],
            },
        ),
    ]
