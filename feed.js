let myfbtoken;
$(document).ready(() => {
  myfbtoken = prompt("Please enter your Facebook Token:", "");
  if(myfbtoken == null || myfbtoken == ""){
	  alert("No user Token found");
  }  
  else{
	  getAllDetails();
  }
});

 let getAllDetails =() =>{
	 $.ajax({
		 type: 'GET',
		 dataType: 'json',
		 async: true,
		 url:'https://graph.facebook.com/me?fields=id,name,hometown,quotes,picture.type(large),cover,email,birthday,posts{created_time,type,full_picture,story,message,source}&access_token=' +myfbtoken,
	     success:(response) =>{
			 console.log(response);
			console.log(typeof(response));
			 $.each(response.posts.data, function(i,post){
			if(post.type==="status" && post.message){

              $("#posts").append('<div class="posts-content"><br><div class="row post-time"><p class="text-muted">Created time: '+post.created_time+'</p></div><br><div class="row post-story"><p class="text-primary"> ID:'+post.id+'</p></div><br><div class="row" class="post-message">'+post.message+'</div></div><br>');
            }
			else if(post.type==="photo" && post.message){
              $("#posts").append('<div class="posts-content"><br><div class="row post-time"><p class="text-muted">Created time: '+post.created_time+'</p></div><br><div class="row post-story"><p class="text-primary"> ID:'+post.id+'</p></div><br><div class="row" class="post-message">'+post.message+'</div><br><div class="row"><img src='+post.full_picture+' style="width:50%; height: 50%;"></div><br></div><br>')
            }

            else if(post.type==="photo" && !post.message){
              $("#posts").append('<div class="posts-content"><br><div class="row post-time"><p class="text-muted">Created time: '+post.created_time+'</p></div><br><div class="row post-story">Story: '+post.story+'</div><br><div class="row post-story"><p class="text-primary"> ID:'+post.id+'</p></div><br><div class="row"><img src='+post.full_picture+' style="width:50%; height: 50%; align="center""></div><br></div><br>')
            }

            else if(post.type==="video" && post.message){
              $("#posts").append('<div class="posts-content"><br><div class="row post-time"><p class="text-muted">Created time: '+post.created_time+'</p></div><br><div class="row" class="posts-message">'+post.message+'</div><br><div class="row post-story"><p class="text-primary"> ID:'+post.id+'</p></div><div class="row"><a href='+post.source+'>'+post.source+'</a></div></div><br>')
			
			}
			
			else if(post.type==="video" && !post.message){
              $("#posts").append('<div class="posts-content"><br><div class="row post-time"><p class="text-muted">Created time: '+post.created_time+'</p></div><br><div class="row post-story"><p class="text-primary"> ID:'+post.id+'</p></div><div class="row"><a href='+post.source+'>'+post.source+'</a></div></div><br>')
			
			}
			 });	
			 $(".feed-post-heading").text(response.name);
        },

		
		 error:(err) =>{
			 console.log(err.responseJSON.error.message);
		 }
	 
	 });
	 
 }