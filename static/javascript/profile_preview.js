

$(document).ready(function() {
    renderHeader(signed_in, registered);
    
    $('.full-profile').find('.exp_section').show();
    $('.full-profile').find('#more').hide();
    $('.full-profile').find('#contact').hide();
    $(".profile-index").removeClass( "profile-min");
     $(".min-profile").find('.profile-index').css('border-bottom','solid 1px rgba(0, 0, 0, 0.3)');
});