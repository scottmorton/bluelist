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
    
    if(String(signed_in)=="true")
    {
        
        
        var menu_html= '<a class= "nav-button" id="profile" href="/userform"><p class="navb" action="">  Profile</p></a>\
                        <a class= "nav-button" id="logout" href="/signout"><p class="navb">  Logout</p></a>\
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


