from django.template.loader import get_template
from django.template import Template, Context
from django.http import HttpResponseRedirect
from user_profile.forms import UserInfo, UserSignup, UserSignin
from django.http import HttpResponse
from user_profile.models import UserProfile, MyUser
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
            return HttpResponseRedirect('/signin')
    
    
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


                """
                UserProfile.objects.filter(user=request.user).update(
                                name=cd['name'],
                                prof_pic = cd['prof_pic'],  
                                shortdesc=cd['shortdesc'],
                                longdesc=cd['longdesc'],
                                state=cd['state'],
                                city=cd['city'],
                                public_email=cd['public_email'],
                                public_phone_num=cd['public_phone_num'],
                                skillcategory=cd['skillcategory'],
                                skill=cd['skill'],
                                
                                link1=link[0],
                                link1_title=link_title[0],
                                link1_desc=link_desc[0],
                                link2=link[1],
                                link2_title=link_title[1],
                                link2_desc=link_desc[1],
                                link3=link[2],
                                link3_title=link_title[2],
                                link3_desc=link_desc[2],
                                link4=link[3],
                                link4_title=link_title[3],
                                link4_desc=link_desc[3],
                                link5=link[4],
                                link5_title=link_title[4],
                                link5_desc=link_desc[4],
                                link6=link[5],
                                link6_title=link_title[5],
                                link6_desc=link_desc[5],
                                link7=link[6],
                                link7_title=link_title[6],
                                link7_desc=link_desc[6],
                                link8=link[7],
                                link8_title=link_title[7],
                                link8_desc=link_desc[7])
               
                
                #handle_uploaded_file(request.FILES['prof_pic'])
                """  
                       
                                
                return HttpResponseRedirect('/')
                
            except UserProfile.DoesNotExist:
               
               #prof=UserProfile.objects.get(user=request.user)
               
               
               #u=form.save()
               
               obj = form.save(commit=False)
               obj.user= request.user
               obj.save()
               
               
               """
                UserProfile.objects.create(user=request.user,
                                name=cd['name'],
                                prof_pic = cd['prof_pic'],  
                                shortdesc=cd['shortdesc'],
                                longdesc=cd['longdesc'],
                                state=cd['state'],
                                city=cd['city'],
                                public_email=cd['public_email'],
                                public_phone_num=cd['public_phone_num'],
                                skillcategory=cd['skillcategory'],
                                skill=cd['skill'],
                                link1=link[0],
                                link1_title=link_title[0],
                                link1_desc=link_desc[0],
                                link2=link[1],
                                link2_title=link_title[1],
                                link2_desc=link_desc[1],
                                link3=link[2],
                                link3_title=link_title[2],
                                link3_desc=link_desc[2],
                                link4=link[3],
                                link4_title=link_title[3],
                                link4_desc=link_desc[3],
                                link5=link[4],
                                link5_title=link_title[4],
                                link5_desc=link_desc[4],
                                link6=link[5],
                                link6_title=link_title[5],
                                link6_desc=link_desc[5],
                                link7=link[6],
                                link7_title=link_title[6],
                                link7_desc=link_desc[6],
                                link8=link[7],
                                link8_title=link_title[7],
                                link8_desc=link_desc[7])           
            #handle_uploaded_file(request.FILES['prof_pic'])
              
             """
                            
            return HttpResponseRedirect('/')
            
    else:
        
        ## load in profile for signed in user, if none exists  catch and start with empty form
        
        try:
            prof=UserProfile.objects.get(user=request.user)
            form = UserInfo(instance=prof)
            #prof_dict=prof.__dict__
        except:
            form=UserInfo()
            #prof_dict={}
        
        
    menu_dict=getCategoryVars()
    
    if request.user.is_authenticated():
        auth_dict={'auth':'true'}
        
    else:
        auth_dict={'auth':'false'}

    form_dict={'form':form}

    out_dict=dict(auth_dict.items() + menu_dict.items()+form_dict.items())
            
    return render(request, 'user_form2.html',out_dict )
        
        
def register(request):
    "nice"        

    
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
    return HttpResponseRedirect('https://www.bluelist.us')
