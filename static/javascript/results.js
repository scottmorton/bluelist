function renderResults(selCity, selState, selSkill, selCat) {
    //l_prof=0;

    $.get("/proflist",{ 'selstate' : String(selState),
	                        'selcity': String(selCity),
	                        'selcat':String(selCat),
	                        'selskill':String(selSkill),
	                        'pg_num':String(pg_num)}, function(data,status){
                               	   
       
            
       //profiles=jQuery.parseJSON(data.profiles);
       var prof_html=data.prof_string;
       
       var num_profs=data.num_profiles;
       var more_profs=String(data.more_profs);
       
       if(more_profs=="false")
  	    {
  	        $('#more_profs').hide();
          }
         else
         {
             $('#more_profs').show();
         }
    
          
       var listString=prof_html;
       
       
       listString='<p id="num_profs" class="Results">'+num_profs+' Result(s)</p>'+listString;
       
       $('#searchResults').html(listString);
       
       //l_prof=profiles.length;
         });

    };


function addResults(selCity, selState, selSkill, selCat) {
    
    $.get("/proflist",{ 'selstate' : String(selState),
	                        'selcity': String(selCity),
	                        'selcat':String(selCat),
	                        'selskill':String(selSkill),
	                        'pg_num':String(pg_num)}, function(data,status){

       var new_profile_string=data.profiles;
       
       var more_profs=String(data.more_profs);
       
       if(more_profs=="false")
  	    {
  	        $('#more_profs').hide();
        }
       
       $('#searchResults').append(new_profile_string);
       
       //l_prof=profiles.length;

     });
};


/*
function profString(){

    var listString="";

	for(var i=l_prof; i < profiles.length; i++)  //Iterate through profiles variables
		{
		    var profTemplate=expandProfile(i);
			listString+= '<div class="profile-index profile-min" id="prof'+String(i)+'">'+profTemplate+'</div>';	//Combine string list
			}
            return listString;
}



*/

/*

function expandProfile(pnum){
    
    
	var name= profiles[pnum].fields.name;
	var service= profiles[pnum].fields.service;
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
        if(links[i][0]!="" || links[i][1]!="" || links[i][2]!="")
        {
            link_present=true;
            
            linklist=linklist+'<div class="link-container">\
                                    <div class="link-title-container">\
                                        <a href="'+links[i][0]+'">'+links[i][1]+'</a>\
                                    </div>\
                                    <div class="link-desc-container">\
                                        <p class="link-desc">'+links[i][2]+'</p>\
                                    </div>\
                                </div>';
            
        }
    }
    
    var files =[[" "," "],[" "," "],[" "," "],[" "," "],[" "," "],[" "," "],[" "," "],[" "," "]];
    
    
    files[0][0]=profiles[pnum].fields.file1;
    files[0][1]=profiles[pnum].fields.file1_title;
    files[0][2]=profiles[pnum].fields.file1_desc;

    files[1][0]=profiles[pnum].fields.file2;
    files[1][1]=profiles[pnum].fields.file2_title;
    files[1][2]=profiles[pnum].fields.file2_desc;
    
    files[2][0]=profiles[pnum].fields.file3;
    files[2][1]=profiles[pnum].fields.file3_title;
    files[2][2]=profiles[pnum].fields.file3_desc;
    
    files[3][0]=profiles[pnum].fields.file4;
    files[3][1]=profiles[pnum].fields.file4_title;
    files[3][2]=profiles[pnum].fields.file4_desc;
    
    files[4][0]=profiles[pnum].fields.file5;
    files[4][1]=profiles[pnum].fields.file5_title;
    files[4][2]=profiles[pnum].fields.file5_desc;
    
    files[5][0]=profiles[pnum].fields.file6;
    files[5][1]=profiles[pnum].fields.file6_title;
    files[5][2]=profiles[pnum].fields.file6_desc;
    
    files[6][0]=profiles[pnum].fields.file7;
    files[6][1]=profiles[pnum].fields.file7_title;
    files[6][2]=profiles[pnum].fields.file7_desc;
    
    files[7][0]=profiles[pnum].fields.file8;
    files[7][1]=profiles[pnum].fields.file8_title;
    files[7][2]=profiles[pnum].fields.file8_desc;

    
    var filelist="";
    var file_present=false;

    for(var i=0; i<8; i++)
    {
        if(files[i][0]!="" || files[i][1]!="" || files[i][2]!="")
        {
            file_present=true;
            
            filelist=filelist+'<div class="file-container">                                     \
                                    <div class="file-title-container">                          \
                                        <a href="/media/'+files[i][0]+'">'+files[i][1]+'</a>    \
                                    </div>                                                      \
                                    <div class="file-desc-container"                            \
                                        <p class="file-desc">'+files[i][2]+'</p>                \
                                    </div>                                                      \
                                </div>';
            
        }
    }
    
    
    var image_string="";
    
    if(prof_pic!="")
    {
        image_string='<a href="/media/'+prof_pic+'" ><img class="index_image" src="/media/'+prof_pic+'" ></a>';
    }

    var sample_work_title="";
    
    if(link_present || file_present)
    {
        sample_work_title="<h4> References and Links </h4>"
    }
    
    /*
    if(file_present)
    {
        sample_work_title="	<h4> Uploaded Files </h4>"
    }
    */
    
    /*
    var optionslist="";
    if(link_present || file_present || longdesc!="")
    {
        optionslist='<a class="index-option" id="contact">Contact</a><a hidden class="index-option" id="less">Less</a><a class="index-option" id="more">More</a>';
    }
    else
    {
        optionslist='\
        <a class="index-option" id="contact">Contact</a>';
    }
    
    var hash={
        image_string:image_string,
        name:name,
        service:service,
        city:city,
        state:state,
        shortdesc:shortdesc,
        longdesc:longdesc,
        sample_work_title:sample_work_title,
        linklist:linklist,
        filelist:filelist,
        optionslist:optionslist 
    };

	var profTemplate='<div class="index-pic">\
		                    {{& image_string}}\
	                    </div>\
				 		<div class="index-text">\
				 			    <div class="profile-name">\
								    <p class="index-name">{{& name}}</p>\
								</div>\
								<div class="profile-tag">\
								    <p class="tag">{{& service}} in {{& city}}, {{& state}}</p>\
								</div>\
								<div class="short-desc">\
								    <p class="index-desc">{{& shortdesc}}</p>\
								</div>\
								<div hidden class="exp_section">\
								    <div class="long-desc">\
								        <p class="long-desc">{{& longdesc}}</p>\
								    </div>\
								    <div class="links">\
								        {{& sample_work_title}}\
								        {{& linklist}} {{& filelist}}\
								    </div>\
								</div>\
								<div class="index-options">\
								    <div class="option">\
					 			        {{& optionslist}}\
					 			    </div>\
					 			</div>\
					 	</div>';
    
    var template=Mustache.to_html(profTemplate, hash);
    return template;
    
}
*/
