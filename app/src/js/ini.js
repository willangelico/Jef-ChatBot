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
		$(window).scroll(function() {
			console.log($("header").outerHeight());
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

		var user = (txt) => `
			<div class="user">
				<div class="avatar">
					<img src="http://lorempixel.com/60/60/people/?1" alt="" class="icon img-circle img-responsive">
				</div>
				<div class="msg">
					<p>${txt}</p>
				</div>
			</div>`;

		var status = $('.status');
		var conversationBox = $('.conversation');


		$("#write-input").on('input', function(){
			var input = $(this).val();
			if(input != ""){
				$("#write-send").addClass('active');
			}else{
				$("#write-send").removeClass('active');
			}
		});

		$("#write-input").bind("enterKey",function(e){
			$("#write-send").click();
		});
		$("#write-input").keyup(function(e){
		    if(e.keyCode == 13)
		    {
		        $(this).trigger("enterKey");
		    }
		});

		$("#write-send").on('click',function(){
			var input = $("#write-input");
			// console.log(input.attr('data-id'));
			// console.log(input.val());
			var next = talk.bootConversation[input.attr('data-id')];
			console.log(next);

			if(next["condition"] == 'notEmpty'){
				if(!input.val()){
					conversationBox.append(user("Você precisa inserir um valor"));	
				}
				conversationBox.append(user(input.val()));
				input.val() == "";
				var regex = /\$1/;

				next.dialog = next.dialog.replace(regex, input.val());
				conversationBox.append(robot(next.dialog));
				bootTalk(input.attr('data-id')+1);
			}
			
		});

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
				$('#write-input').prop('disabled', false);
				$('#write-input').focus();
				$('#write-input').attr('data-id',i);			


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
				//console.log(i+">="+$index);
				if(i >= $index){
					//console.log(talk.bootConversation[i]);
					//console.log(i);
					$('#write-input').prop('disabled', true);
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