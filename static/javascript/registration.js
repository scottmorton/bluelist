$(document).ready(function() {
 
    renderHeader(signed_in,registered);
 
    $( ".payment_field" ).focus(function() {

          $(this).val("");
          $(this).css("color","black");
          $(this).css("font-style","normal");

    });
 
 
    // Watch for a form submission:
    $("#payment-form").submit(function(event) {
    
        $('#submitButton').attr('disabled', 'disabled');
       
        var error = false;
        // Clear error div
        $('#payment-errors').hide();
        $('#payment_error_messages').html("");
        // Get the values:
        var  name =$('#name').val(),
            ccNum = $('#cardNumber').val(),
            cvcNum = $('#cvc').val(),
            expMonth = $('#expMonth').val(),
            expYear = $('#expYear').val();

        
        if (name=="") {     
                error = true;
                reportError('Please include the cardholders name as it appears on the card');            
            }
            
        // Validate the number:
        if (!Stripe.validateCardNumber(ccNum)) {     
            error = true;
            reportError('The credit card number appears to be invalid.');            
        }

        // Validate the CVC:
        if (!Stripe.validateCVC(cvcNum)) {
            error = true;
            reportError('The CVC number appears to be invalid.');
        }

        // Validate the expiration:
        if (!Stripe.validateExpiry(expMonth, expYear)) {
            error = true;
            reportError('The expiration date appears to be invalid.');
        }
        if (!$('#terms').is(':checked')) {
            error = true;
            reportError('Please mark the checkbox if you have read and agree to the Terms and Conditions');
        }
        
        
        if (!error) {
            // Get the Stripe token:
            Stripe.createToken({
                name:name,
                number: ccNum,
                cvc: cvcNum,
                exp_month: expMonth,
                exp_year: expYear
            }, stripeResponseHandler);
         }
 
    // stop form from submitting to server
    return false;
 
    }); // form submission
 
}); // document ready.


function stripeResponseHandler(status, response) {
    
    if (response.error) {
        reportError(response.error.message);
    } else { // No errors, submit the form.
        
        // Get a reference to the form:
        var f = $("#payment-form");
        // Get the token from the response:
        var token = response.id;
        
        // Add the token to the form:
        f.append('<input type="hidden" name="stripeToken" value="' + token + '" />');
        
        // Submit the form through ajax in order for server to not see card information but let it persist in browser:
        
        $.post("/registration",f.serialize(), function(data,status){
        
            //show error
            if(data.status=="error")
            {
                reportError(data.message)
            }
            else if(data.status=="success")
            {
                window.location.replace("/userform");
            }
        
            });
        
    }
}


function reportError(msg) {
    $('#payment-errors').show();
    
    // Show the error in the form:
    $('#payment_error_messages').append( "<p class='error_message'>"+msg+"</p>" );
    
    // Re-enable the submit button:
    $('#submitButton').prop('disabled', false);
 
    return false;
 
}









