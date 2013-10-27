function authEmailField(email)
{ 
    var re =/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(email=="")
    {
        return "Please enter an Email address";
    }
    else
    {
        if(re.test(email))
        {
            return "";
        }
        else
        {
            return "Please enter a valid Email address";
        } 
    }
}

function authPasswordField(password)
{
    
    if(password=="")
    {
        return "Please enter a password"
    }
    else
    {
        return "";
    }
 
}




function signin()
{
    var indiv=' <img class="lbox-close" id="lbox_close" src="/static/close.png" alt="close">         \
                <div class="lbox-info">                                                                                     \
                <h3 class="lbox-heading">Bluelist Login</h3>                                                             \
                <div id="error-msgs"> \
                </div>                                                                                                      \
                <form action="" method="post">                                                                              \
      		        <table class="lbox-table">                                                                              \
      		            <tr><td><label for="id_email">Email Address</label></td></tr>                                              \
        		        <tr><td><input class="input-field" id="id_email" name="email" type="text" /></td></tr>              \
                        <tr><td><label for="id_password">Password</label></td></tr>                                        \
                        <tr><td><input class="input-field" id="id_password" name="password" type="password" /></td></tr>    \
      		        </table>                                                                                                \
      		        <div class="submit-button-div">\
      		        <a class="lbox-submit"  id="login-submit"> Login </a>                                               \
      		        </div> \
      		</form>                                                                                                         \
      		</div>';
      		

            lbox_string='<div class="lbox-container">'+indiv+'</div>';

                 $(lbox_string).lightbox_me({ closeSelector:'#lbox_close', centered: true, 
                      overlayCSS:{background: 'black', opacity: .5},  onLoad: function() {
                          $("#id_email").focus();
                          },onClose: function(){$('.lbox-container').remove();}});
                  e.preventDefault();
}


function signup()
{
        var indiv= '<img class="lbox-close" id="lbox_close" src="/static/close.png" alt="close">              \
                   <div class="lbox-info">                                                                                           \
                   <h3 class="lbox-heading"> Bluelist Sign Up</h3> \
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
         		        </table>\
         		        <div class="submit-button-div">                                                                              \
         		            <a class="lbox-submit" id="signup-submit"> Submit </a>                                               \
         		        </div>                                                                                          \
         		</form>                                                                                                                 \
         		</div>';
         		
         	  lbox_string='<div class="lbox-container">'+indiv+'</div>';
         	
              $(lbox_string).lightbox_me({ closeSelector:'#lbox_close', centered: true, 
                   overlayCSS:{background: 'black', opacity: .5},  onLoad: function() {
                       $("#id_email").focus();
                       }, onClose: function(){$('.lbox-container').remove();}
                       });
              e.preventDefault();
           
}


function signup_success_menu()
{
    var indiv='<div class="lbox-container">                                                                          \
                   <img class="lbox-close lbox_close" id="lbox_close" src="/static/close.png" alt="close">                        \
                   <div class="lbox-info">                                                                                  \
                        <p class="lbox-text"> What would you like to do?</p> \
                        <div class="button-div">\
                            <a class= "button_tag" href="/registration">Create a Profile</a>\
                            <a class= "button_tag lbox_close" >Continue Browsing</a>\
                        </div>\
                   </div>                                                                                                   \
             	   </div>';

   
   $(indiv).lightbox_me({closeSelector:'.lbox_close',centered: true, 
           overlayCSS:{background: 'black', opacity: .5},  onLoad: function() {
       }, onClose: function(){$('.lbox-container').remove();} });
       e.preventDefault();

}

