from django.http import Http404, HttpResponse, HttpResponseRedirect
from django.template import Template, Context
from django.shortcuts import render
from django.template.loader import get_template
from django.core import serializers
from django.utils import simplejson
import json
from django.contrib.auth import authenticate
from bluelist.helper_functions import getCategoryVars, profile_serializer
from user_profile.models import State, City, SkillCategory, Skill, User, UserProfile

def homepage(request):

    

    if request.user.is_authenticated():
        email=str(request.user.email)
        auth_dict={"user":email}
        
    else:
        auth_dict={"user":"false"}
        
    menu_dict=getCategoryVars()
    
    out_dict=dict(menu_dict.items()+auth_dict.items())
        
    return render(request, 'homepage.html',out_dict)




def prof_list_get(request):
    if request.method == 'GET':
        
        selstate=request.GET['selstate']
        selcity=request.GET['selcity']
        
        selcat=request.GET['selcat']
        selskill=request.GET['selskill']
        
        pg_num=request.GET['pg_num']
        
        #get list of cities and skills to get user profiles with
        #get user profiles with specified cities and skills
        #return a list, and take first 20
        
        kwargs={};
        if selcity!="0":
            kwargs["city"]=int(selcity)
        else:
            if selstate!="0":
                kwargs["state"]=int(selstate)
        
        if selskill!='0':
           kwargs["skill"]=int(selskill)
        else:
            if selcat!="0":
                kwargs["skillcategory"]=int(selcat)    
        
        profs_per_page=15
        
        userobs=UserProfile.objects.filter(**kwargs)
        
        strt=(int(pg_num)-1)*profs_per_page
        
        userobs_out=userobs[strt:pg_num*profs_per_page]
        
        if len(userobs)>(profs_per_page*int(pg_num)):
            bool_more_profs='true'
        else:
            bool_more_profs='false'

        userobs_json=serializers.serialize("json", userobs_out,use_natural_keys=True)
        
        json_comb=simplejson.dumps({'num_profiles':len(userobs), 'more_profs':bool_more_profs,'profiles':userobs_json})
        
        return HttpResponse(json_comb, content_type="application/json")
        

def prof_request(request):
    if request.method == 'GET':
        selpk=request.GET['selpk']
    
    
def send_email(request):
     #if request.user.is_authenticated():
     #    user=request.GET['user']
     
     from django.core.mail import send_mail

     #send_mail('Subject here', 'Here is the message.', 'morto091@umn.edu',
     #    ['morto091@umn.edu'], fail_silently=False)
    
     return HttpResponseRedirect('/')
    
    
    
    
    

