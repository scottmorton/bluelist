from django.http import Http404, HttpResponse, HttpResponseRedirect
from django.template import Template, Context
from django.shortcuts import render
from django.template.loader import get_template
from user_profile.models import State, City, SkillCategory, Skill, MyUser, UserProfile
from django.core import serializers
import json
from django.contrib.auth import authenticate


from profinder.helper_functions import getCategoryVars

def homepage(request):
    
    
    if request.user.is_authenticated():
        button_dict={   'button2_text':'Logout',
                        'button2_link':'signout',
                        'button3_text':'Profile',
                        'button3_link':'userform'}
        
    else:
        button_dict={   'button2_text':'Login',
                        'button2_link':'signin',
                        'button3_text':'Signup',
                        'button3_link':'signup'}
    
        
    menu_dict=getCategoryVars()
    
    out_dict=dict(button_dict.items() + menu_dict.items())
        
        
    return render(request, 'homepage.html',out_dict)
                                            
                                            


def prof_list_get(request):
    if request.method == 'GET':
        
        selstate=request.GET['selstate']
        selcity=request.GET['selcity']
        
        selcat=request.GET['selcat']
        selskill=request.GET['selskill']
        
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
                kwargs["skillcat"]=int(selcat)    
        
        userobs=UserProfile.objects.filter(**kwargs)
        
        """
        userlist='['
        for user in userobs:
            userlist=userlist+'["'+str(user.pk)+'","'+user.name.encode('ascii','ignore')+'","'+user.shortdesc.encode('ascii','ignore')+'","'+'"],'
        userlist=userlist+']'
        
        obj={ "userlist": eval(userlist) }
        
        
        return HttpResponse(json.dumps(obj), content_type="application/json")
        """
        
        return HttpResponse(serializers.serialize("json", userobs,use_natural_keys=True), content_type="application/json")
        

def prof_request(request):
    if request.method == 'GET':
        selpk=request.GET['selpk']
    
    
    
    
    
    
    
    

