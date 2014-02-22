$(document).ready(function(){
	var host = 'localhost/backn';
	
	/*event listeners*/
	$('.login').click(login);
	$('.next').click(saveSession);
	
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

	function saveSession(){
		var first_name = $('#first_name').val();
		var last_name = $('#last_name').val();
		var address = $('#address').val();
		var contact_number = $('#contact_number').val();
		var day = $(".day").val();
		var month = $(".month").val();
		var year = $(".year").val();
		var birthdate = parseDate(year + "-" + month + "-" + day);

		$.ajax({
				url : 'http://' + host + '/public/savesession',
				dataType: 'text',
				data: {'first_name':first_name, 'last_name': last_name, 'address': address, 'contact_number' : contact_number, 'date' : birthdate},	
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
	// parse a date in yyyy-mm-dd format
	function parseDate(input) {
	  var parts = input.split('-');
	  // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
	  return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
	}
});