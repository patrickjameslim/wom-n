$(document).ready(function(){
	var host = 'localhost/backn';	
	/*event listeners*/
	$('.login').click(login);
	$('.next-button').click(saveSession);
	$('.register-button').click(register);
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


	/*Function Helpers*/
	//eto ung sa signup
	function showModal(errorString){
		$('.modal-bg').fadeIn(300);
		$('.modal-container').fadeIn(300);
		return $('.error').text(errorString);
	}

	function sendToServer(url, parameters){
		$.ajax({
			url : 'http://localhost/backn/public/login',
			dataType: 'text',
			type: 'GET',
			success: function(response){
				alert(response);
			},
			error: function(e){
				alert(e);
			}
		});
	}

	function createAccount(){
		$.ajax({
			url : 'http://localhost/backn/public/signup',
			data: {"username":"jm_07", "password":"hahaha", "birthdate":"1994/28/03" , "first_name": "JM", "last_name": "Ramos", "gender": 1, "email": "jmramos@creativejose.com", "civil_status": 1, "role": 1},
			dataType: 'json',
			type: 'GET',
			success: function(response){
				alert(response);
			},
			error: function(e){
				alert(e);
			}
		});
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
				dataType: 'text',
				data: {'username':username,'password':password},	
				type: 'GET',
				success: function(serverResponse){
					var response = jQuery.parseJSON(serverResponse);
					showModal(response.message);
				},	
				error: function(e){
					showModal('Error Connecting to server..');
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
				dataType: 'text',
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
					dataType: 'text',
					data: {'username' : username, 'password' : password, 'email' : email},	
					type: 'GET',
					success: function(serverResponse){
						var response = jQuery.parseJSON(serverResponse);
						showModal(response.message);
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
});