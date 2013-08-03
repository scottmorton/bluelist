from django.conf.urls import patterns, include, url

from bluelist.views import homepage, prof_list_get, prof_request
from user_profile.views import user_form, signup, signin, signout


# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
	url(r'^$', homepage),	
	url(r'^admin/', include(admin.site.urls)),
	url(r'^userform$', user_form),
	url(r'^signup$', signup),
	url(r'^signin$', signin),
	url(r'^signout$', signout),
	url(r'^proflist$', prof_list_get),
	url(r'^profrequest$', prof_request),
	
)
