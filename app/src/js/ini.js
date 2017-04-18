;(function( $ ) {

    "use strict";

	$(document).ready( function(){
		//alert('teste');
		// let txt = "textando babel2";
		// $('#menu-mobile').click( function(){
				
		// 	$('nav').style.left = "0px";
		// });
		// $('.close-mobile').click( function(){
		// 	$('nav').fadeOut();
		// });

		$("#write-input").on('input', function(){
			var input = $(this).val();
			if(input != ""){
				$("#write-send").addClass('active');
			}else{
				$("#write-send").removeClass('active');
			}
		});

		var talk = {"bootConversation":[
						{ "id": 1, "dep": false, "dialog":"Valeu por aceitar a conversa. Será bem rapidinho... Vamos lá?" },
						{ "id": 1, "dep": false, "dialog":"Meu Nome é Jéff, e o seu?" },
						{ "id": 2, "dep": true, "condition": "notEmpty", "dialog":"Muito prazer, $1" },
						{ "id": 2, "dep": false, "dialog":"E aí, vc tem carro?" },
						{ "id": 3, "dep": true, "condition":"yes" ,"dialog":"Fale mais sobre ele! Qual o modelo?" },

					]};

		var robot = (txt) => `
			<div class="robot">
				<div class="avatar">
					<img src="http://lorempixel.com/60/60/people/?1" alt="" class="icon img-circle img-responsive">
				</div>
				<div class="msg">
					<p>${txt}</p>
				</div>
			</div>`;

		var status = $('.status');
		var conversationBox = $('.conversation');

		function displayDialog(v,i){
			let timer = (parseInt(i)+1)*3000;
			status.show();
			setTimeout(function(){
				conversationBox.append(robot(v.dialog));			
				conversationBox.animate({
					scrollTop: conversationBox.get(0).scrollHeight
					},1000);
			},timer);
		}

		function displayInput(v,i){
			//console.log(v+"-"+i)
			setTimeout(function(){
				console.log("inout");
			},i*3000);
			//console.log(i);
			//bootTalk(i);
		}

		function bootTalk($index = 0){
			//console.log($id);
								
			// let conversation = talk.bootConversation.forEach((v, i) => 	{

			// 		if(v.dep){
			// 			console.log(v.dep);
			// 			displayInput(v,i);
			// 			return false;
			// 		}else{
			// 			displayDialog(v,i);
			// 			//return true;
			// 		}
			// 	}
			// );
			// 
			
			for (var i in talk.bootConversation){
				console.log(i+">="+$index);
				if(i >= $index){
					//console.log(talk.bootConversation[i]);
					//console.log(i);
					var v = talk.bootConversation[i];
					if(v.dep){
						displayInput(v,i);
						break;
					}else{
						displayDialog(v,i);
					}
				}
			}
			setTimeout(function(){
				status.hide();				
			},i*3000);

		}

		bootTalk();


	}); 
})(jQuery);