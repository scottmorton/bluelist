$(document).ready(function(){
  
  
    renderHeader(signed_in, registered);

  
    $( "#id_shortdesc" ).bind('input propertychange', function () {
            shortdesc_char_left();
            
        });
  
        $( "#id_longdesc" ).bind('input propertychange', function () {
            longdesc_char_left();
            });
  
    $( ".media-desc" ).bind('input propertychange', function () {
                  media_char_left($(this));
        });
            
    
    
 /*
  $('#edit li').hover(
  function () {
      //show submenu
      $('ul', this).slideDown("fast");
      }, function () {
      //hide submenu
      $('ul', this).slideUp("fast");
  });
  
   */
   
   

  $(document).on('click','#prof_pic_replace', function() {
      //unhide
      
      $("#id_prof_pic").show();
      $("#id_prof_pic").trigger('click');
      $("#id_prof_pic").hide();

  });
  
  
  $(document).on('click','.file-replace', function() {
       var file_num=this.id.slice(7);
       var input_id='id'+file_num;
       
       $('#'+input_id).show();
       $('#'+input_id).trigger('click');
       $('#'+input_id).hide();
   });
  
  
  
  $(document).on('click','.file-delete', function() {
      var name = this.name;
      
      
      var data = new FormData();
      data.append('name',name)
      var xhr = new XMLHttpRequest();
      xhr.onload = function(){
                  
		        var jsonResponse = JSON.parse(xhr.responseText);
                
                //alert(jsonResponse.status)
                //return upload state to 
                  
                  if(name=="prof_pic" && jsonResponse.status=="ok")
                  {
                     
                      $('#img_prof_pic').attr("src", "");
                      $('#prof_im_container1').hide();
                      $('#prof_im_container2').show();
                  }
                   else
                      {
                          var delete_file_slice=name.slice(0,-1);
                          var num=name.slice(-1);
                           if(delete_file_slice=="file" && jsonResponse.status=="ok")
                          {
                                
                              $('#embed_file'+num).attr("data", "");
                              $('#view_file'+num).attr("href", "");
                                
                              $('#file'+num+'_container1').hide();
                              $('#file'+num+'_container2').show();

                          }
                      }
		       };
		       
      	xhr.open('post', '/userDeleteFile', true);
   	    xhr.send(data);
  });
  
  
  
  // Delete file 
  
  $(document).on('click','#prof_pic_delete', function() {
      var name = this.name;
      
      var data = new FormData();
      data.append('name',name)
      var xhr = new XMLHttpRequest();
      xhr.onload = function(){
                  
		        var jsonResponse = JSON.parse(xhr.responseText);
                
                //alert(jsonResponse.status)
                //return upload state to 
                  
                  if(name=="prof_pic" && jsonResponse.status=="ok")
                  {
                     
                      $('#img_prof_pic').attr("src", "");
                      $('#prof_im_container1').hide();
                      $('#prof_im_container2').show();
                  }
                  
		       };
		       
      	xhr.open('post', '/userDeleteFile', true);
   	    xhr.send(data);
  });
  
  
  
  
  // Asynchronous file uploads
  
  	$( "input:file" ).each(function() {
  	    
  	    this.addEventListener('change', function(e) {
        $(this).parent().siblings(".file-error").html("");
  	    //Disable submit button so that form is not submitted during upload
  	    $('#submitButton').attr('disabled', 'disabled');
  	    
		var data = new FormData();
		var sel_file=$(this).get(0).files[0];
		
		var name = this.name;
    	var input_id=this.id;
		var file_size=sel_file.size;
		
		
		if(file_size>parseInt(max_upload_size))
		{
		    $(this).parent().siblings(".file-error").html("File not uploaded: the selected file was greater than the maximum of 20MB");
		    return;
		    
		}
		
	
    	//give the name of the file for the server to know what type of upload it is
    	data.append('name',name)
		data.append(name,sel_file);
		
		//create the id for the progress bar and add a progress bar under the input filed
		var prog_id=this.id.concat('_progress');
		
		$(this).closest(".file_div").after( '<div class="progress_container" ><progress value="0" max="0" id="'+prog_id+'"></progress></div>' );
		$(this).closest(".file_div").hide();
		
		var obj=$(this);
		 
		var xhr = new XMLHttpRequest();
		
		xhr.upload.onprogress = function(e) {
	            
	            console.log('xhr progress: ' + (Math.floor(e.loaded/e.total*1000)/10) + '%');
			   $('#'+prog_id).attr('value', e.loaded);
		       $('#'+prog_id).attr('max', e.total);
	        };
	        
		xhr.onload = function(){
		            
		            $('#'+prog_id).closest(".progress_container").remove();
		            //show picture
		            //document.write(xhr.responseText);
		            
		            var jsonResponse = JSON.parse(xhr.responseText);
                    

		            $('#submitButton').prop('disabled', false);
		            
		            //set up conditionls for each failure possibility
		            //confirm file successfully uploaded
		            
		            
		            if(jsonResponse.status != "ok")
		            {
		               obj.parent().siblings(".file-error").html(jsonResponse.message);
		               obj.closest(".file_div").show();
		               
		            }
		            
                    if(input_id=="id_prof_pic" && jsonResponse.status=="ok")
                    {
                        $('#img_prof_pic').attr("src", String(jsonResponse.file_url));
                        $('#prof_im_container2').hide();
                        $('#prof_im_container1').show();                              
                    }
                    else if(jsonResponse.status=="ok")
                    {
                        var input_file_slice=input_id.slice(0,7);
                        var input_file_num=input_id.slice(-1);
                    
                         if(input_file_slice=="id_file" && jsonResponse.status=="ok")
                        {
                            
                            $('#embed_file'+input_file_num).attr("data", String(jsonResponse.file_url));
                            $('#view_file'+input_file_num).attr("href", String(jsonResponse.file_url));
                            
                            $('#file'+input_file_num+'_container2').hide();
                            $('#file'+input_file_num+'_container1').show();                            
                        }
                    }
                    
                    //more complex
                    
		       };
		
		    xhr.open('post', '/userFileUpload', true);
		    xhr.send(data);
				
		}, false);
		
    });
  
  
  
  
  
  
  
  var last_link=1;
  
    for(var i=1; i < 9; i++)
    {
        
        if( document.getElementById("id_link"+String(i)).value=="" && 
            document.getElementById("id_link"+String(i)+"_desc").value=="" &&
            document.getElementById("id_link"+String(i)+"_title").value=="")
            {
                document.getElementById("link"+String(i)).style.display = "none";
            }
        else
            {
            	last_link=i+1;
            }
    }
    
    if(last_link==1)
    {
        document.getElementById("links_label").style.display = "none";
    }
  
    
	$(document).on('click','#add_link', function() {
    
         document.getElementById("link"+String(last_link)).style.display = "block";
        last_link=last_link+1;
        
        //If all links are shown hide the add link button
        if(last_link>8)
        {
            document.getElementById("add_link").style.display = "none";
        }
        if(last_link==2)
        {
            document.getElementById("links_label").style.display = "block";
        }
    });
  
  
    var last_file=1;
  
    for(var i=1; i < 9; i++)
    {
        if( $("#view_file"+String(i)).attr('href')=="" && 
            document.getElementById("id_file"+String(i)+"_desc").value=="" &&
            document.getElementById("id_file"+String(i)+"_title").value=="")
            {
                document.getElementById("file"+String(i)).style.display = "none";
            }
        else
            {
            	last_file=i+1;
            }
    }
    
    if(last_file==1)
    {
        document.getElementById("uploads_label").style.display = "none";
    }
    
  
  
  
    
	$(document).on('click','#add_file', function() {
    
         document.getElementById("file"+String(last_file)).style.display = "block";
        last_file=last_file+1;
        
        //If all links are shown hide the add link button
        if(last_file>8)
        {
            document.getElementById("add_file").style.display = "none";
        }
        if(last_file==2)
        {
            document.getElementById("uploads_label").style.display = "block";
        }
        
    });
  
  
  
  
  
    //if( document.getElementById("id_public_email").value=="" && 
     //   document.getElementById("id_public_phone_num").value=="")
     if(false)
        {
            document.getElementById("contact").style.display = "none";
        }
    else
        {
            document.getElementById("add_contact").style.display = "none";
        }
        
  
  
    $(document).on('click','#add_contact', function() {

             document.getElementById("contact").style.display = "block";
             document.getElementById("add_contact").style.display = "none";

        });
        



  if( document.getElementById("id_longdesc").value=="")
      {
          document.getElementById("additional_info").style.display = "none";
      }
  else
    {
          document.getElementById("add_info").style.display = "none";
    }


  $(document).on('click','#add_info', function() {

 
           document.getElementById("additional_info").style.display = "block";
           document.getElementById("add_info").style.display = "none";

      });
  
  
  // This block is the dynamic drop down for states and cities
    var value = $("#id_state").val();
    var elid=$("#id_city");
    elid.empty()
    fillDropdown(elid, cities, value)
    
    var value = $("#id_skillcategory").val(); 
    var elid=$("#id_skill");
    elid.empty()
    fillDropdown(elid, skills, value)
  
  
  $("#id_state").change(function() {
      var value = $("#id_state").val();
      var elid=$("#id_city");
      elid.empty()
      fillDropdown(elid, cities, value)
    });
  
  
  $("#id_skillcategory").change(function() {
      var value = $("#id_skillcategory").val(); 
      var elid=$("#id_skill");
      elid.empty()
      fillDropdown(elid, skills, value)
    });
    
    
    
  
});




