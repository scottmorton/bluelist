

//var cities = new Array(new Array('All', '0', '0'),new Array('Minneapolis', '1', '1'),new Array('Madison', '2', '2'));
//var categories = new Array(new Array('All', '0'),new Array('Programming', '1'),new Array('Video', '2'));
//var skills = new Array(new Array('All', '0', '0'),new Array('Javascript', '1', '1'),new Array('Weddings', '2', '2'));
//Cities number should start from 0 for each state



// State variables (initialized to "All" and not signed in)

var selState = "0";
var selCity = "0";
var selCat	= "0";
var selSkill = "0";
//var signed_in= false;


$(document).ready(function() {

	
    // Initialize
    
	fillOptions('#state', states, selState);
	fillSubOptions('#city', cities, selState, selCity);

	fillOptions('#category', categories, selCat );
	fillSubOptions('#skills', skills, selCat, selSkill);
	renderResults(selCity,selState,selSkill,selCat);
	
	
	renderHeader(signed_in);

	
	/* Message system removed for MVP 1.0
	
	
	$(document).on('click','#msg', function(event) {
         event.stopPropagation();

         if(auth="true")
         {


             var selid = $(this).closest(".profile-index-expanded, .profile-index").attr("id");
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
	
	
	$(document).on('click','#contact', function(event) {
	   event.stopPropagation();
	   
	   var selid = $(this).closest(".profile-index-expanded, .profile-index").attr("id");
       var pnum=Number(selid.slice(4));
       name= profiles[pnum].fields.name;
       public_email= profiles[pnum].fields.public_email;
       public_phone_num= profiles[pnum].fields.public_phone_num;

       contact_html='<div class="lbox-container">                                                                          \
                   <img class="lbox-close" id="lbox_close" src="static/close.png" alt="Smiley face">                        \
                   <div class="lbox-info">                                                                                  \
                        <h4> Contact info provided by '+name+' </h4>\
                        <table class="lbox-table" id="contact_info"> \
                            <tr><td><p class="contact-label"><b>Email:</b></p></td><td> <p class="contact-text"> '+public_email+'</p></td></tr>\
                            <tr><td><p class="contact-label"><b>Phone number:</b> </p></td><td> <p class="contact-text">'+public_phone_num+'</p></td></tr>\
                        </table>\
                   </div>                                                                                                   \
             	   </div>';
       
       
       
       
       $(contact_html).lightbox_me({closeSelector:'#lbox_close',centered: true, 
               overlayCSS:{background: 'black', opacity: .5},  onLoad: function() {
           }, onClose: function(){$('.lbox-container').remove();} });
           e.preventDefault();
	    
	   
    });
	
	
	
	$(document).on('click','.profile-index', function() {
	    var selid=$(this).attr("id");
	    expandProfile(selid);
    });
    
    
    $(document).on('click','#less', function() {
        var selid = $(this).closest(".profile-index-expanded").attr("id");
        minProfile(selid);
      });
    
    
    $(document).on('click','#signup', function(e) {
        
                //remove 
        
                 var indiv='<div class="lbox-container">                                                                                      \
                            <img class="lbox-close" id="lbox_close" src="static/close.png" alt="Smiley face">              \
                            <div class="lbox-info">                                                                                           \
                            <h3 class="lbox-heading"> Bluelist Signup</h3> \
                            <div id="error-msgs"> \
                            </div>                    \                                                 \                                                                                     \
                            <form action="" method="post" id="signup_form">                                                                    \
                  		        <table class="lbox-table">                                                                                     \
                  		            <tr><td><label for="id_email">Email address</label></td></tr>                                               \
                  		            <tr><td><input class="input-field" id="id_email" maxlength="255" name="email" type="text" /></td></tr>      \
                                    <tr><td><label for="id_password1" >Password</label> </td></tr>                                              \
                                    <tr><td><input class="input-field" id="id_password1" name="password1" type="password" /></td></tr>           \
                                    <tr><td><label for="id_password2">Password again!</label>   </td></tr>                                      \
                                    <tr><td><input class="input-field" id="id_password2" name="password2" type="password" /></td></tr>          \
                  		        </table>                                                                                                        \
                  		        <div class="lbox-submit" id="signup-submit"> Signup </div>                                               \
                  		</form>                                                                                                                 \
                  		</div>                                                                                                                 \
                  		</div>';
                  		
                  	
                   $(indiv).lightbox_me({ closeSelector:'#lbox_close', centered: true, 
                        overlayCSS:{background: 'black', opacity: .5},  onLoad: function() {
                          $("#id_email").focus();
                    },onClose: function(){$('.lbox-container').remove();}});
                    e.preventDefault();
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
             alert("successful submit")
             $.post("/signup",{ 'email':ent_email,'password1': ent_pw1,'password2': ent_pw2 }, function(data,status){
         	                            
         	      if(data=="success")
         	      {
         	          // return to state
         	          
         	          signed_in='true';
           	          renderHeader(signed_in);
                      
         	          
         	          $('.lbox-container').trigger('close');
         	      }
         	      else
         	      {
         	            var error_string='';
         	            for (var key in data) 
         	            {
                            if (data.hasOwnProperty(key)) 
                            {
               	             error_string=error_string+'<p class="error-msg">'+data[key]+'</p>';
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
        
                  
                        var indiv=' <div class="lbox-container">                                                                                \
                                    <img class="lbox-close" id="lbox_close" src="static/close.png" alt="Smiley face">         \
                                    <div class="lbox-info">                                                                                     \
                                    <h3 class="lbox-heading">Bluelist Login</h3>                                                             \
                                    <div id="error-msgs"> \
                                    </div>                                                                                                      \
                                    <form action="" method="post">                                                                              \
                          		        <table class="lbox-table">                                                                              \
                          		            <tr><td><label for="id_email">Email:</label></td></tr>                                              \
                            		        <tr><td><input class="input-field" id="id_email" name="email" type="text" /></td></tr>              \
                                            <tr><td><label for="id_password">Password:</label></td></tr>                                        \
                                            <tr><td><input class="input-field" id="id_password" name="password" type="password" /></td></tr>    \
                          		        </table>                                                                                                \
                          		        <div class="lbox-submit" id="login-submit"> Login </div>                                               \
                          		</form>                                                                                                         \
                          		</div>                                                                                                          \                                                                                                                 \
                          		</div>';
                  
                  
                                 $(indiv).lightbox_me({closeSelector:'#lbox_close',centered: true, 
                                        overlayCSS:{background: 'black', opacity: .5},  onLoad: function() {
                                          $("#id_email").focus();
                                    }, onClose: function(){$('.lbox-container').remove();} });
                                    e.preventDefault();
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
                 alert(data)
         	      if(data=="success")
         	      {
         	          // return to state
         	          signed_in='true';
         	          renderHeader(signed_in);
         	          
         	          $('.lbox-container').trigger('close');
         	          //Reload
         	          
         	      }
         	      else
         	      {
         	            var error_string='';
         	            
         	            for (var key in data) 
         	            {
                            if (data.hasOwnProperty(key)) 
                            {
               	             error_string=error_string+'<p class="error-msg">'+data[key]+'</p>';
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


