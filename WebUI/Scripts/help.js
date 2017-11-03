$(document).ready(function(){
	$("#name-input").on("input", function(){
		verifyName();
		return false;
	});
	
	$("#name-input").blur(function(){
		verifyName();
		return false;
	});
	
	$("#email-input").on("input", function(){
		verifyEmail();
		return false;
	});
	
	$("#email-input").blur(function(){
		verifyEmail();
		return false;
	});
	
	$("#phone-input").on("input", function(){
		verifyPhone();
		return false;
	});
	
	$("#phone-input").blur(function(){
		verifyPhone();
		return false;
	});
	
	$("#subject-input").change(function(){
		verifySubject();
		return false;
	});
	
	$("#subject-input").blur(function(){
		verifySubject();
		return false;
	});
	
	$("#message-input").on("input", function(){
		verifyMessage();
		return false;
	});
	
	$("#message-input").blur(function(){
		verifyMessage();
		return false;
	});
	
	$("#submit-button").click(function(){
		var alertMessage = [];
		
		// Verify fields
		if (!verifyName())
			alertMessage[alertMessage.length] = "Please enter your first and last name.";
		if (!verifyEmail())
			alertMessage[alertMessage.length] = "Please enter a valid email address: example@email.com";
		if (!verifyPhone())
			alertMessage[alertMessage.length] = "Please enter a valid phone number: 555-867-5309 or 5558675309";
		if (!verifySubject())
			alertMessage[alertMessage.length] = "Please select a subject.";
		if (!verifyMessage())
			alertMessage[alertMessage.length] = "Please enter a message.";
		
		if (alertMessage.length > 0) {
			alert(alertMessage.join("\n"));
		}
		else{
			var name = $("#name-input").val();
			var email = $("#email-input").val();
			var phone = $("#phone-input").val();
			var subject = $("#subject-input").val();
			var message = $("#message-input").val();
		
			alert("Valid!!");
			// Send email or something
			
			resetForm();
			$("#help-form").hide();
		}
		return false;
	});
	
	$("#reset-button").click(function(){
		resetForm();
		return false;
	});
});

function verifyName(){
	// First and last name, Each name length >= 1, Total length <= 50
	var name = $("#name-input").val();
	var nameSplit = name.split(" ");
	if (name.length <= 50 && nameSplit.length === 2 && nameSplit[0].length > 0 && nameSplit[1].length > 0){
		$("#name-input").css("color","green");
		$("#name-label").css("color","green");
		return true;
	}
	else{
		$("#name-input").css("color","red");
		$("#name-label").css("color","red");
		return false;
	}
}

function verifyEmail(){
	// Email should be in the format a@a.a
	var email = $("#email-input").val();
	var emailSplit = email.split("@");
	var domainSplit = [];
	if (emailSplit.length > 1) domainSplit = emailSplit[1].split(".");
	if (emailSplit.length === 2 && domainSplit.length === 2 && emailSplit[0].length > 0 && domainSplit[0].length > 0 && domainSplit[1].length > 0){
		$("#email-input").css("color","green");
		$("#email-label").css("color","green");
		return true;
	}
	else{
		$("#email-input").css("color","red");
		$("#email-label").css("color","red");
		return false;
	}
}

function verifyPhone(){
	// Phone number should be in the format ########## or ###-###-####
	var phone = $("#phone-input").val();
	var phoneSplit = phone.split("-");
	
	if ((phoneSplit.length === 3 && phoneSplit[0].length === 3 && phoneSplit[1].length === 3 && phoneSplit[2].length === 4)
		|| phone.length === 10){
			
		if (phone.length != 10) phone = phoneSplit.join("");
		for (var i = 0; i < phone.length; i++){
			if (phone[i] != "0" && phone[i] != "1" && phone[i] != "2" && phone[i] != "3" && phone[i] != "4" && phone[i] != "5" && phone[i] != "6" && phone[i] != "7" && phone[i] != "8" && phone[i] != "9")
				return false;
		}
		
		$("#phone-input").css("color","green");
		$("#phone-label").css("color","green");
		return true;
	}
	else{
		$("#phone-input").css("color","red");
		$("#phone-label").css("color","red");
		return false;
	}
}

function verifySubject(){
	// Verify some subject is selected
	var subject = $("#subject-input").val();
	if (subject != 0){
		$("#subject-input").css("color","green");
		$("#subject-label").css("color","green");
		return true;
	}
	else{
		$("#subject-input").css("color","red");
		$("#subject-label").css("color","red");
		return false;
	}
}

function verifyMessage(){
	// Verify that there's some message
	var message = $("#message-input").val();
	if (message.length > 0){
		$("#message-label").css("color","green");
		return true;
	}
	else{
		$("#message-label").css("color","red");
		return false;
	}
}

function resetForm(){
	$("#name-input").css("color","black");
	$("#email-input").css("color","black");
	$("#phone-input").css("color","black");
	$("#subject-input").css("color","black");
	$("#message-input").css("color","black");
	
	$("#name-label").css("color","black");
	$("#email-label").css("color","black");
	$("#phone-label").css("color","black");
	$("#subject-label").css("color","black");
	$("#message-label").css("color","black");
	
	$("#name-input").val("");
	$("#email-input").val("");
	$("#phone-input").val("");
	$("#subject-input").val("0");
	$("#message-input").val("");
}

