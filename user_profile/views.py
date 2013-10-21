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

import stripe
stripe.api_key = "sk_test_3kALpjgXsmcXo1Aynw5VZRdO"
stripe.api_version = '2013-08-13'


def user_form(request):
    return HttpResponseRedirect('/test')


def userForm(request):
    if not request.user.is_authenticated():
        return HttpResponseRedirect('/test')

    if not request.user.is_registered:
        return HttpResponseRedirect('/registration')

    if request.method == 'POST':
        form = UserInfo(request.POST)

        if form.is_valid():
            cd = form.cleaned_data

            
            
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
           
                
                
            try: 
                prof=UserProfile.objects.get(user=request.user)

                bam=UserInfo(data=request.POST, instance=prof)
                u=bam.save()  

                return HttpResponseRedirect('/test1')

            except UserProfile.DoesNotExist:

               obj = form.save(commit=False)
               obj.user= request.user
               obj.save()

            return HttpResponseRedirect('/test2')


        else:
                # This is case where form is not valid and method is post

            try:

                prof=UserProfile.objects.get(user=request.user)
                
                
                
                if prof.prof_pic!="":
                    pic_dict={'pic_url': prof.prof_pic.url}
                else:
                    pic_dict={'pic_url':""}
                   
                    

            ## Case when user does not exist, and form is invalid

            except UserProfile.DoesNotExist:

                 pic_dict={'pic_url':""}

        ## This else statement is for GET        

    else:

            ## load in profile for signed in user, if none exists  catch and start with empty form

        try:
            prof=UserProfile.objects.get(user=request.user)
            form = UserInfo(instance=prof)

            if prof.prof_pic!="":
                pic_dict={'pic_url': prof.prof_pic.url}

            else:
                pic_dict={'pic_url':""}

        except UserProfile.DoesNotExist:
            prof=UserProfile.objects.create(user=request.user)
            form=UserInfo()
            pic_dict={'pic_url':""}

    menu_dict=getCategoryVars()
    email=str(request.user.email)
    
    auth_dict={"user":email}
    form_dict={'form':form}
    header_dict={"registered":"true"}
    
    from django.forms.models import model_to_dict
    json_prof_dict=model_to_dict(prof)
    
    links=[]
    link_titles=[]
    link_descs=[]
    
    files=[]
    file_titles=[]
    file_descs=[]
    
    for i in range(1,9):
        links.append(json_prof_dict['link'+str(i)])
        link_titles.append(json_prof_dict['link'+str(i)+'_title'])
        link_descs.append(json_prof_dict['link'+str(i)+'_desc'])
        
        if getattr(prof,'file'+str(i)):
            files.append(getattr(prof,'file'+str(i)).url)
        else:
            files.append("")
            
        file_titles.append(json_prof_dict['file'+str(i)+'_title'])
        file_descs.append(json_prof_dict['file'+str(i)+'_desc'])
        
        
    print file_titles
  
    #link_dict={'links':links,"link_title":link_titles,"link_descs":link_descs}
    #file_dict={'files':files,"file_titles":file_titles,"file_descs":file_descs}

    link_list=  [{'link': t[0], 'link_title': t[1], 'link_desc': t[2]} for t in zip(links, link_titles, link_descs)]
    file_list= [{'file': t[0], 'file_title': t[1], 'file_desc': t[2]} for t in zip(files, file_titles, file_descs)]

    upload_dict={"link_list":link_list,"file_list":file_list}

    out_dict=dict(upload_dict.items()+auth_dict.items() + menu_dict.items()+form_dict.items()+pic_dict.items()+header_dict.items()+json_prof_dict.items())

    return render(request, 'user_form.html',out_dict )
    
    
def signup(request):
    if request.user.is_authenticated():
        status_dict={'status':'errors'}
        form_dict={'errors':'User already signed in on this computer'}
        out_dict=dict(status_dict.items()+form_dict.items())
        return HttpResponse(json.dumps(out_dict), content_type="application/json")
        
        
    if request.method == 'POST':
        form = UserSignup(request.POST)
        
        if form.is_valid():
            
            form.save()
            user=authenticate(email = request.POST['email'],password = request.POST['password1'])
            login(request, user)            
            return HttpResponse(simplejson.dumps({'status':'success'}), content_type="application/json")
            
        else:
            #handle case when user already exists
            #if User.objects.filter(email =request.POST['email']).count():
            #    status_dict={'status':'errors'}
            #    errors={'error':'User already exists with this email address'}
            #    out_dict=dict(status_dict.items()+form.errors.items())
            #    return HttpResponse(simplejson.dumps(out_dict), content_type="application/json")
               
            status_dict={'status':'errors'}
            form_dict={'errors':form.errors}
            out_dict=dict(status_dict.items()+form_dict.items())
            return HttpResponse(simplejson.dumps(out_dict), content_type="application/json")
    else:
        return HttpResponse("error")




