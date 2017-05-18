;(function( $ ) {

    "use strict";

	$(document).ready( function(){

		var status = $('.status');

		var conversationBox = $('.conversation');

		var avatar = {
			"robot" : "http://lorempixel.com/60/60/people/?1",
			"user" : "http://lorempixel.com/60/60/people/?1"
		}
			
		var talk = {"bootConversation":[
						{ "id": 1, "dep": false, "dialog":"Valeu por aceitar a conversa. Será bem rapidinho... Vamos lá?" },
						{ "id": 1, "dep": false, "dialog":"Meu Nome é Jéff, e o seu?" },
						{ "id": 2, "dep": true, "depType":"input", "depName": "name", "condition": "notEmpty", "dialog":"Muito prazer, ${i1}" },
						{ "id": 2, "dep": false, "dialog":"E aí, vc tem carro?" },
						{ "id": 3, "dep": true, "depType": "select", "depName": "isCar", "condition":"yes|no" ,"dialog":"Fale mais sobre ele! Qual o modelo?|E moto você tem?" },
						

					]};

		var robot = (txt) => `
			<div class="robot">
				<div class="avatar">
					<img src=${avatar.robot} alt="" class="icon img-circle img-responsive">
				</div>
				<div class="msg">
					<p>${txt}</p>
				</div>
			</div>`;

		var user = (txt) => `
			<div class="user">
				<div class="avatar">
					<img src=${avatar.user} alt="" class="icon img-circle img-responsive">
				</div>
				<div class="msg">
					<p>${txt}</p>
				</div>
			</div>`;

		var saveItem = (n,v) => {
			let chatbot = localStorage.getItem("chatbot");
			let data = !chatbot ? {} : JSON.parse(chatbot);
			data[n] = v;			
			try {
				localStorage.setItem("chatbot", JSON.stringify(data));
				//localStorage.removeItem(mod);					
				return true;
			} catch (exception) {
				return false;
			}
		}



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
		
			var next = talk.bootConversation[input.attr('data-id')];
			
			if(next["condition"] == 'notEmpty'){

				if(!input.val()){
					conversationBox.append(user("Você precisa inserir um valor"));	
				}
				conversationBox.append(user(input.val()));

				var template = (tpl, args) => tpl.replace(/\${(\w+)}/g, (_, v) => args[v]);

				next.dialog = template(next.dialog, {i1: input.val()});
				

				console.log(saveItem(next.depName, input.val()));

				
				//if (typeof(Storage) !== "undefined") {
				
				// localStorage.setItem(next.depName, input.val()){

				// 
				//} else {
				    // Sorry! No Web Storage support..
				//}


				input.val("");
				input.prop('disabled', true);

				

				setTimeout(function(){
					conversationBox.append(robot(next.dialog));
				},3000);
				bootTalk(input.attr('data-id')+1);
			}
			
		});

		function displayDialog(v,i,i_t){
			let timer = parseInt(i_t)*3000;
			status.show();
			setTimeout(function(){
				conversationBox.append(robot(v.dialog));			
				conversationBox.animate({
					scrollTop: conversationBox.get(0).scrollHeight
					},1000);
			},timer);
		}

		function displayInput(v,i, i_t){
	
			setTimeout(function(){
				$('#write-input').prop('disabled', false);
				
				$('#write-input').attr('data-id',i);			

				$('#write-input').focus();

			},i_t*3000);
			
		}

		var bootTalk = ($index = 0, $i_time = 1) => {

			if( $index > 0 ) $i_time = 2;			

			for (var i in talk.bootConversation){

				if(i >= $index){

					$('#write-input').prop('disabled', true);			
					let v = talk.bootConversation[i];
			
					if(v.dep){
			
						displayInput(v,i,$i_time);
						break;
			
					}else{
			
						displayDialog(v,i,$i_time);
					}
			
					$i_time++;
				}				
			}
			setTimeout(function(){
				status.hide();				
			},($i_time-1)*3000);
		}

		// function bootTalk($index = 0){
		// 	//console.log($id);
								
		// 	// let conversation = talk.bootConversation.forEach((v, i) => 	{

		// 	// 		if(v.dep){
		// 	// 			console.log(v.dep);
		// 	// 			displayInput(v,i);
		// 	// 			return false;
		// 	// 		}else{
		// 	// 			displayDialog(v,i);
		// 	// 			//return true;
		// 	// 		}
		// 	// 	}
		// 	// );
		// 	// 
			

		// 	var i_time = 1;
		// 	if($index>0){
		// 		var i_time = 2;
		// 	}
		// 	for (var i in talk.bootConversation){
		// 		//console.log(i+">="+$index);
		// 		//console.log(i_time);
		// 		if(i >= $index){
		// 			//console.log(talk.bootConversation[i]);
		// 			//console.log(i);
		// 			$('#write-input').prop('disabled', true);
		// 			var v = talk.bootConversation[i];
		// 			if(v.dep){
		// 				displayInput(v,i,i_time);
		// 				break;
		// 			}else{
		// 				displayDialog(v,i,i_time);
		// 			}
		// 			i_time++;
		// 		}

				

		// 	}
		// 	setTimeout(function(){
		// 		status.hide();				
		// 	},(i_time-1)*3000);


		// }

		bootTalk();


	}); 
})(jQuery);