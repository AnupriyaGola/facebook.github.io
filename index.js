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
		 url:'https://graph.facebook.com/me?fields=id,name,hometown,quotes,picture.type(large),cover,email,birthday,posts&access_token=' +myfbtoken,
	     success:(response) =>{
			 console.log(response);
			 $('#data').css('display','block');
			 $('#userName').append(response.name);
			 $('#email').append(response.email);
			 $('#birthday').append(response.birthday);
			 $('#hometown').append(response.hometown.name);
			 $('#favquote').append(response.quotes);
			 $('#profilePhoto').html('<img src="'+response.picture.data.url + '" class="img-fluid profileHeight"/>')
			 $('#cover').css('background-image','url(' + response.cover.source +')');
			
		 },
		 
		  timeout: 3000,
		  
		  
		 error:(err) =>{
			 $("#data").hide();
			 console.log(err.responseJSON.error.message);
			 alert("Please provide valid Token")
			 
		 }
		 
		
	 
	 });
 
 }