from django.contrib import admin
from user_profile.models import State, City, SkillCategory, Skill, UserProfile, User, UserProfile
from django.contrib.auth.models import * 



admin.site.register(State)
admin.site.register(City)
admin.site.register(SkillCategory)
admin.site.register(Skill)
admin.site.register(User)
admin.site.register(UserProfile)




