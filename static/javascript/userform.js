$(document).ready(function(){
  
    
    
    //Header

  renderHeader(signed_in);
  
  $('#nav li').hover(
  function () {
      //show submenu
      $('ul', this).slideDown("fast");
  }, function () {
      //hide submenu
      $('ul', this).slideUp("fast");
  });
  
  
  $('#edit li').hover(
  function () {
      //show submenu
      $('ul', this).slideDown("fast");
  }, function () {
      //hide submenu
      $('ul', this).slideUp("fast");
  });
  
  

  $(document).on('click','#prof_pic_replace', function() {
      //unhide
      
      $("#id_prof_pic").show();
      $("#id_prof_pic").trigger('click');
      $("#id_prof_pic").hide();

  });
  
  
  $(document).on('click','#prof_pic_delete', function() {
      var name = this.name;
      
      
      var data = new FormData();
      data.append('name',name)
      var xhr = new XMLHttpRequest();
      alert(name)
      xhr.onload = function(){
                  
		        var jsonResponse = JSON.parse(xhr.responseText);
                
                alert(jsonResponse.status)
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

  	    //Disable submit button so that form is not submitted during upload
  	    $('#submitButton').attr('disabled', 'disabled');
  	    
		var data = new FormData();
		var sel_file=$(this).get(0).files[0];
		var name = this.name;
		var input_id=this.id;
    	
    	//give the name of the file for the server to know what type of upload it is
    	data.append('name',name)
		data.append(name,sel_file);
		
		//create the id for the progress bar and add a progress bar under the input filed
		var prog_id=this.id.concat('_progress');
	    $(this).after( '<progress value="0" max="0" id="'+prog_id+'"></progress>' );
		 
		var xhr = new XMLHttpRequest();
		
		xhr.upload.onprogress = function(e) {
	            
	            console.log('xhr progress: ' + (Math.floor(e.loaded/e.total*1000)/10) + '%');
			   $('#'+prog_id).attr('value', e.loaded);
		       $('#'+prog_id).attr('max', e.total);
	        };
	        
		xhr.onload = function(){
		    
		            console.log('upload complete');
		            
		            $('#'+prog_id).remove();
		            //show picture
		            document.write(xhr.responseText);
		            
		            var jsonResponse = JSON.parse(xhr.responseText);
		           
		            $('#submitButton').prop('disabled', false);
		            
		            //set up conditionls for each failure possibility
		            //confirm file successfully uploaded
                    alert(jsonResponse.status)
                    if(input_id=="id_prof_pic" && jsonResponse.status=="ok")
                    {
                        $('#img_prof_pic').attr("src", String(jsonResponse.file_url));
                        
                        $('#prof_im_container2').hide();
                        $('#prof_im_container1').show();                              
                        
                        
                    }
                    
                    
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
        
        if( document.getElementById("id_file"+String(i)).value=="" && 
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
  
  
  
  
  
    if( document.getElementById("id_public_email").value=="" && 
        document.getElementById("id_public_phone_num").value=="")
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