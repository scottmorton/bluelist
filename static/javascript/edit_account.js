$(document).ready(function() {
 
 
    renderHeader(signed_in,registered);



      $(document).on('click','#cancel_subscription', function() {
          //unhide

          $("#update_subscription").hide();
          $("#cancel_subscription").hide();
          
          $("#cancel_confirm").show();
          $("#cancel_message").show();
          

      });
      
      $(document).on('click','#cancel_confirm', function() {


            $.post("/cancelsubscription", function(data,status){

                
                //show error
                if(data.status=="error")
                {
                    
                }
                else if(data.status=="success")
                {
                    registered=data.registered;
                }

               
                renderHeader(signed_in,registered)
                $('#content_container').html('<p class="text">'+data.message+'</p>');
             });
        });
      
      
      
      


});