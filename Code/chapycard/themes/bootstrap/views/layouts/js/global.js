(function(){
	var nav = $('.navbar');


	$(window).on('scroll', function(e){
		if ($(window).scrollTop() > 50)
			nav.addClass('sticky');
		else
			nav.removeClass('sticky');
	})
})();