function submitContact(){
	var response = grecaptcha.getResponse(widgetId2);
	
	var name = $("input#contname").val();
	var email = $("input#contemail").val();
	var tel = $("input#contphone").val();
	var msg = $("textarea#contmessage").val();
	var emailRegExp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	var telRegExp = /^[0-9 ]+$/; 
	
	if(name === "" && email === "" && tel === "" && msg === ""){
		$("#contresult").html("Please fill in all * fields.").css('padding-bottom','20px');
	}else if(name === ""){
		$("#contresult").html("Please fill in your Name.").css('padding-bottom','20px');
	}else if(name.length <= 3){
		$("#contresult").html("Name must be longer than 3 characters.").css('padding-bottom','20px');
	}else if(email === ""){
		$("#contresult").html("Please fill in your Email.").css('padding-bottom','20px');
	}else if(!emailRegExp.test(email)){
		$("#contresult").html("Please enter a valid Email.").css('padding-bottom','20px');
	}else if(tel === ""){
		$("#contresult").html("Please fill in your Contact Number.").css('padding-bottom','20px');
	}else if(!telRegExp.test(tel)){
		$("#contresult").html("Please enter a valid Contact Number.").css('padding-bottom','20px');
	}else if(tel.length <= 5){
		$("#contresult").html("Contact Number must be more than 5 Numbers.").css('padding-bottom','20px');
	}else if(msg === ""){
		$("#contresult").html("Please fill in your Message.").css('padding-bottom','20px');
	}else if(response.length === 0) {
		$("#contresult").html("Please use the Captcha to prove you are human.");
		$("#captchaResponse").html("Please prove you are human");
	}else{
		
		
	var params = jQuery.param({
		name: name,
		email: email,
		tel : tel,
		message : msg
	});
	var result = encodeURIComponent(params);
	setTimeout(function(){ 
	$.ajax({
			url: "https://www.cvcapt.com/EmailQueryString.aspx?request_type=e141i12l4nd&message=" + result,
		   	type: 'POST',
		   	data: result, 
		   	success: function(){
			  //alert(result);
			  	$("#contresult").css('display','none');
				$("#captchaResponse").css('display','none');
			  	$('#contsuccess').html("Thank you " + name + ". Your message has been sent.").css('padding','20px');
		   }
		});
			var form = document.getElementById("contactForm");
			form.reset();
			return false;	
			}, 100); //setTimeout End
		}
		
}