def signin(request): 
    if request.user.is_authenticated():
        status_dict={'status':'errors'}
        form_dict={'error':'Already signed in'}
        out_dict=dict(status_dict.items()+form_dict.items());
        return HttpResponse(simplejson.dumps(out_dict), content_type="application/json")
        
        
        
    if request.method == 'POST':
        form = UserSignin(request.POST)
        if form.is_valid():
            if 'email' in request.POST and 'password' in request.POST:
                user = authenticate(email = request.POST['email'],password = request.POST['password'])
                
                if user is not None:
                    login(request, user)
                    
                    if user.is_registered:
                        registered="true"
                    else:
                        registered="false"
                    
                    
                    return HttpResponse(simplejson.dumps({'status':'success','registered':registered}), content_type="application/json")
                else:
                    status_dict={'status':'errors'}
                    form_dict={'error':'Unsuccessful Login'}
                    out_dict=dict(status_dict.items()+form_dict.items())
                    return HttpResponse(simplejson.dumps(out_dict), content_type="application/json")
        else:
            
            form_dict={'form':form.errors}
            status_dict={'status':'errors'}
            out_dict=dict(status_dict.items()+form_dict.items())
            
            return HttpResponse(simplejson.dumps(out_dict), content_type="application/json")
    else:
        return HttpResponse("error")
    
    
    
    
def signout(request):
    logout(request)
    return HttpResponseRedirect('/')



def registration(request):
    
    if not request.user.is_authenticated():
        return HttpResponseRedirect('/')

    

    if request.method == 'GET':
        
        if not request.user.is_registered:
            auth_dict={"user":'true'}
            header_dict={"registered":"false"}
            
            out_dict=dict(auth_dict.items()+header_dict.items())
            
            return render(request, 'registration.html',out_dict)
        else:
            #Case where user is updating card info
            customer=stripe.Customer.retrieve(request.user.stripe_id)
            
            last4=customer.cards.data[0].last4
        
            card_det={'last4':last4}
            out_dict=dict(card_det.items())
        
        return render(request, 'registration.html',out_dict)


    if request.method == 'POST':
        
        #If already registered then this is an update of current info
        if request.user.is_registered:
            token = request.POST['stripeToken']
            
            try:
                customer=stripe.Customer.retrieve(request.user.stripe_id)
                customer.card=token
                customer.save()
                
                return HttpResponse(simplejson.dumps({'status':'success'}), content_type="application/json")
            
            except stripe.CardError, e:
                  # Since it's a decline, stripe.CardError will be caught
                  body = e.json_body
                  err  = body['error']

                  print "Status is: %s" % e.http_status
                  print "Type is: %s" % err['type']
                  print "Code is: %s" % err['code']
                  # param is '' in this case
                  print "Param is: %s" % err['param']
                  print "Message is: %s" % err['message']
                  
                  status_dict={"status":'error'}
                  message_dict={"message":err['message']}
                  out_dict=dict(status_dict.items()+message_dict.items())

                  return HttpResponse(simplejson.dumps(out_dict), content_type="application/json")
                  
                  
            except stripe.InvalidRequestError, e:
                  # Invalid parameters were supplied to Stripe's API
                  pass
                  
            except stripe.AuthenticationError, e:
                  # Authentication with Stripe's API failed
                  # (maybe you changed API keys recently)
                  pass
            except stripe.APIConnectionError, e:
                  # Network communication with Stripe failed
                  pass
            except stripe.StripeError, e:
                  # Display a very generic error to the user, and maybe send
                  # yourself an email
                  pass
            except Exception, e:
                  # Something else happened, completely unrelated to Stripe
                  pass
                  
            status_dict={"status":'error'}
            message_dict={"message":"There was an error"}
            out_dict=dict(status_dict.items()+message_dict.items())

            return HttpResponse(simplejson.dumps(out_dict), content_type="application/json")

            
        else:

            # Set your secret key: remember to change this to your live secret key in production
            # See your keys here https://manage.stripe.com/account

            # Get the credit card details submitted by the form
            token = request.POST['stripeToken']
            promo_code=request.POST['promo_code']
            
            try:
                
                if promo_code=="":
                    customer = stripe.Customer.create(
                        card=token,
                        plan="standard",
                        email=str(request.user.email),
                        )
                else:
                    customer = stripe.Customer.create(
                        card=token,
                        plan="standard",
                        email=str(request.user.email),
                        coupon=promo_code
                        )

                request.user.is_registered = True
                request.user.stripe_id=customer.id
                request.user.save()
                
                return HttpResponse(simplejson.dumps({'status':'success'}), content_type="application/json")
                    
                
            except stripe.CardError, e:
                  # Since it's a decline, stripe.CardError will be caught
                  body = e.json_body
                  err  = body['error']
                  
                  status_dict={"status":'error'}
                  message_dict={"message":err['message']}
                  out_dict=dict(status_dict.items()+message_dict.items())

                  return HttpResponse(simplejson.dumps(out_dict), content_type="application/json")
                  
            except stripe.InvalidRequestError, e:
                  # Invalid parameters were supplied to Stripe's API
                  
                  #This can only be the promo code
                  
                  body = e.json_body
                  err  = body['error']
                  
                  status_dict={"status":'error'}
                  message_dict={"message":"The promotional code that was entered is not valid"}
                  out_dict=dict(status_dict.items()+message_dict.items())

                  return HttpResponse(simplejson.dumps(out_dict), content_type="application/json")
      
            except stripe.AuthenticationError, e:
                  # Authentication with Stripe's API failed
                  # (maybe you changed API keys recently)
                  pass
            except stripe.APIConnectionError, e:
                  # Network communication with Stripe failed
                  pass
            except stripe.StripeError, e:
                  # Display a very generic error to the user, and maybe send
                  # yourself an email
                  pass
            except Exception, e:
                  # Something else happened, completely unrelated to Stripe
                  pass
                  

            status_dict={"status":'error'}
            message_dict={"message":"The payment information was not accepted"}
            out_dict=dict(status_dict.items()+message_dict.items())

            return HttpResponse(simplejson.dumps(out_dict), content_type="application/json")
            


