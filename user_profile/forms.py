from django import forms
from user_profile.models import State, City, SkillCategory, Skill, MyUser, UserProfile
from django.contrib.auth.forms import ReadOnlyPasswordHashField



#class UserAccount(forms.Form):
#    email = forms.EmailField()
#


class UserInfo(forms.ModelForm):
    class Meta:
        model = UserProfile
        exclude = ['user']
        widgets = {
                    'shortdesc': forms.Textarea(attrs={'cols': 40, 'rows': 5}),
                    'longdesc': forms.Textarea(attrs={'cols': 40, 'rows': 10}),
                }
                
      
      
    """   
    name = forms.CharField()
    email = forms.EmailField(required=False)
    website = forms.URLField(required=False)
    desc = forms.CharField(widget=forms.Textarea)
    state_sel = forms.ModelChoiceField(queryset=states)
    city_sel =  forms.ModelChoiceField(queryset=cities)
    jobcat_sel = forms.ModelChoiceField(queryset=jobcats)
    job_sel = forms.ModelChoiceField(queryset=jobs)
    
    """
    
    
    
class UserSignin(forms.Form):
    email = forms.EmailField()
    password = forms.CharField(label='Password', widget=forms.PasswordInput)
        
    
class UserSignup(forms.ModelForm):
    """A form for creating new users. Includes all the required
    fields, plus a repeated password."""
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password confirmation', widget=forms.PasswordInput)

    class Meta:
        model = MyUser
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
        model = MyUser
        fields = ['email']

    def clean_password(self):
        # Regardless of what the user provides, return the initial value.
        # This is done here, rather than on the field, because the
        # field does not have access to the initial value
        return self.initial["password"]