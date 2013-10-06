$(document).ready(function(){
  
    
  renderHeader(signed_in);
  
  $('#nav li').hover(
  function () {
      //show submenu
      $('ul', this).slideDown("fast");
  }, function () {
      //hide submenu
      $('ul', this).slideUp("fast");
  });
  
  
  
  var last_link=1;
  
    for(var i=1; i < 9; i++)
    {
        
        if( document.getElementById("id_link"+String(i)).value=="" && 
            document.getElementById("id_link"+String(i)+"_desc").value=="" &&
            document.getElementById("id_link"+String(i)+"_title").value=="")
            {
                document.getElementById("link"+String(i)).style.display = "none";
            }
        else
            {
            	last_link=i+1;
            }
    }
    
    if(last_link==1)
    {
        document.getElementById("links_label").style.display = "none";
    }
  
  
    
	$(document).on('click','#add_link', function() {
    
         document.getElementById("link"+String(last_link)).style.display = "block";
        last_link=last_link+1;
        
        //If all links are shown hide the add link button
        if(last_link>8)
        {
            document.getElementById("add_link").style.display = "none";
        }
        if(last_link==2)
        {
            document.getElementById("links_label").style.display = "block";
        }
        
    });
  
  
  
  
  
  
  
  
  var last_file=1;
  
    for(var i=1; i < 9; i++)
    {
        
        if( document.getElementById("id_file"+String(i)).value=="" && 
            document.getElementById("id_file"+String(i)+"_desc").value=="" &&
            document.getElementById("id_link"+String(i)+"_title").value=="")
            {
                document.getElementById("file"+String(i)).style.display = "none";
            }
        else
            {
            	last_file=i+1;
            }
    }
    
    if(last_file==1)
    {
        document.getElementById("uploads_label").style.display = "none";
    }
    
  
  
  
    
	$(document).on('click','#add_file', function() {
    
         document.getElementById("file"+String(last_file)).style.display = "block";
        last_file=last_file+1;
        
        //If all links are shown hide the add link button
        if(last_file>8)
        {
            document.getElementById("add_file").style.display = "none";
        }
        if(last_file==2)
        {
            document.getElementById("uploads_label").style.display = "block";
        }
        
    });
  
  
  
  
  
    if( document.getElementById("id_public_email").value=="" && 
        document.getElementById("id_public_phone_num").value=="")
        {
            document.getElementById("contact").style.display = "none";
        }
    else
        {
            document.getElementById("add_contact").style.display = "none";
        }
        
  
  
    $(document).on('click','#add_contact', function() {

             document.getElementById("contact").style.display = "block";
             document.getElementById("add_contact").style.display = "none";

        });
        



  if( document.getElementById("id_longdesc").value=="")
      {
          document.getElementById("additional_info").style.display = "none";
      }
  else
    {
          document.getElementById("add_info").style.display = "none";
    }


  $(document).on('click','#add_info', function() {

 
           document.getElementById("additional_info").style.display = "block";
           document.getElementById("add_info").style.display = "none";

      });
  
  
  
  
  // This block is the dynamic drop down for states and cities
    var value = $("#id_state").val();
    var elid=$("#id_city");
    elid.empty()
    fillDropdown(elid, cities, value)
    
    var value = $("#id_skillcategory").val(); 
    var elid=$("#id_skill");
    elid.empty()
    fillDropdown(elid, skills, value)
  
  
  $("#id_state").change(function() {
      var value = $("#id_state").val();
      var elid=$("#id_city");
      elid.empty()
      fillDropdown(elid, cities, value)
    });
  
  
  $("#id_skillcategory").change(function() {
      var value = $("#id_skillcategory").val(); 
      var elid=$("#id_skill");
      elid.empty()
      fillDropdown(elid, skills, value)
    });
    
    
    
  
});




function fillDropdown(elemId, array, selId) {
 
var listString="";

for(var i=0; i<array.length; i++)
	{
		if (  selId == array[i][2] )
			{	
				listString+="<option value='"+String(array[i][1]) + "' selected='selected'>" + array[i][0] +"</option>";
			}
	};

	$(elemId).html(listString);
	
};