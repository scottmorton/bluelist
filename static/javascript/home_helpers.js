function contactResponse(pnum){
    //make ajax  query for contact information
    
    
    $.get("/contactrequest",{'selprof': String(pnum)}, function(data,status){
    var status=data.status;
    var number=data.number;
    var email=data.email;
    var name=data.name;

     
	   if(status=="success")
	   {
           var contact_string="";
           var contact_html="";

           if(email=="" && number=="")
           {
               contact_string='<p> We\'re sorry but '+name+' has not provided any public contact information';
           }
           else 
           {
               contact_string='<h4> Contact info provided by '+name+' </h4> \
                                <table class="lbox-table" id="contact_info">';
           
                if(email!="")
                {
                    contact_string=contact_string+'<tr><td><p class="contact-label"><b>Email:</b></p></td>\
                                            <td> <p class="contact-text"> '+email+'</p></td></tr>';
                    }
            
                if(number!="")
                {
                    contact_string=contact_string+'<tr><td><p class="contact-label"><b>Phone number:</b> </p></td>\
                                            <td> <p class="contact-text">'+number+'</p></td></tr>';
                }                           
             
                contact_string=contact_string+'</table>';

                }

       
                contact_html='<div class="lbox-container">                                                           \
                   <img class="lbox-close lbox_close" src="/static/close.png" alt="close">                 \
                   <div class="lbox-info">                                                                      \
                    '+contact_string+'                                                                          \
                   </div>                                                                                       \
             	   </div>';
       

	   }
	   
	   else
	   {
	        
	        contact_html='<div class="lbox-container">                                                                          \
                           <img class="lbox-close lbox_close" id="lbox_close" src="/static/close.png" alt="close">                        \
                           <div class="lbox-info">                                                                                  \
                                <p class="lbox-text"> Please Login or Sign Up to view contact information</p> \
                                <div class="button-div">\
                                <a class= "button_tag lbox_close" id="signin">Login</a>\
                                <a class= "button_tag lbox_close" id="signup">Sign Up</a>\
                                </div>\
                           </div>                                                                                                   \
                     	   </div>';
           }
           
           
           $(contact_html).lightbox_me({closeSelector:'.lbox_close',centered: true, 
                   overlayCSS:{background: 'black', opacity: .5},  onLoad: function() {
               }, onClose: function(){$('.lbox-container').remove();} });
               e.preventDefault();
    
        });
}
