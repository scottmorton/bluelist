from django import forms
from user_profile.models import State, City, SkillCategory, Skill, User, UserProfile
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from user_profile.widgets import ImageWidget



#class UserAccount(forms.Form):
#    email = forms.EmailField()

from django.template.defaultfilters import filesizeformat
from django.utils.translation import ugettext_lazy as _
from django.conf import settings

class UserInfo(forms.ModelForm):
    class Meta:
        model = UserProfile
        exclude = ['user']
        widgets = { 'prof_pic': ImageWidget(),
                    'shortdesc': forms.Textarea(attrs={'cols': 60, 'rows': 5}),
                    'longdesc': forms.Textarea(attrs={'cols': 60, 'rows': 10}),
                    'link1_desc': forms.Textarea(attrs={'cols': 40, 'rows': 2}),
                    'link2_desc': forms.Textarea(attrs={'cols': 40, 'rows': 2}),
                    'link3_desc': forms.Textarea(attrs={'cols': 40, 'rows': 2}),
                    'link4_desc': forms.Textarea(attrs={'cols': 40, 'rows': 2}),
                    'link5_desc': forms.Textarea(attrs={'cols': 40, 'rows': 2}),
                    'link6_desc': forms.Textarea(attrs={'cols': 40, 'rows': 2}),
                    'link7_desc': forms.Textarea(attrs={'cols': 40, 'rows': 2}),
                    'link8_desc': forms.Textarea(attrs={'cols': 40, 'rows': 2}),
                    'file1_desc': forms.Textarea(attrs={'cols': 40, 'rows': 2}),
                    'file2_desc': forms.Textarea(attrs={'cols': 40, 'rows': 2}),
                    'file3_desc': forms.Textarea(attrs={'cols': 40, 'rows': 2}),
                    'file4_desc': forms.Textarea(attrs={'cols': 40, 'rows': 2}),
                    'file5_desc': forms.Textarea(attrs={'cols': 40, 'rows': 2}),
                    'file6_desc': forms.Textarea(attrs={'cols': 40, 'rows': 2}),
                    'file7_desc': forms.Textarea(attrs={'cols': 40, 'rows': 2}),
                    'file8_desc': forms.Textarea(attrs={'cols': 40, 'rows': 2}),
                }
    

    
    
class UserSignin(forms.Form):
    email = forms.EmailField()
    password = forms.CharField(label='Password', widget=forms.PasswordInput)
        
    
class UserSignup(forms.ModelForm):
    """A form for creating new users. Includes all the required
    fields, plus a repeated password."""
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password confirmation', widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ['email']

    def clean_password2(self):
        # Check that the two password entries match
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super(UserSignup, self).save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user
        
        
class UserChange(forms.ModelForm):
    """A form for updating users. Includes all the fields on
    the user, but replaces the password field with admin's
    password hash display field.
    """
    password = ReadOnlyPasswordHashField()
    
    class Meta:
        model = User
        fields = ['email']

    def clean_password(self):
        # Regardless of what the user provides, return the initial value.
        # This is done here, rather than on the field, because the
        # field does not have access to the initial value
        return self.initial["password"]