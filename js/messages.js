$(document).ready(function(){
	var host = "creativejose.com";
	$(".page").empty();
	paginate();
	loadMessages(1);

	$(".page").change(function(){
		$('.messaging-wrapper').empty();
		if($(".category").val() == 1){
			loadMessages($(".page").val());
		}else{
			loadSentMessages($(".page").val());
		}
	})
	$(".category").change(function(){
		$('.messaging-wrapper').empty();
		if($(".category").val() == 1){
			$(".page").empty();
			paginate();
			loadMessages(1);

		}else{
			$(".page").empty();
			$.ajax({
				url : 'http://' + host + '/public/messages/count/sent',
				dataType: 'jsonp',
				crossOrigin:true,
				type: 'GET',
				success: function(response){
					var count = response.message;
					var count = Math.ceil(count / 5);
					for(var index = 1; index <= count; ++index){
						$('.page').append("<option value = " + index + ">" + index + "</option>");
					}
				},	
				error: function(e){
					showModal('Error Connecting to server..');
				}
			});
			loadSentMessages(1);
		}
	});
	$('.messaging-wrapper').empty();
	function showModal(errorString){
		$('.modal-bg').fadeIn(300);
		$('.modal-container').fadeIn(300);
		return $('.error').text(errorString);
	}

	$('.okay').click(function(){

		$('.modal-bg').fadeOut(300);
		$('.modal-container').fadeOut(300);
		$('.username').focus();
	});

	function paginate(){
		$.ajax({
			url : 'http://' + host + '/public/messages/count/current',
			dataType: 'jsonp',
			crossOrigin: true,
			type: 'GET',
			success: function(response){
				var count = response.message;
				var count = Math.ceil(count / 5);
				for(var index = 1; index <= count; ++index){
					$('.page').append("<option value = " + index + ">" + index + "</option>");
				}
			},	
			error: function(e){
				showModal('Error Connecting to server..');
			}
		});
	}
	function loadMessages(page_number){
		$.getJSON('http://' + host + '/public/messages/' + page_number + "?callback=?",function(data){
			$.each(data,function(key,val){
				$(".messaging-wrapper").append('<div class="message-wrapper"><a href="#" class="message"> <p class="username">From: ' + val.username + '</p> <p class="subject">Subject: <br>' + val.subject + '</p> <p class="date">' + val.created_at + '</p> <p class = "username">Message: <br> ' + val.message + '</p></a> </div>');
			});
		});
	}
	function loadSentMessages(page_number){
		$.getJSON('http://' + host + '/public/messages/sent/' + page_number + "?callback=?",function(data){
			$.each(data,function(key,val){
				$(".messaging-wrapper").append('<div class="message-wrapper"><a href="#" class="message"> <p class="username">To: ' + val.username + '</p> <p class="subject"> Subject: <br>' + val.subject + '</p> <p class="date">' + val.created_at + '</p> <p class = "username">Message: <br> ' + val.message + '</p></a> </div>');
			});
		});
	}
	
});