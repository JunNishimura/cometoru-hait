# Generated by Django 3.0.6 on 2020-12-14 02:03

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('comment_id', models.AutoField(primary_key=True, serialize=False, verbose_name='コメントID')),
                ('comment_date', models.DateTimeField(default=django.utils.timezone.now, verbose_name='コメント投稿日')),
                ('comment', models.TextField(max_length=255, verbose_name='コメント')),
            ],
            options={
                'db_table': 'Comment',
            },
        ),
        migrations.CreateModel(
            name='PostIdea',
            fields=[
                ('idea_id', models.AutoField(primary_key=True, serialize=False, verbose_name='アイデアID')),
                ('title', models.CharField(default='Idea Title', max_length=100, verbose_name='タイトル')),
                ('overview', models.TextField(max_length=500, verbose_name='概要')),
                ('background', models.TextField(blank=True, max_length=500, null=True, verbose_name='背景')),
                ('passion', models.TextField(blank=True, max_length=500, null=True, verbose_name='思い')),
                ('idea_image', models.ImageField(blank=True, null=True, upload_to='images/', verbose_name='投稿画像')),
                ('idea_date', models.DateTimeField(default=django.utils.timezone.now, verbose_name='投稿日')),
                ('state', models.CharField(max_length=100, verbose_name='状態')),
            ],
            options={
                'db_table': 'Post_Idea',
            },
        ),
    ]
