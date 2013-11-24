
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
       
       if($(e.target).closest('#state_li').length)
       {
              $('#state_li').find(".subcat").slideDown();
          }
        else
        {
              $('#state_li').find(".subcat").slideUp();
          }
          
        if($(e.target).closest('#city_li').length)
        {
            $('#city_li').find(".subcat").slideDown();
                }
        else
        {
            $('#city_li').find(".subcat").slideUp();
            }

        if($(e.target).closest('#category_li').length)
            {
                $('#category_li').find(".subcat").slideDown();
                    }
            else
            {
                $('#category_li').find(".subcat").slideUp();
                }
        if($(e.target).closest('#skill_li').length)
            {
                $('#skill_li').find(".subcat").slideDown();
                }
            else
            {
                $('#skill_li').find(".subcat").slideUp();
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

