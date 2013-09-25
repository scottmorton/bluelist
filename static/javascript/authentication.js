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


function renderHeader(signed_in)
{
    
    if(String(signed_in)!="false")
    {
        
        var menu_html= '<a class= "nav-button" id="profile" href="/userform"><p class="navb" action="">Edit Profile</p></a>\
                        <a class= "nav-button" id="logout" href="/signout"><p class="navb">Logout</p></a>\
                        <a class= "nav-button"><p class="navb">About</p></a>';
        
        $(".menu-buttons").html(menu_html)
        
        
    }
    else
    {
        
        var menu_html= '<a class= "nav-button" id="signup"><p class="navb" action="">Signup</p></a>\
                        <a class= "nav-button" id="signin"><p class="navb">Login</p></a>\
                        <a class= "nav-button" href="nothing"><p class="navb">About</p></a>';

         $(".menu-buttons").html(menu_html)
        
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
      		            <tr><td><label for="id_email">Email:</label></td></tr>                                              \
        		        <tr><td><input class="input-field" id="id_email" name="email" type="text" /></td></tr>              \
                        <tr><td><label for="id_password">Password:</label></td></tr>                                        \
                        <tr><td><input class="input-field" id="id_password" name="password" type="password" /></td></tr>    \
      		        </table>                                                                                                \
      		        <div class="lbox-submit" id="login-submit"> Login </div>                                               \
      		</form>                                                                                                         \
      		</div>';
      		
            if ($(".lbox-container")[0]){
                  $(".lbox-container").html(indiv);
             }
             else
             {
            	   lbox_string='<div class="lbox-container">'+indiv+'</div>';

                 $(lbox_string).lightbox_me({ closeSelector:'#lbox_close', centered: true, 
                      overlayCSS:{background: 'black', opacity: .5},  onLoad: function() {
                          $("#id_email").focus();
                          },onClose: function(){$('.lbox-container').remove();}});
                  e.preventDefault();
              }
}


function signup()
{
    
        var indiv= '<img class="lbox-close" id="lbox_close" src="/static/close.png" alt="close">              \
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
         		</div>';
         		
         if ($(".lbox-container")[0]){
               $(".lbox-container").html(indiv);
          }
          else
          {
         	   lbox_string='<div class="lbox-container">'+indiv+'</div>';
         	
              $(lbox_string).lightbox_me({ closeSelector:'#lbox_close', centered: true, 
                   overlayCSS:{background: 'black', opacity: .5},  onLoad: function() {
                       $("#id_email").focus();
                       },onClose: function(){$('.lbox-container').remove();}});
               e.preventDefault();
           }
}


