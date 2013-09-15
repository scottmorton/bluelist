$(document).ready(function(){
  
    
  renderHeader(signed_in);

  
  var last_link=2;
  
    for(var i=2; i < 9; i++)
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
    
    
    
	$(document).on('click','#add_link', function() {
    
         document.getElementById("link"+String(last_link)).style.display = "block";
        last_link=last_link+1;
        
        //If all links are shown hide the add link button
        if(last_link>8)
        {
            document.getElementById("add_link").style.display = "none";
        }
        
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