from django.template.loader import get_template
from django.template import Template, Context
from django.http import HttpResponseRedirect
from user_profile.forms import UserInfo, UserSignup, UserSignin
from django.http import HttpResponse
from user_profile.models import UserProfile, MyUser
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.forms.models import model_to_dict

from profinder.helper_functions import getCategoryVars

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
        form = UserInfo(request.POST)
        
        if form.is_valid():
            cd = form.cleaned_data
            
            try: 
                prof=UserProfile.objects.get(user=request.user)
                
                UserProfile.objects.filter(user=request.user).update(
                                name=cd['name'],  
                                shortdesc=cd['shortdesc'],
                                longdesc=cd['longdesc'],
                                state=cd['state'],
                                city=cd['city'],
                                skillcategory=cd['skillcategory'],
                                skill=cd['skill'],
                                link1=cd['link1'],
                                link1_text=cd['link1_text'],
                                link2=cd['link2'],
                                link2_text=cd['link2_text'],
                                link3=cd['link3'],
                                link3_text=cd['link3_text'],
                                link4=cd['link4'],
                                link4_text=cd['link4_text'],
                                link5=cd['link5'],
                                link5_text=cd['link5_text'],
                                link6=cd['link6'],
                                link6_text=cd['link6_text'],
                                link7=cd['link7'],
                                link7_text=cd['link7_text'],
                                link8=cd['link8'],
                                link8_text=cd['link8_text'])
                                
                                
                return HttpResponseRedirect('/')
                
            except:
               
                UserProfile.objects.create(user=request.user,
                                name=cd['name'],  
                                shortdesc=cd['shortdesc'],
                                longdesc=cd['longdesc'],
                                state=cd['state'],
                                city=cd['city'],
                                skillcategory=cd['skillcategory'],
                                skill=cd['skill'],
                                link1=cd['link1'],
                                link1_text=cd['link1_text'],
                                link2=cd['link2'],
                                link2_text=cd['link2_text'],
                                link3=cd['link3'],
                                link3_text=cd['link3_text'],
                                link4=cd['link4'],
                                link4_text=cd['link4_text'],
                                link5=cd['link5'],
                                link5_text=cd['link5_text'],
                                link6=cd['link6'],
                                link6_text=cd['link6_text'],
                                link7=cd['link7'],
                                link7_text=cd['link7_text'],
                                link8=cd['link8'],
                                link8_text=cd['link8_text'])
                               
            return HttpResponseRedirect('/')
    else:
        
        ## load in profile for signed in user, if none exists  catch and start with empty form
        
        try:
            prof=UserProfile.objects.get(user=request.user)
            data=model_to_dict(prof)
            form = UserInfo(data)
        except:
            form=UserInfo()
        
        
    menu_dict=getCategoryVars()
        
    button_dict={'button2_text':'Logout',
                            'button2_link':'signout',
                            'button3_text':'Profile',
                            'button3_link':'userform'}

    form_dict={'form':form}
            
    out_dict=dict(button_dict.items() + menu_dict.items()+form_dict.items())
            
            
    return render(request, 'user_form.html',out_dict )
        

    
def signup(request):
    if request.user.is_authenticated():
            return HttpResponseRedirect('/')
            
    if request.method == 'POST':
        form = UserSignup(request.POST)
        
        if form.is_valid():
            form.save()
            
            user=authenticate(email = request.POST['email'],password = request.POST['password1'])
            login(request, user)
            return HttpResponseRedirect('/userform')
    else:
        form = UserSignup()
    return render(request, 'user_signup.html', {'form': form})
    


def signin(request):
    if request.user.is_authenticated():
            return HttpResponseRedirect('/')
    if request.method == 'POST':
        form = UserSignin(request.POST)
        if form.is_valid():
            if 'email' in request.POST and 'password' in request.POST:
                user = authenticate(email = request.POST['email'],password = request.POST['password'])
                if user and user.is_active:
                    login(request, user)
                    return HttpResponseRedirect('/')
    else:
        form = UserSignin()
    return render(request, 'user_signin.html', {'form': form})
    
    
def signout(request):
    logout(request)
    return HttpResponseRedirect('/')





