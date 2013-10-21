

//var cities = new Array(new Array('All', '0', '0'),new Array('Minneapolis', '1', '1'),new Array('Madison', '2', '2'));
//var categories = new Array(new Array('All', '0'),new Array('Programming', '1'),new Array('Video', '2'));
//var skills = new Array(new Array('All', '0', '0'),new Array('Javascript', '1', '1'),new Array('Weddings', '2', '2'));
//Cities number should start from 0 for each state

// State variables (initialized to "All" and not signed in)

var selState = "0";
var selCity = "0";
var selCat	= "0";
var selSkill = "0";
var pg_num=1;
var profiles=[["this","awesome"],["fun","times"]];
//var signed_in=false;


$(document).ready(function() {
    
    // Initialize menu and navbar states
	fillOptions('#state', states, selState);
	fillSubOptions('#city', cities, selState, selCity);

	fillOptions('#category', categories, selCat );
	fillSubOptions('#skills', skills, selCat, selSkill);
	renderResults(selCity,selState,selSkill,selCat);
	renderHeader(signed_in, registered);



	
	$(document).on('click','#more_profs', function(event) {
	    pg_num=pg_num+1;
	    addResults(selCity, selState, selSkill, selCat, pg_num);

	});
	
	
	/* Message system removed for MVP 1.0
	
	
	$(document).on('click','#msg', function(event) {
         event.stopPropagation();

         if(auth="true")
         {


             var selid = $(this).closest(".profile-index, .profile-index").attr("id");
             var pnum=Number(selid.slice(4));

             expandProfile(selid);
         
             var messagefield='<div class="sendmessage"> <textarea cols="80" id="message" name="message" rows="6"></textarea></div>';
             var sendmsgopts='<div class="index-options">                                   \
          			            <div class="option">                                        \
          			                <a class="index-option" id="send">Send</a>              \
          			                <a class="index-option" id="less">Less</a>              \
          			            </div>                                                      \
          			        </div>';
     
                $('#'+selid).find(".index-options").remove();
                $('#'+selid).append( messagefield+sendmsgopts);
        
        }
        
        else
        {
            
        }
        
        });
   
    */
    
	$(document).on('click','.profile-index', function() {
	    var selid=$(this).attr("id");
	    var pnum=Number(selid.slice(4));

         contactResponse(pnum);

    });
	

	$(document).on('click','#contact', function(event) {
	   event.stopPropagation();
	   var selid = $(this).closest(".profile-index, .profile-index").attr("id");
       var pnum=Number(selid.slice(4));
       
       contactResponse(pnum);
       
       
    });
	
	
    $(document).on('click','#more', function(event) {
        event.stopPropagation();
        var selid = $(this).closest(".profile-index").attr("id");
        var pnum=Number(selid.slice(4));
        
        $(this).closest(".profile-index").find('#less','.long-desc','.links').show();
        $(this).closest(".profile-index").find('.long-desc').show();
        $(this).closest(".profile-index").find('.links').show();
        $(this).closest(".profile-index").find('#more').hide();
        
      });
    
    $(document).on('click','#less', function(event) {
        event.stopPropagation();
        var selid = $(this).closest(".profile-index").attr("id");
        var pnum=Number(selid.slice(4));
        
        $(this).closest(".profile-index").find('#less','.long-desc','.links').hide();
        $(this).closest(".profile-index").find('.long-desc').hide();
        $(this).closest(".profile-index").find('.links').hide();
        $(this).closest(".profile-index").find('#more').show();
        
      });
    
    
    
    $(document).on('click','#signup', function(e) {
                signup();
    });
    
    
    $(document).on('click','#signup-submit', function() {
      
        //get state
      
        var ent_email=document.getElementById('id_email').value;
        var ent_pw1=document.getElementById('id_password1').value;
        var ent_pw2=document.getElementById('id_password2').value;


         var email_error=validateEmailField(document.getElementById('id_email').value);
         var password_error=validatePasswordFields(document.getElementById('id_password1').value, document.getElementById('id_password2').value);
           
         if(password_error=="" &&  email_error=="")
         {
             $.post("/signup",{ 'email':ent_email,'password1': ent_pw1,'password2': ent_pw2 }, function(data,status){
         	                           
         	      if(data.status=="success")
         	      {
         	          // return to state
         	          
         	          signed_in='true';
         	          registered='false';
           	          renderHeader(signed_in,registered);
         	          $('.lbox-container').trigger('close');
         	      }
         	      else
         	      { 
         	            var error_string='';
         	            for (var key in data.errors) 
         	            {
                            if (data.errors.hasOwnProperty(key)) 
                            {
               	             var error_string=error_string+'<p class="error-msg">'+data.errors[key]+'</p>';
                            }
                        }
                        $("#error-msgs").html(error_string);
     	             }
              });
              
         }
         else
         {
             var error_string='<p class="error-msg">'+email_error+'</p> <p class="error-msg">'+password_error+'</p>';
             $("#error-msgs").html(error_string);
         }
         
     });
    
    
    
    $(document).on('click','#signin', function() {
        
                  signin();

    });
      
      
    $(document).on('click','#login-submit', function() {
      
        //get state

        var ent_email=document.getElementById('id_email').value;
        var ent_pw=document.getElementById('id_password').value;

        
         var email_error=authEmailField(document.getElementById('id_email').value);
         var password_error=authPasswordField(document.getElementById('id_password').value);

         if(email_error=="" && password_error=="")
         {
             
             $.post("/signin",{'email':ent_email,'password': ent_pw}, function(data,status){
         	      
         	      
         	      if(data.status=="success")
         	      {
         	          // return to state
         	          signed_in='true';
         	          
         	          registered=data.registered;
         	          renderHeader(signed_in, registered);
         	          
         	          $('.lbox-container').trigger('close');
         	          //Reload
         	          
         	      }
         	      else
         	      {
         	          
         	            var error_string='';
         	            
         	            for (var key in data.form.error) 
         	            {
                            if (data.form.error.hasOwnProperty(key)) 
                            {
               	             var error_string=error_string+'<p class="error-msg">'+data.form.error[key]+'</p>';
                            }
                        }
                        $("#error-msgs").html(error_string);
     	             }
     	             
              });
              
         }
         else
         {
             var error_string='<p class="error-msg">'+email_error+'</p> <p class="error-msg">'+password_error+'</p>';
             $("#error-msgs").html(error_string);
         }
         
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


