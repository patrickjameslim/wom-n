$(document).ready(function(){
	$(".day").empty();
	$(".year").empty();
	for(var index = 1; index < 32; ++index){
		$(".day").append('<option value = "' + index + '"' + ">" + index + "</option>");
	}
	for(var index = 1960; index < 2015; ++index){
		$(".year").append('<option value = "' + index + '"' + ">" + index + "</option>");
	}
});