
function renderHeader(signed_in)
{
    if(String(signed_in)!="false")
    {
       $('#signin_li').hide();
       $('#signup_li').hide();
       $('#account_li').show();
    }
    else
    {
        $('#account_li').hide();
        $('#signin_li').show();
        $('#signup_li').show();
        
    }
}

