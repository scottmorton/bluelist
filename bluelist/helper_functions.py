from user_profile.models import State, City, SkillCategory, Skill


def getCategoryVars():


    states=State.objects.order_by('name')
    cities=City.objects.order_by('name')
    cats=SkillCategory.objects.order_by('name')
    skills=Skill.objects.order_by('name')


    statelist='[["All","0"],'
    for item in states:
        statelist=statelist+'["'+item.name.encode('ascii','ignore')+'","'+str(item.pk)+'"],'
        
    statelist=statelist+']'

    catlist='[["All","0"],'
        
    for item in cats:
        catlist=catlist+'["'+item.name.encode('ascii','ignore')+'","'+str(item.pk)+'"],'
            
    catlist=catlist+']'


    citylist='[["All","0","0"],'
        
    for city in cities:
            citylist=citylist+'["'+city.name.encode('ascii','ignore')+'","'+str(city.pk)+'","'+str(city.state.id)+'"],'

    citylist=citylist+']'

    skilllist='[["All","0","0"],'

    for skill in skills:
        skilllist=skilllist+'["'+skill.name.encode('ascii','ignore')+'","'+str(skill.pk)+'","'+str(skill.skillcategory.id)+'"],'

    skilllist=skilllist+']'
    
    
    menu_dict={'statelist': statelist,'catlist':catlist,'citylist':citylist,'skilllist':skilllist}

    return menu_dict
    

    
    
    
def profile_serializer(profile_obj):
    
    
    json_str="["
    
    for prof in profile_obj:
        json_str=json_str+"""
        {"pk":%(prof.pk),"model":"user_profile.userprofile","fields":{"link5_desc":"","link4_title":"","link1_title":"","link6_title":"","link3_title":"","skill":"Developer","link7_desc":"","city":"Milwaukee","link4_desc":"","link2_title":"","public_phone_num":"","state":"Wisconsin","link5":"","link4":"","link7":"","link6":"","link1":"","link3":"","link2":"","link2_desc":"","link3_desc":"","link6_desc":"","link8":"","skillcategory":"Web Development","shortdesc":"asd","link7_title":"","user":["B@m.com"],"link8_title":"","link5_title":"","link8_desc":"","public_email":"","name":"asdf","link1_desc":"","prof_pic":"TinyGrab Screen Shot 6-1-13 8.04.12 PM.png","longdesc":""}}
        ,"""
    
    json_str=json_str+"]"
    
    from django.utils import simplejson
    return simplejson.dumps(json_str)
    
    
    
    
    
    
    
    
    
    