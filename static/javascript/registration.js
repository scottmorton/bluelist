



$(document).ready(function() {
 
    // Watch for a form submission:
    $("#payment-form").submit(function(event) {
    
        $('#submitButton').attr('disabled', 'disabled');
       
       
       
        var error = false;
        // Clear error div
        $('#payment-errors').html("");
        // Get the values:
        var ccNum = $('#cardNumber').val(),
            cvcNum = $('#cvc').val(),
            expMonth = $('#expMonth').val(),
            expYear = $('#expYear').val();

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
        
        
        
        if (!error) {
            // Get the Stripe token:
            Stripe.createToken({
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
        
        
        alert('response')
        
        // Add the token to the form:
        f.append('<input type="hidden" name="stripeToken" value="' + token + '" />');
        
        // Submit the form:
        f.get(0).submit();
        
        
        
        
    }
}


function reportError(msg) {
 
    // Show the error in the form:
    $('#payment-errors').append( "<p>"+msg+"</p>" );
    
    // Re-enable the submit button:
    $('#submitButton').prop('disabled', false);
 
    return false;
 
}