def editAccount(request):
    if not request.user.is_authenticated() or not request.user.is_registered:
        return HttpResponseRedirect('/')

    auth_dict={"user":'true'}
    header_dict={"registered":"true"}
    
    out_dict=dict(auth_dict.items()+header_dict.items())

    if request.method == 'GET':
        return render(request, 'edit_account.html',out_dict)




def cancelSubscription(request):
    if not request.user.is_authenticated():
        return HttpResponseRedirect('/')

    try:
        
        
        customer=stripe.Customer.retrieve(request.user.stripe_id)
        customer.delete()
        request.user.is_registered=False
        request.user.save()
    
        auth_dict={"user":'true'}
        header_dict={"registered":"false"}
        status_dict={"status":"success"}
        message_dict={"message":"Your subscription has been canceled"}
        out_dict=dict(auth_dict.items()+header_dict.items()+status_dict.items()+message_dict.items())
        
        return HttpResponse(simplejson.dumps(out_dict), content_type="application/json")
        
    except stripe.InvalidRequestError, e:
          # Invalid parameters were supplied to Stripe's API
          pass
          
    except stripe.AuthenticationError, e:
          # Authentication with Stripe's API failed
          # (maybe you changed API keys recently)
          pass
    except stripe.APIConnectionError, e:
          # Network communication with Stripe failed
          pass
    except stripe.StripeError, e:
          # Display a very generic error to the user, and maybe send
          # yourself an email
          pass
    except Exception, e:
          # Something else happened, completely unrelated to Stripe
          pass
          
    
    status_dict={"status":'error'}
    message_dict={"message":"There was an issue with canceling your subscription. Please contact us about this at webmaster@bluelist.us"}
    
    out_dict=dict(status_dict.items()+message_dict.items())

    return HttpResponse(simplejson.dumps(out_dict), content_type="application/json")
    




def userDeleteFile(request):
    #get user information
    if not request.user.is_authenticated():
        return HttpResponse(simplejson.dumps({'status':'not signed in'}), content_type="application/json")

    prof=UserProfile.objects.get(user=request.user)
    name=request.POST['name']
    if(getattr(prof, name).name ):
        getattr(prof, name).delete()
        
    return HttpResponse(simplejson.dumps({'status':'ok'}), content_type="application/json")


def userFileUpload(request):
    #get user information
    if not request.user.is_authenticated():
        return HttpResponse(simplejson.dumps({'status':'not signed in'}), content_type="application/json")
            
    #get name
    #the name corresponds to the variable name in the model
    name=request.POST['name']
    f = request.FILES[name]
    exten=f.name.split('.')[1]
    
    if f.size > int(settings.MAX_UPLOAD_SIZE):
         return HttpResponse(simplejson.dumps({'status':'file too large'}), content_type="application/json")
    
    #use date string to ensure no over writing
    date_string = time.strftime("%Y%m%d%H%M%S")

    filename=date_string+'.'+exten

    prof=UserProfile.objects.get(user=request.user)
    
    
    #the name in the input field corresponds to the model name, getattr executes it as prof.name
    if(getattr(prof, name).name ):
        getattr(prof, name).delete(False)
        
    getattr(prof, name).save(filename,f)

    
    return HttpResponse(simplejson.dumps({'status':'ok','file_url':str(getattr(prof, name).url)}), content_type="application/json")