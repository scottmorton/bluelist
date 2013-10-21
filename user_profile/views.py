from django.template.loader import get_template
from django.template import Template, Context
from django.http import HttpResponseRedirect
from user_profile.forms import UserInfo, UserSignup, UserSignin
from django.http import HttpResponse
from user_profile.models import UserProfile, User
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.forms.models import model_to_dict
import json
from bluelist.helper_functions import getCategoryVars
from django.conf import settings
from django.utils import simplejson
import time

"""
import stripe
stripe.api_key = "sk_test_3kALpjgXsmcXo1Aynw5VZRdO"
stripe.api_version = '2013-08-13'
"""

def user_form(request):
    return HttpResponseRedirect('/test')


def userForm(request):
    return HttpResponseRedirect('/test2')
    
    
def signup(request):
    return HttpResponseRedirect('/test2')


def signin(request): 
    return HttpResponseRedirect('/test2')
    
    
def signout(request):
    return HttpResponseRedirect('/test2')



def registration(request):
    return HttpResponseRedirect('/test2')
            


def editAccount(request):
    return HttpResponseRedirect('/test2')


def cancelSubscription(request):
    return HttpResponseRedirect('/test2')

def userDeleteFile(request):
    return HttpResponseRedirect('/test2')

def userFileUpload(request):
    return HttpResponseRedirect('/test2')