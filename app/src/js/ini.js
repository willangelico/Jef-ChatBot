;(function( $ ) {

    "use strict";

	$(document).ready( function(){

		// Elements
		var status = $('.status');
		var conversationBox = $('.conversation');
		var writeInput = $('#write-input');
		var btnSend = $('#write-send');

		// Avatars
		var avatar = {
			"robot" : "http://lorempixel.com/60/60/people/?1",
			"user" : "http://lorempixel.com/60/60/people/?1"
		}
		
		// Dialog Configs		
		var template = (tpl, args) => tpl.replace(/\${(\w+)}/g, (_, v) => args[v]);
		var talk = {"bootConversation":[
						{ "id": 1, "dep": false, "dialog":"Valeu por aceitar a conversa. Será bem rapidinho... Vamos lá?" },
						{ "id": 1, "dep": false, "dialog":"Meu Nome é Jéff, e o seu?" },
						{ "id": 2, "dep": true, "depType":"input", "depName": "name", "condition": "notEmpty", "dialog":"Muito prazer, ${i1}" },
						{ "id": 2, "dep": false, "dialog":"E aí, vc tem carro?" },
						{ "id": 3, "dep": true, "depType": "select", "depName": "isCar", "condition":"yes|no" ,"dialog":"Fale mais sobre ele! Qual o modelo?|E moto você tem?" },
						

					]};

		// Message Templates 
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

		// Save Storage
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

		writeInput.on('input', function(){
			var input = $(this).val();
			if(input != ""){
				btnSend.addClass('active');
			}else{
				btnSend.removeClass('active');
			}
		});
		writeInput.bind("enterKey",function(e){
			btnSend.click();
		});
		writeInput.keyup(function(e){
		    if(e.keyCode == 13)
		        $(this).trigger("enterKey");		    
		});

		btnSend.on('click',function(){
		
			var next = talk.bootConversation[writeInput.attr('data-id')];
			
			if(next["condition"] == 'notEmpty'){

				if(!writeInput.val()){
					conversationBox.append(user("Você precisa inserir um valor"));	
				}

				conversationBox.append(user(writeInput.val()));
				next.dialog = template(next.dialog, {i1: writeInput.val()});
			

				//console.log(saveItem(next.depName, writeInput.val()));

				
				//if (typeof(Storage) !== "undefined") {
				
				// localStorage.setItem(next.depName, writeInput.val()){

				// 
				//} else {
				    // Sorry! No Web Storage support..
				//}


				writeInput.val("");
				writeInput.prop('disabled', true);			

				setTimeout(function(){
					conversationBox.append(robot(next.dialog));
				},3000);
				bootTalk(writeInput.attr('data-id')+1);
			}			
		});

		var display = {
			setTime : 3000,
			dialog : function(v,i){
				setTimeout(function(){
					conversationBox.append(robot(v.dialog));			
					conversationBox.animate({
						scrollTop: conversationBox.get(0).scrollHeight
						},1000);
				},this.setTime);
			},
			input : function(v,i){
				setTimeout(function(){
					writeInput.prop('disabled', false);
					writeInput.attr('data-id',i);			
					writeInput.focus();
				},this.setTime);				
			}
		}

		var bootTalk = ($index = 0, $i_time = 1) => {

			if( $index > 0 ) $i_time = 2;			

			for (var i in talk.bootConversation){

				if(i >= $index){

					writeInput.prop('disabled', true);			
					let v = talk.bootConversation[i];
					display.setTime = $i_time*3000;

					if(v.dep){												
						display.input(v,i);						
						break;			
					}else{						
						status.show();
						display.dialog(v,i);						
					}			
					$i_time++;
				}				
			}
			setTimeout(function(){
				status.hide();				
			},($i_time-1)*3000);
		}

		bootTalk();
	}); 
})(jQuery);