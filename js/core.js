$(document).ready(function(){
	var host = 'creativejose.com';
	/*event listeners*/
	$('.login').click(login);
	$('.next-button').click(saveSession);
	$('.register-button').click(register);
	$('.send-message-button').click(sendMessage);
	$('.report-button').click(sendReport);
	/*Event Handler Helpers*/
	$('.login').click(function(){
		$('.modal-bg').fadeIn(300);
		$('.modal-container').fadeIn(300);
	});

	$('.okay').click(function(){

		$('.modal-bg').fadeOut(300);
		$('.modal-container').fadeOut(300);
		$('.username').focus();
	});

	$('.logout-button').click(logoutUser);


	/*Function Helpers*/
	//eto ung sa signup
	function showModal(errorString){
		$('.modal-bg').fadeIn(300);
		$('.modal-container').fadeIn(300);
		return $('.error').text(errorString);
	}

	function login(){
		var username = $(".username").val();
		var password = $(".password").val();
		if(username == '' || password == ''){
			showModal("Please Complete your Login Credentials");
		}else{
			//dito na mag lo-login
			showModal("Logging in.. Please wait");
			$.ajax({
				url : 'http://' + host + '/public/login',
				dataType: 'jsonp',
				crossOrigin:true,
				data: {'username':username,'password':password},	
				type: 'GET',
				success: function(response){
					window.location.href = "messages.html";
					showModal(response.message);
				},	
				error: function(jqXHR, textStatus, errorThrown){
					showModal("Error Connecting to Server");
				}
			});	
		}
	}

	function saveSession(event){
		var first_name = $('#first-name').val();
		var last_name = $('#last-name').val();
		var address = $('#address').val();
		var contact_number = $('#contact-number').val();
		var day = $(".day").val();
		var month = $(".month").val();
		var year = $(".year").val();
		var civil_status = $(".civil-status").val();
		var birthdate = (year + "-" + month + "-" + day);
		var gender = $(".gender").val();
		if(first_name == '' || last_name == '' || address == '' || day == '' || month == '' || year == '' || civil_status == ''){
			showModal("Please complete all fields");
		}else{
			showModal("Connecting to Server..");
			$.ajax({
				url : 'http://' + host + '/public/savesession',
				dataType: 'jsonp',
				crossOrigin:true,
				data: {'first_name':first_name, 'last_name': last_name, 'address': address, 'contact_number' : contact_number, 'date' : birthdate, 'gender' : gender, 'civil_status' : civil_status},	
				type: 'GET',
				success: function(response){
					window.location.href = "register-two.html";
				},
				error: function(e){
					showModal('Error Connecting to server');
					return false;
				}
			});	
		}
	}
	function register(){
		var username = $(".username").val();
		var password = $(".password").val();
		var confirmPassword = $(".confirm_password").val();
		var email =$(".email").val();
		if(password != confirmPassword){
			showModal("Passwords do not match");
		}else{
			if(username == '' || password == '' || email == '' || confirmPassword == ''){
				showModal("Please complete all fields");
			}else{	
				showModal("Connecting to Server..");
				$.ajax({
					url : 'http://' + host + '/public/register',
					dataType: 'jsonp',
					crossOrigin:true,
					data: {'username' : username, 'password' : password, 'email' : email},	
					type: 'GET',
					success: function(response){
						window.location.href = "login.html";
					},
					error: function(e){
						showModal('Error Connecting to server');
						return false;
					}
				});	
			}
		}
	}
	// parse a date in yyyy-mm-dd format
	function parseDate(input) {
	  var parts = input.split('-');
	  // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
	  return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
	}
	function logoutUser(){
		showModal("Logging out..");
		$.ajax({
				url : 'http://' + host + '/public/user/logout',
				dataType: 'jsonp',
				crossOrigin:true,
				type: 'GET',
				success: function(response){
					window.location.href = "index.html";
				},
				error: function(e){
					showModal('Error Connecting to server');
					return false;
				}
			});	
	}

	function sendReport(){
		var subject = $(".subject").val();
		var perpetrator = $(".perpetrator").val();
		var day = $(".day").val();
		var month = $(".month").val();
		var year = $(".year").val();
		var date_commited = (year + "-" + month + "-" + day);
		var details = $(".details").val();
		if(subject == '' || details == ''){
			showModal("Subject and Details are Required");
		}else{
			showModal("Connecting to Server");
			$.ajax({
				url : 'http://' + host + '/public/reports/add',
				dataType: 'jsonp',
				crossOrigin: true,
				data:{"subject":subject,"perpetrator":perpetrator,"date_commited":date_commited, "message":details},
				type: 'GET',
				success: function(response){
					showModal(response.message);
					$(".subject").val("");
					$(".perpetrator").val("");
					$(".details").val("");
				},
				error: function(e){
					showModal('Error Connecting to server');
					return false;
				}
			});
		}
	}
	function sendMessage(){
		var subject = $(".subject").val();
		var recipient = $(".recipient").val();
		var message = $(".message").val();
		if(subject == '' || recipient == '' || message == ''){
			showModal("Please Complete all fields");
		}else{
			showModal("Connecting to Server");
			$.ajax({
				url : 'http://' + host + '/public/messages/current/sendmessage',
				dataType: 'jsonp',
				crossOrigin:true,
				data:{"subject":subject,"recipient":recipient,"message":message},
				type: 'GET',
				success: function(response){
					if(response.message == 1){
						showModal("Message Sent");
						$(".subject").val("");
						$(".recipient").val("");
						$(".message").text("");
					}else{
						showModal("User Not Found");
					}
				},
				error: function(e){
					showModal("User Not Found");
					return false;
				}
			});
		}
	}
});