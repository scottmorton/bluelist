
$(document).ready(function() {

	 $("*").on('click',function(e) {
	
      if($(e.target).closest('#account_li').length)
       {
           
           $('ul',"#account_li").show();
       }
       else
       {
           $('ul',"#account_li").hide();
       }

    });
});


function renderHeader(signed_in,registered)
{
    
    if(String(signed_in)!="false")
    {
       $('#signin_li').hide();
       $('#signup_li').hide();
       $('#account_li').show();
       
       if(String(registered)=="true")
       {
           $( "#prof_btn" ).html( "Edit Profile" );
           
       }
       else
       {
           $( "#prof_btn" ).html( "Create Profile" );
           $( "#subs_btn" ).hide();
       }
       
    }
    else
    {
        $('#account_li').hide();
        $('#signin_li').show();
        $('#signup_li').show(); 
    }
    
    
}

