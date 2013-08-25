from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)

    
from PIL import Image
import sys, time



class MyUserManager(BaseUserManager):
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

class MyUser(AbstractBaseUser):
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
    is_admin = models.BooleanField(default=False)
    
    objects = MyUserManager()

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
        


# Create your models here.


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
    
    user = models.OneToOneField(MyUser)
    
    name = models.CharField(max_length=30)
    shortdesc= models.CharField(max_length=200)
    longdesc = models.CharField(blank=True, max_length=600)
    city = models.ForeignKey(City)
    state = models.ForeignKey(State)
    skillcategory = models.ForeignKey(SkillCategory)
    skill = models.ForeignKey(Skill)
    
    
    public_email=models.EmailField(blank=True)
    public_phone_num=models.CharField(blank=True,max_length=30)
    
    
    now = str(int(time.time()))
    filepath = 'profile_pics/'+now+'/'
    
    prof_pic = models.ImageField(upload_to=filepath, blank=True)
    
    #prof_pic_original = models.FileField('original file upload', upload_to=filepath)
    #prof_pic_thumbnail = models.CharField(max_length=255, blank=True)
    #prof_pic_name = models.CharField(max_length=255)
    #prof_pic_desc = models.TextField(blank=True)
    
    link1 = models.URLField(blank=True)
    link1_title = models.CharField(blank=True, max_length=50)
    link1_desc = models.CharField(blank=True, max_length=100)
    
    link2 = models.URLField(blank=True)
    link2_title = models.CharField(blank=True, max_length=50)
    link2_desc = models.CharField(blank=True, max_length=100)
    
    link3 = models.URLField(blank=True)
    link3_title = models.CharField(blank=True, max_length=50)
    link3_desc = models.CharField(blank=True, max_length=100)
    
    link4 = models.URLField(blank=True)
    link4_title = models.CharField(blank=True, max_length=50)
    link4_desc = models.CharField(blank=True, max_length=100)
    
    link5 = models.URLField(blank=True)
    link5_title = models.CharField(blank=True, max_length=50)
    link5_desc = models.CharField(blank=True, max_length=100)
    
    link6 = models.URLField(blank=True)
    link6_title = models.CharField(blank=True, max_length=50)
    link6_desc = models.CharField(blank=True, max_length=100)
    
    link7 = models.URLField(blank=True)
    link7_title = models.CharField(blank=True, max_length=50)
    link7_desc = models.CharField(blank=True, max_length=100)
    
    link8 = models.URLField(blank=True)
    link8_title = models.CharField(blank=True, max_length=50)
    link8_desc = models.CharField(blank=True, max_length=100)

    def __unicode__(self):
            return self.name
