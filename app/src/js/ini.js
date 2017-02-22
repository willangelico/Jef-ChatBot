;(function( $ ) {

    "use strict";

	$(document).ready( function(){

		//alert('teste');
		let txt = "textando babel2";
		$('#menu-mobile').click( function(){
				
			$('nav').style.left = "0px";
		});
		$('.close-mobile').click( function(){
			$('nav').fadeOut();
		});
	}); 
})(jQuery);