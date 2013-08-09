function fillOptions(boxId, array, selId) {
 
var listString="";

for(var i=0; i<array.length; i++)
	{
		if (  selId == array[i][1] )
			{	
				listString+="<li class='a' id="+ String(array[i][1]) + ">" + array[i][0] +"  </li>";
			}
		else
			{
				listString+="<li class='b' id="+ String(array[i][1]) + ">" + array[i][0] +"  </li>";
			}
	};
	
	$(boxId).html(listString);
	
};


function fillSubOptions(boxId, array, selId, subSelId) {
		var listString="";
		
		//go through array of items and generate html to display
		for(var i=0; i< array.length; i++)
			{
				// if selected id matches last integer, or all selected (0) or 
				if( selId == array[i][2] || selId == "0" || (array[i][1]==0 && selId != "-1")) //Add to list conditions
					{

					if ( subSelId == array[i][1] )
						{	
							listString+= "<li class='a' id=" + String(array[i][1]) + ">" + array[i][0] + "</li>";
						}
					else
						{
							listString+="<li class='b' id=" + String(array[i][1]) + ">" + array[i][0] + "</li>";
						}
					};
			};

		$(boxId).html(listString);
	
};
