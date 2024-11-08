function viewConfig(){
    var args = arguments;
    var caller = viewConfig.caller.name;
    $.ajax({
        type: "POST",
        url: "config/view",
        data: {},
        dataType: "html",
        cache: false,
        success: function(response) {
            changeContent(response, args, caller);
            setMenuPage('config');
        },
        complete: function() {
            triggerPop();

		$( ".toggle" ).each(function() {
	    $(this).on("click", function(){
	    	 if($(this).hasClass('active')){ 
		         $(this).removeClass('active');
		    } else{
		         $(this).toggleClass('active');
		        }
	    });
	});	 
        }

    });
}