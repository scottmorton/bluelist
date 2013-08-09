from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)



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
    link1 = models.URLField(blank=True)
    link1_text = models.CharField(blank=True, max_length=100)
    link2 = models.URLField(blank=True)
    link2_text = models.CharField(blank=True, max_length=100)
    link3 = models.URLField(blank=True)
    link3_text = models.CharField(blank=True, max_length=100)
    link4 = models.URLField(blank=True)
    link4_text = models.CharField(blank=True, max_length=100)
    link5 = models.URLField(blank=True)
    link5_text = models.CharField(blank=True, max_length=100)
    link6 = models.URLField(blank=True)
    link6_text = models.CharField(blank=True, max_length=100)
    link7 = models.URLField(blank=True)
    link7_text = models.CharField(blank=True, max_length=100)
    link8 = models.URLField(blank=True)
    link8_text = models.CharField(blank=True, max_length=100)

    def __unicode__(self):
        return self.name
