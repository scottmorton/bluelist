categories=(('Web Development',
                        [ 'IOS Developer', 'Android Developer', 'Front End Developer', 'Backend Developer']),
            ('Live Performance',
                        [ 'Rock Band', 'Folk Band', 'Comedian']),
            ('Engineering',
                        [ 'Mechanical Engineer','Civil Engineer','Chemical Engineer','Biomedical Engineer','Electrical Engineer', 'Computer Engineer']),
            ('Writing',
                        [ 'Copy Writer', 'Journalist']),
            ('Repair',
                        [ 'Car Mechanic',]),
            ('Advertising',
                        [ 'Digital Media Strategist']),
            ('Design',
                        [ 'Architect', 'Graphic Artist']),
            ('Video Production',
                        [ 'Videographer']),  
            ('Home Services',
                        [ 'Remodeler','L']),     
                        )
liststring="["

k=1

for i in range(0,len(categories)):
    if i!=0:
        liststring +=','
        
    liststring += '{"model": "user_profile.skillcategory","pk":'+str(i+1)+',"fields": {"name":"'+categories[i][0]+'"}}'
    for j in range(0,len(categories[i][1])):
        
        liststring +=','
        liststring +='{"model": "user_profile.skill","pk":'+str(k)+',"fields": {"name":"'+categories[i][1][j]+'","skillcategory":'+str(i+1)+'}}'
        k+=1


liststring += "]"


f=open('/var/www/bluelist.us/src/bluelist/bluelist/fixtures/category_items.json', 'w')
f.write(liststring)
f.close()