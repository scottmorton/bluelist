from django.conf.urls import patterns, include, url

from bluelist.views import homepage, prof_list_get, prof_request
from user_profile.views import userForm, signup, signin, signout, registration, userFileUpload, userDeleteFile, editAccount, cancelSubscription
from django.conf import settings

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
	url(r'^$', homepage),	
	url(r'^admin/', include(admin.site.urls)),
	url(r'^signup$', signup),
	url(r'^signin$', signin),
	url(r'^signout$', signout),
	url(r'^proflist$', prof_list_get),
	url(r'^profrequest$', prof_request),
    url(r'^registration$', registration),
    url(r'^userDeleteFile$', userDeleteFile),
    url(r'^userFileUpload$',userFileUpload),
    url(r'^editaccount$',editAccount),
    url(r'^cancelsubscription$',cancelSubscription),
    url(r'^userform$', userForm),   
)


from django.conf import settings

#This is used to serve static files in development

if settings.DEBUG:
     urlpatterns += patterns('',url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {
     'document_root': settings.BASE_PATH+'/bluelist/media'}))
    
    