function fillDropdown(elemId, array, selId) {
 
var listString="";

for(var i=0; i<array.length; i++)
	{
		if (  selId == array[i][2] )
			{	
				listString+="<option value='"+String(array[i][1]) + "' selected='selected'>" + array[i][0] +"</option>";
			}
	};
	$(elemId).html(listString);
};



function longdesc_char_left()
{
    var val= $( "#id_longdesc" ).val();
    var num_left=600-parseInt(val.length);

    var count_string="";
    if(num_left<0)
    {
        count_string=String(600-parseInt(val.length));
        $('#long_desc_num').css('color','red');
    }
    else
    {
        count_string=String(600-parseInt(val.length));
        $('#long_desc_num').css('color','');

    }

    $('#long_desc_num').html(count_string);
}

function shortdesc_char_left()
{     
          var val= $( "#id_shortdesc" ).val();
          var num_left=200-parseInt(val.length);
          
          var count_string="";
          if(num_left<0)
          {
              count_string=String(200-parseInt(val.length));
              $('#short_desc_num').css('color','red');
          }
          else
          {
              count_string=String(200-parseInt(val.length));
              $('#short_desc_num').css('color','');
              
          }
          
          $('#short_desc_num').html(count_string);
}


function media_char_left(obj)
{
    var max_num=200;
      
      var val= obj.val();
      var num_left=max_num-parseInt(val.length);
      var count_string="";
      if(num_left<0)
      {
          count_string=String(max_num-parseInt(val.length));
         obj.siblings().children('.char-count').css('color','red');
      }
      else
      {
          count_string=String(max_num-parseInt(val.length));
          obj.siblings().children('.char-count').css('color','');
      }

     obj.siblings().children('.char-count').html(count_string);
    
}
