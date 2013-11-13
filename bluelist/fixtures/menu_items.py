categories=(('Website and Mobile Development',
                        [ 'Front End Developer', 'Back End Developer','IOS Developer', 'Android Developer', 'Mobile Website']),
            ('Engineering',
                        ['Mechanical','Software','Electrical']),
            ('Live Performance',
                        [ 'Bands','Live Entertainment']),
            ('Writing',
                        [ 'Copy Writing','Editing','Article Writing','Blog Writing','Technical Writing','Translation']),
            ('Marketing and Advertising',
                        [ 'Internet Advertising','Search Engine Optimization','Marketing Communications']),
            ('Design',
                        ['Graphic Design','Website Design','Print Design','Animation']),
            ('Broadcast',
                        [ 'Television Production','Music and Audio','Acting','Modeling']),
            ('Photography',
                        [ 'Photography','Photo Editing']),
            ('Videography',
                        ['Video Production','Video Editing']),
            ('Household Services',
                        [ 'Interior design','Housecleaning','Remodeling','Lawn Care','Plumbing','Carpet Cleaning','Painting','Electrical','Roofing','Windows','Heating & A/C']),
            ('Other',
                        ['Other',])      
                        )
liststring="["

"""
categories=(('Web Development',
                        [ 'Front End Developer', 'Back End Developer']),
            ('Mobile Development',
                    ['IOS Developer', 'Android Developer', 'Mobile Website']),
            ('Live Performance',
                        [ 'Bands',]),
            ('Writing',
                        [ 'Copy Writer','Editor','Blog Writing','Technical Writing']),
            ('Auto',
                        [ 'Car Mechanic','Motorcycle Mechanic','Body','Interior','Stereo','Restoration']),
            ('Sales and Marketing',
                        [ 'Digital Media Strategist']),
            ('Design',
                        ['Graphic Design','Website Design','3D Modeling','Animation','Brochure Design']),
            ('Video Production',
                        [ 'Videographer']),  
            ('Household Services',
                        [ 'Interior design','Housecleaning','Remodeling','Lawn Care','Plumbing','Carpet Cleaning','Painting','Electrical','Roofing','Windows','Heating & A/C']),
            ('Other',
                        ['Other',])                 
                        )

"""
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