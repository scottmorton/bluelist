from django.http import Http404, HttpResponse, HttpResponseRedirect
from django.template import Template, Context, loader
from django.shortcuts import render
from django.template.loader import get_template
from django.core import serializers
from django.utils import simplejson
import json
from django.contrib.auth import authenticate
from bluelist.helper_functions import getCategoryVars, profile_serializer, profile_dictionary
from user_profile.models import State, City, SkillCategory, Skill, User, UserProfile

def about(request):
    if request.user.is_authenticated():
        email=str(request.user.email)
        #reguest.user.registered
        #return boolean for registered or not
        auth_dict={"user":email}
        
        if request.user.is_registered:
            header_dict={'registered':'true'}
        
        else:
            header_dict={'registered':'false'}
            
        
    else:
        auth_dict={"user":"false"}
        header_dict={}
        
    
    out_dict=dict(auth_dict.items()+header_dict.items())
    return render(request, 'about.html', out_dict)


def terms(request):
    
    
    if request.user.is_authenticated():
        email=str(request.user.email)
        #reguest.user.registered
        #return boolean for registered or not
        auth_dict={"user":email}
        
        if request.user.is_registered:
            header_dict={'registered':'true'}
        
        else:
            header_dict={'registered':'false'}
            
        
    else:
        auth_dict={"user":"false"}
        header_dict={}
        
    
    out_dict=dict(auth_dict.items()+header_dict.items())
        
    return render(request, 'termsandconditions.html', out_dict)




def homepage(request):

    
    if request.user.is_authenticated():
        email=str(request.user.email)
        #reguest.user.registered
        #return boolean for registered or not
        auth_dict={"user":email}
        
        if request.user.is_registered:
            header_dict={'registered':'true'}
        
        else:
            header_dict={'registered':'false'}
            
    else:
        auth_dict={"user":"false"}
        header_dict={}
        
    profs_per_page=15
        
    userobs=UserProfile.objects.exclude(name="").filter(user__is_registered=True)
        
    userobs_out=userobs[0:profs_per_page]
        
    if len(userobs)>profs_per_page:
        bool_more_profs='true'
    else:
        bool_more_profs='false'
        
    
    prof_container={}
    
    num_profs=len(userobs_out)
    
    prof_container=profile_dictionary(userobs_out)
    
    menu_dict=getCategoryVars()
    
    prof_dict_out={'profiles':prof_container, 'num_profs':num_profs, 'more_profs':bool_more_profs}
    
    out_dict=dict(menu_dict.items()+auth_dict.items()+header_dict.items()+prof_dict_out.items())
        
    t = loader.get_template('homepage2.html')
    c = Context(out_dict)
        
    return HttpResponse(t.render(c))




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
        
        userobs=UserProfile.objects.exclude(name="").filter(**kwargs).filter(user__is_registered=True)
        
        start=(int(pg_num)-1)*profs_per_page
        end=pg_num*profs_per_page
        
        userobs_out=userobs[start:end]
        
        if len(userobs)>(profs_per_page*int(pg_num)):
            bool_more_profs='true'
        else:
            bool_more_profs='false'

        prof_container=profile_dictionary(userobs_out)
        
        t = loader.get_template('profile_list.html')
        c = Context({'profiles':prof_container})

        prof_string=t.render(c)

        #userobs_json=serializers.serialize("json", userobs_out,use_natural_keys=True)
        
        json_comb=simplejson.dumps({'num_profiles':len(userobs), 'more_profs':bool_more_profs,'prof_string':prof_string})
        
        return HttpResponse(json_comb, content_type="application/json")




def contactRequest(request):
    #check if user is signed in, if so return information
    if not request.user.is_authenticated():
           return HttpResponse(simplejson.dumps({'status':'error','error':'not signed in'}), content_type="application/json")
    
    profile_pk=request.GET['selprof']
    prof=UserProfile.objects.get(pk=profile_pk)
    
    json_comb=simplejson.dumps({'status':'success','number':prof.public_phone_num,'email':prof.public_email,'name':prof.name})
    
    return HttpResponse(json_comb, content_type="application/json")


def prof_request(request):
    if request.method == 'GET':
        selpk=request.GET['selpk']
    
  

