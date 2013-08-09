

$(document).ready(function(){
  
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