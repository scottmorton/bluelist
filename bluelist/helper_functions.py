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