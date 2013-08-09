

//var cities = new Array(new Array('All', '0', '0'),new Array('Minneapolis', '1', '1'),new Array('Madison', '2', '2'));
//var categories = new Array(new Array('All', '0'),new Array('Programming', '1'),new Array('Video', '2'));
//var skills = new Array(new Array('All', '0', '0'),new Array('Javascript', '1', '1'),new Array('Weddings', '2', '2'));
//Cities number should start from 0 for each state



// This start the menu with "all" selected for everything
var selState = "0";
var selCity = "0";
var selCat	= "0";
var selSkill = "0";


$(document).ready(function() {

	
	
    // Initialize
    
	fillOptions('#state', states, selState);
	fillSubOptions('#city', cities, selState, selCity);

	fillOptions('#category', categories, selCat );
	fillSubOptions('#skills', skills, selCat, selSkill)

	renderResults(selCity,selState,selSkill,selCat);
	
	
	$(document).on('click','.profile-index', function() {
	    
	    
	    
	    var selid=$(this).attr("id");
	    alert(selid)
	    
	
	    
	    $('#'+selid).css('height','500px')
	    
	    /*
	    $.get("/profrequest",{ 'selpk' : selpk}, function(data,status){
           profiles=data.userlist;
          loadProfiles(profiles)

         });
         */
         
	    
    });
	
	
	$(document).on('click','li', function() {
		
				if	($(this).parent().attr("id") == "state")
					{	
						
						var selStateNew= "-1";
						
						//-1 if not found
						selStateNew=$(this).attr("id");
							
						// if reselecting already selected state
						if (selStateNew == selState)
							{
								selState = "-1";
								selCity = "-1";
							}
						else 
							{ 
								selState = selStateNew;
								selCity = "0";
							}
					};

				if	($(this).parent().attr("id") == "city")
					{
						var selCityNew="-1";

						selCityNew=$(this).attr("id");

						if(selCityNew == selCity){ selCity = "-1";}
						else{selCity=selCityNew;}
					}



				if	($(this).parent().attr("id") == "category")
						{	

							var selCatNew= "-1";

							selCatNew=$(this).attr("id");

							if (selCatNew == selCat)
								{
									selCat = "-1";
									selSkill = "-1";
								}
							else 
								{ 
									selCat= selCatNew;
									selSkill = "0";
								}
						};

				if	($(this).parent().attr("id") == "skills")
						{
							var selSkillNew="-1";

							selSkillNew=$(this).attr("id");

							if(selSkillNew == selSkill){ selSkill = "-1";}
							else{selSkill=selSkillNew;}
						}

		fillOptions('#state', states, selState);
		fillSubOptions('#city', cities, selState, selCity);
		
		fillOptions('#category', categories, selCat );
		fillSubOptions('#skills', skills, selCat, selSkill)
		
		renderResults(selCity,selState,selSkill,selCat);

	});

});


