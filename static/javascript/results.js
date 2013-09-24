function renderResults(selCity, selState, selSkill, selCat) {
    
    var profiles=[["this","awesome"],["fun","times"]]
    
    $.get("/proflist",{ 'selstate' : String(selState),
	                        'selcity': String(selCity),
	                        'selcat':String(selCat),
	                        'selskill':String(selSkill)}, function(data,status){
      
        
       profiles=data;
       loadProfiles(profiles)
       
       
     });
     
};


function loadProfiles(profarray){
    
    profiles=profarray;
    
    var listString="";
	
	var num=0;

	for(var i=0; i < profiles.length; i++)  //Iterate through profiles variables
		{
		
		    num+=1;
		    
		    var profTemplate=minProfile(i);
			listString+= '<div class="profile-index" id="prof'+String(i)+'">'+profTemplate+'</div>';	//Combine string list
			
			
			}

	results='<p class="Results">'+String(num)+' Results</p>';
	$('#searchResults').html(results+listString);
}



function expandProfile(pnum){
    
    
	var name= profiles[pnum].fields.name;
	var city= profiles[pnum].fields.city;
    var state=profiles[pnum].fields.state;
    var skill=profiles[pnum].fields.skill;
    var prof_pic=profiles[pnum].fields.prof_pic;
    
    var shortdesc= profiles[pnum].fields.shortdesc;
    var longdesc = profiles[pnum].fields.longdesc;
    
    
    
    var links=[[" "," "],[" "," "],[" "," "],[" "," "],[" "," "],[" "," "],[" "," "],[" "," "]];
    
    
    links[0][0]=profiles[pnum].fields.link1;
    links[0][1]=profiles[pnum].fields.link1_title;
    links[0][2]=profiles[pnum].fields.link1_desc;

    links[1][0]=profiles[pnum].fields.link2;
    links[1][1]=profiles[pnum].fields.link2_title;
    links[1][2]=profiles[pnum].fields.link2_desc;
    
    links[2][0]=profiles[pnum].fields.link3;
    links[2][1]=profiles[pnum].fields.link3_title;
    links[2][2]=profiles[pnum].fields.link3_desc;
    
    links[3][0]=profiles[pnum].fields.link4;
    links[3][1]=profiles[pnum].fields.link4_title;
    links[3][2]=profiles[pnum].fields.link4_desc;
    
    links[4][0]=profiles[pnum].fields.link5;
    links[4][1]=profiles[pnum].fields.link5_title;
    links[4][2]=profiles[pnum].fields.link5_desc;
    
    links[5][0]=profiles[pnum].fields.link6;
    links[5][1]=profiles[pnum].fields.link6_title;
    links[5][2]=profiles[pnum].fields.link6_desc;
    
    links[6][0]=profiles[pnum].fields.link7;
    links[6][1]=profiles[pnum].fields.link7_title;
    links[6][2]=profiles[pnum].fields.link7_desc;
    
    links[7][0]=profiles[pnum].fields.link8;
    links[7][1]=profiles[pnum].fields.link8_title;
    links[7][2]=profiles[pnum].fields.link8_desc;

    var linklist="";
    var link_present=false;
    
    
    for(var i=0; i<8; i++)
    {
        if(links[i][0]!="" && links[i][1]!="")
        {
            link_present=true;
            
            linklist=linklist+'<div class="link-container">                                     \
                                    <div class="link-title-container">                          \
                                        <a href="'+links[i][0]+'">'+links[i][1]+'</a>           \
                                    </div>                                                      \
                                    <div class="link-desc-container"                            \
                                        <p class="link-desc">'+links[i][2]+'</p>                \
                                    </div>                                                      \
                                </div>';
            
        }
        
    }
    
    var image_string="";
    
    if(prof_pic!="")
    {
        image_string='<img src="/media/'+prof_pic+'" height="100">';
    }

    var sample_work_title="";
    
    if(link_present)
    {
        sample_work_title="	<h4> Reference Links </h4>"
    }


	var profTemplate='<div class="index-pic"> 				                                        \
		                    '+image_string+'                                                    \
	                    </div> 									                                \
				 		<div class="index-text">                                                \
				 			    <div class="profile-name">                                      \
								    <p class="index-name">'+name+'</p>                          \
								</div>                                                          \
								<div class="profile-tag">                                       \
								    <p class="tag">'+skill+' in '+city+', '+state+'</p>         \
								</div>                                                          \
								<div class="short-desc">                                        \
								    <p class="index-desc">'+ shortdesc+'</p> 	                \
								</div>                                                          \
								<div class="long-desc">                                         \
								    <p class="long-desc">'+ longdesc+'</p> 	                    \
								</div>                                                          \
								<div class="links">                                             \
								'+sample_work_title+'                                       \
								'+linklist+'                                                    \
								</div>                                                          \
								<div class="index-options">                                     \
								    <div class="option">                                        \
					 			        <a class="index-option" id="contact">Contact</a>       \
					 			        <a class="index-option" id="less">Less</a>              \
					 			    </div>                                                      \
					 			</div>                                                          \
					 	</div>';
    
    return profTemplate;

}


function minProfile(pnum){
    
	var name= profiles[pnum].fields.name;
	var city= profiles[pnum].fields.city;
    var state=profiles[pnum].fields.state;
    var skill=profiles[pnum].fields.skill;
    var prof_pic=profiles[pnum].fields.prof_pic;
    
    var image_string="";
    
    if(prof_pic!="")
    {
        image_string='<img src="/media/'+prof_pic+'" height="100">';
    }
    
    var shortdesc= profiles[pnum].fields.shortdesc;
    
    var profTemplate='      <div class="index-pic"> 				                            \
		                    '+image_string+'                                                    \
	                    </div> 									                                \
				 		<div class="index-text">                                                \
				 			    <div class="profile-name">                                      \
								    <p class="index-name">'+name+'</p>                          \
								</div>                                                          \
								<div class="profile-tag">                                       \
								    <p class="tag">'+skill+' in '+city+', '+state+'</p>         \
								</div>                                                          \
								<div class="short-desc">                                        \
								    <p class="index-desc">'+shortdesc+'</p> 	                \
								</div>                                                          \
								<div class="index-options">                                     \
								    <div class="option">                                        \
					 			        <a class="index-option" id="contact">Contact</a>       \
					 			        <a class="index-option" id="more">More</a>              \
					 			    </div>                                                      \
					 			</div>                                                          \
					 	</div>';
			 	  
    return profTemplate;
    
}
