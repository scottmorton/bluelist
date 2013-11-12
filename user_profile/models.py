from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)


import sys, time


import os
def get_upload_path(instance, filename):
    return os.path.join("profile_data","user_%d" % instance.user.pk, filename)


class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        """
        Creates and saves a User with the given email,
        birth and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user
        
    def create_superuser(self, email, password):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(email,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
        db_index=True,
        error_messages={'unique' : 'This Email address is already in use',
                        'invalid' : 'This Email address is invalid',
                        'required': 'An Email address is required'},
    )
    
    
    is_active = models.BooleanField(default=True)
    is_registered = models.BooleanField(default=False)
    stripe_id=models.CharField(max_length=100,blank=True)
    
    is_admin = models.BooleanField(default=False)
    
    objects = UserManager()

    USERNAME_FIELD = 'email'

    def get_full_name(self):
        # The user is identified by their email address
        return self.email

    def get_short_name(self):
        # The user is identified by their email address
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    # On Python 3: def __str__(self):
    def __unicode__(self):
        return self.email
        
    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin
        



class CatManager(models.Manager):
    def get_by_natural_key(self, name):
        return self.get(name=name)


class State(models.Model):
    objects=CatManager()
    
    name = models.CharField(max_length=30)
    
    def natural_key(self):
            return (self.name)
    
    def __unicode__(self):
        return self.name
	
class City(models.Model):
    objects=CatManager()
    
    name = models.CharField(max_length=30)
    state = models.ForeignKey(State)

    def natural_key(self):
            return (self.name)

    def __unicode__(self):
        return self.name
	
	
class SkillCategory(models.Model):
    objects=CatManager()
    
    name = models.CharField(max_length=30)
    
    def natural_key(self):
            return (self.name)
    
    def __unicode__(self):
        return self.name
	
class Skill(models.Model):
    objects=CatManager()
    
    name = models.CharField(max_length=30)
    skillcategory = models.ForeignKey(SkillCategory)
    
    def natural_key(self):
            return (self.name)
    
    def __unicode__(self):
        return self.name


class UserProfile(models.Model):
    
    user = models.OneToOneField(User)
    
    name = models.CharField(max_length=20)
    service = models.CharField(max_length=20)
    shortdesc= models.CharField(max_length=200)
    longdesc = models.CharField(blank=True, max_length=600)
    city = models.ForeignKey(City,null=True)
    state = models.ForeignKey(State,null=True)
    skillcategory = models.ForeignKey(SkillCategory,null=True)
    skill = models.ForeignKey(Skill,null=True)
    
    public_email=models.EmailField(blank=True)
    public_phone_num=models.CharField(blank=True,max_length=30)
    
    prof_pic = models.ImageField(upload_to=get_upload_path,blank=True)
    
    link1 = models.URLField(blank=True)
    link1_pic=models.ImageField(upload_to=get_upload_path,blank=True)
    link1_title = models.CharField(blank=True, max_length=50)
    link1_desc = models.CharField(blank=True, max_length=200)
    
    link2 = models.URLField(blank=True)
    link2_pic=models.ImageField(upload_to=get_upload_path,blank=True)
    link2_title = models.CharField(blank=True, max_length=50)
    link2_desc = models.CharField(blank=True, max_length=200)
    
    link3 = models.URLField(blank=True)
    link3_pic=models.ImageField(upload_to=get_upload_path,blank=True)
    link3_title = models.CharField(blank=True, max_length=50)
    link3_desc = models.CharField(blank=True, max_length=200)
    
    link4 = models.URLField(blank=True)
    link4_pic=models.ImageField(upload_to=get_upload_path,blank=True)
    link4_title = models.CharField(blank=True, max_length=50)
    link4_desc = models.CharField(blank=True, max_length=200)
    
    link5 = models.URLField(blank=True)
    link5_pic=models.ImageField(upload_to=get_upload_path,blank=True)
    link5_title = models.CharField(blank=True, max_length=50)
    link5_desc = models.CharField(blank=True, max_length=200)
    
    link6 = models.URLField(blank=True)
    link6_pic=models.ImageField(upload_to=get_upload_path,blank=True)
    link6_title = models.CharField(blank=True, max_length=50)
    link6_desc = models.CharField(blank=True, max_length=200)
    
    link7 = models.URLField(blank=True)
    link7_pic=models.ImageField(upload_to=get_upload_path,blank=True)
    link7_title = models.CharField(blank=True, max_length=50)
    link7_desc = models.CharField(blank=True, max_length=200)
    
    link8 = models.URLField(blank=True)
    link8_pic=models.ImageField(upload_to=get_upload_path,blank=True)
    link8_title = models.CharField(blank=True, max_length=50)
    link8_desc = models.CharField(blank=True, max_length=200)


    file1 = models.FileField(upload_to=get_upload_path,blank=True)
    file1_title = models.CharField(blank=True, max_length=50)
    file1_desc = models.CharField(blank=True, max_length=200)
    
    file2 = models.FileField(upload_to=get_upload_path,blank=True)
    file2_title = models.CharField(blank=True, max_length=50)
    file2_desc = models.CharField(blank=True, max_length=200)
    
    file3 = models.FileField(upload_to=get_upload_path,blank=True)
    file3_title = models.CharField(blank=True, max_length=50)
    file3_desc = models.CharField(blank=True, max_length=200)
    
    file4 = models.FileField(upload_to=get_upload_path,blank=True)
    file4_title = models.CharField(blank=True, max_length=50)
    file4_desc = models.CharField(blank=True, max_length=200)
    
    file5 = models.FileField(upload_to=get_upload_path,blank=True)
    file5_title = models.CharField(blank=True, max_length=50)
    file5_desc = models.CharField(blank=True, max_length=200)
    
    file6 = models.FileField(upload_to=get_upload_path,blank=True)
    file6_title = models.CharField(blank=True, max_length=50)
    file6_desc = models.CharField(blank=True, max_length=200)
    
    file7 = models.FileField(upload_to=get_upload_path,blank=True)
    file7_title = models.CharField(blank=True, max_length=50)
    file7_desc = models.CharField(blank=True, max_length=200)
    
    file8 = models.FileField(upload_to=get_upload_path,blank=True)
    file8_title = models.CharField(blank=True, max_length=50)
    file8_desc = models.CharField(blank=True, max_length=200)



    def __unicode__(self):
            return self.name

