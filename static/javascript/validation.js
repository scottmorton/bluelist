

function validateEmailField(email)
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

function validatePasswordFields(password1, password2)
{
    
    
    if(password1=="" || password2=="")
    {
        return "Please enter a password and confirmation";
    }
    else{
        if(password1==password2)
         {
             return "";
         }
         else
         {
             return "Passwords do not match";
         }
    }
 
}