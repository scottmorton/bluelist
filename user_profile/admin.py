from django.contrib import admin
from user_profile.models import State, City, SkillCategory, Skill, UserProfile, MyUser, UserProfile
from django.contrib.auth.models import * 



admin.site.register(State)
admin.site.register(City)
admin.site.register(SkillCategory)
admin.site.register(Skill)
admin.site.register(MyUser)
admin.site.register(UserProfile)




