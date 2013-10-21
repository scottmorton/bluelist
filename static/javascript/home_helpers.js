function contactResponse(pnum){
    
    
	   if(signed_in!="false")
	   {

       
       name= profiles[pnum].fields.name;
       public_email= profiles[pnum].fields.public_email;
       public_phone_num= profiles[pnum].fields.public_phone_num;

       var contact_string="";
       var contact_html="";

       if(public_email=="" && public_phone_num=="")
       {
           contact_string='<p> We\'re sorry but '+name+' has not provided any public contact information';
       }
       else 
       {
           contact_string='<h4> Contact info provided by '+name+' </h4> \
                                <table class="lbox-table" id="contact_info">';
           
           if(public_email!="")
           {
            contact_string=contact_string+'<tr><td><p class="contact-label"><b>Email:</b></p></td>\
                                            <td> <p class="contact-text"> '+public_email+'</p></td></tr>';
            }
            
            if(public_phone_num!="")
            {
            contact_string=contact_string+'<tr><td><p class="contact-label"><b>Phone number:</b> </p></td>\
                                            <td> <p class="contact-text">'+public_phone_num+'</p></td></tr>';
             }                           
             
             contact_string=contact_string+'</table>';

         }

       
       contact_html='<div class="lbox-container">                                                           \
                   <img class="lbox-close" id="lbox_close" src="/static/close.png" alt="close">                 \
                   <div class="lbox-info">                                                                      \
                    '+contact_string+'                                                                          \
                   </div>                                                                                       \
             	   </div>';
       

	   }
	   
	   else
	   {
	        
	        contact_html='<div class="lbox-container">                                                                          \
                           <img class="lbox-close" id="lbox_close" src="/static/close.png" alt="close">                        \
                           <div class="lbox-info">                                                                                  \
                                <p> Please Login or Sign Up to view contact information</p> \
                                <div class="button-div">\
                                <a class= "contact-error-button" id="signin"><p class="navb">Login</p></a>\
                                <a class= "contact-error-button" id="signup"><p class="navb" action="">Sign Up</p></a>\
                                </div>\
                           </div>                                                                                                   \
                     	   </div>';
           }
           
           
           $(contact_html).lightbox_me({closeSelector:'#lbox_close',centered: true, 
                   overlayCSS:{background: 'black', opacity: .5},  onLoad: function() {
               }, onClose: function(){$('.lbox-container').remove();} });
               e.preventDefault();
    
    
}