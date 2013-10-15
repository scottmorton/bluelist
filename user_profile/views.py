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
#import stripe


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
        form = UserInfo(request.POST)
        
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
                
                bam=UserInfo(data=request.POST, instance=prof)
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
            
            try:
                
                prof=UserProfile.objects.get(user=request.user)
                if prof.prof_pic!="":
                    pic_dict={'pic_url': prof.prof_pic.url}
                else:
                    pic_dict={'pic_url':"none"}
        
        ## Case when user does not exist, and form is invalid
        
            except UserProfile.DoesNotExist:

                 pic_dict={'pic_url':"none"}
                 
    ## This else statement is for GET        
                
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
       
    return render(request, 'user_form.html',out_dict )
    
    
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





def registration(request):
    if not request.user.is_authenticated():
            return HttpResponseRedirect('/')
        
    if request.method == 'GET':
        return render(request, 'registration.html')
    
    if request.method == 'POST':
        
        # Set your secret key: remember to change this to your live secret key in production
        # See your keys here https://manage.stripe.com/account
        stripe.api_key = "sk_test_3kALpjgXsmcXo1Aynw5VZRdO"

        # Get the credit card details submitted by the form
        token = request.POST['stripeToken']

        # Create a Customer
        customer = stripe.Customer.create(
            card=token,
            plan="standard",
            email=str(request.user.email),
            )
        return HttpResponseRedirect('/')


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



def userDeleteFile(request):
    #get user information
    if not request.user.is_authenticated():
        return HttpResponse(simplejson.dumps({'status':'not signed in'}), content_type="application/json")
    
    prof=UserProfile.objects.get(user=request.user)
    name=request.POST['name']
    if(getattr(prof, name).name ):
        getattr(prof, name).delete()
        
    return HttpResponse(simplejson.dumps({'status':'ok','nice':'nice'}), content_type="application/json")





def userFileUpload(request):
    #get user information
    if not request.user.is_authenticated():
        return HttpResponse(simplejson.dumps({'status':'not signed in'}), content_type="application/json")
            
    #get name
    #the name corresponds to the variable name in the model
    name=request.POST['name']
    f = request.FILES[name]
    
    if f.size > int(settings.MAX_UPLOAD_SIZE):
         return HttpResponse(simplejson.dumps({'status':'file too large'}), content_type="application/json")
    
    #use date string to ensure no over writing
    date_string = time.strftime("%Y%m%d%H%M%S")

    prof=UserProfile.objects.get(user=request.user)
    
    #the name in the input field corresponds to the model name, getattr executes it as prof.name
    if(getattr(prof, name).name ):
        getattr(prof, name).delete(False)
        
    getattr(prof, name).save(date_string,f)

    
    """
    #path =settings.MEDIA_ROOT+'profile_data/user_'+str(request.user.pk)+'/'+date_string
    path =settings.MEDIA_ROOT+'profile_data/user_'+str(request.user.pk)+'/'+f.name
    
    destination = open(path, 'wb+')
    for chunk in f.chunks():
        destination.write(chunk)
        destination.close()
    """
    
    return HttpResponse(simplejson.dumps({'status':'ok','file_url':str(getattr(prof, name).url)}), content_type="application/json")