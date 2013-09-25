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



"""
def user_form(request):
	t=get_template('user_info.html')
	html = t.render(Context({'fun': 'YES'}))
	
	return HttpResponse(html)
"""	

def user_form(request):
    if not request.user.is_authenticated():
            return HttpResponseRedirect('/')
    
    
    if request.method == 'POST':
        form = UserInfo(request.POST, request.FILES)
        
        if form.is_valid():
            cd = form.cleaned_data

            
            #prof=UserProfile.objects.get(user=request.user)
            #bam=UserInfo(data=request.POST, files=request.FILES, instance=prof)
            #u=bam.save()
            
            #This block makes sure that URL links fill the lower numbers before the last so they are displayed
            # properly in the profileb
            
            """
            link=[""]*8
            link_desc=[""]*8
            link_title=[""]*8
            j=0
            
            for i in range(1,9):
                if(cd['link'+str(i)]!="" or cd['link'+str(i)+'_desc']!="" or cd['link'+str(i)+'_title']!=""):
                    link[j]=cd['link'+str(i)]
                    link_title[j]=cd['link'+str(i)+'_title']
                    link_desc[j]=cd['link'+str(i)+'_desc']
                    j=j+1
            
            
           """
            
            
            
            
            try: 
                prof=UserProfile.objects.get(user=request.user)
                
                
                bam=UserInfo(data=request.POST, files=request.FILES, instance=prof)
                u=bam.save()  
                                
                return HttpResponseRedirect('/')
                
            except UserProfile.DoesNotExist:
               
               #prof=UserProfile.objects.get(user=request.user)
               #u=form.save()
               
               obj = form.save(commit=False)
               obj.user= request.user
               obj.save()
              
                            
            return HttpResponseRedirect('/')
            
            
        else:
            # This is case where form is not valid and method is post
            
            prof=UserProfile.objects.get(user=request.user)
            
            if prof.prof_pic!="":

                 pic_dict={'pic_url': prof.prof_pic.url}

            else:
                 pic_dict={'pic_url':"none"}
            
                
    else:
        
        ## load in profile for signed in user, if none exists  catch and start with empty form
        
        try:
            prof=UserProfile.objects.get(user=request.user)
            form = UserInfo(instance=prof)
            
            
            if prof.prof_pic!="":

                pic_dict={'pic_url': prof.prof_pic.url}
                
            else:
                pic_dict={'pic_url':"none"}
            
            
        except UserProfile.DoesNotExist:
            form=UserInfo()

            pic_dict={'pic_url':"none"}
            
        
    menu_dict=getCategoryVars()
    
    
    auth_dict={'auth':'true'}
    form_dict={'form':form}

    out_dict=dict(auth_dict.items() + menu_dict.items()+form_dict.items()+pic_dict.items())
            
            
    return render(request, 'user_form3.html',out_dict )
    
    
    
    
    
    
    
    
    
    
def signup(request):
    if request.user.is_authenticated():
        return HttpResponse("Already signed in")
    if request.method == 'POST':
        form = UserSignup(request.POST)
        
        if form.is_valid():
            form.save()
            
            user=authenticate(email = request.POST['email'],password = request.POST['password1'])
            login(request, user)
            return HttpResponse('success')
            
        else:
            
            """for field, errors in form.errors.items:
                for error in errors:
                    return"""
                    
            return HttpResponse(json.dumps(form.errors), content_type="application/json")
    
    else:
        return HttpResponse("error")





def register(request):
    "nice"        






def signin(request):
    
    if request.user.is_authenticated():
        return HttpResponse("Already signed in")
    if request.method == 'POST':
        form = UserSignin(request.POST)
        if form.is_valid():
            if 'email' in request.POST and 'password' in request.POST:
                user = authenticate(email = request.POST['email'],password = request.POST['password'])
                if user and user.is_active:
                    login(request, user)
                    return HttpResponse("success")
                else:
                    errors={'denied':'Unsuccessful Login'}
                    return HttpResponse(json.dumps(errors), content_type="application/json")
        else:
            return HttpResponse(json.dumps(form.errors), content_type="application/json")
    else:
        return HttpResponse("error")
    
    
def signout(request):
    logout(request)
    return HttpResponseRedirect('/')
