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
			name="";
			desc="";
			profTemplate="";
			results="";
		
		    num+=1;
			name= profiles[i].fields.name;
		    desc= profiles[i].fields.shortdesc;
		    city= profiles[i].fields.city;
		    state=profiles[i].fields.state;
		    skill=profiles[i].fields.skill;
		    

			profTemplate='<div class="profile-index" id="prof'+String(i)+'">    \
			                    <div class="index-pic"> 				    \
				                    <img src="http://m.c.lnkd.licdn.com/mpr/mpr/shrink_200_200/p/7/000/231/210/057999a.jpg" height="100">  \
			                    </div> 									    \
						 		<div class="index-text"> \
						 			    <div class="profile-name">                                        \
										    <p class="index-name">'+name+'</p>      \
										</div>\
										<div class="profile-tag">                                        \
										    <p class="tag">'+skill+' in '+city+', '+state+'</p>      \
										</div>                                  \
										<div class="short-desc">                     \
										    <p class="index-desc">'+desc+'</p> 	\
										</div>      \
						 			</div> 								    \
					  	  </div>';
					listString+= profTemplate;		//Combine string list
			}

	results='<p class="Results">'+String(num)+' Results</p>';
	$('#searchResults').html(results+listString);
}



