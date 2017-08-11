;(function( $ ) {

    "use strict";

		// Elements
		var status = $('.status');
		var conversationBox = $('.conversation');
		var writeInput = $('#write-input');
		var btnSend = $('#write-send');

		// Avatars
		var avatar = {
			"robot" : "/assets/img/avatar-robot.png",
			"user" : "/assets/img/avatar-user.png"
		}

		var bootList = () => `
			<img src=${avatar.robot} alt="Avatar Boot" class="img-circle img-responsive">
			<strong>JeffBot</strong>
			<small>A simple chatBot but very intelligent</small>
		`;
		$("#boot-list").html(bootList);
		
		// Dialog Configs		
		var template = (tpl, args) => tpl.replace(/\${(\w+)}/g, (_, v) => args[v]);
		var talk = {"bootConversation":[
			{ 
				"id": 0, 
				"dep": false, 
				"dialog":"Valeu por aceitar a conversa. Será bem rapidinho... Vamos lá?", 
				"nextDialog": "1" 
			},{ 
				"id": 1, 
				"dep": false, 
				"dialog":"Meu Nome é Jéff, e o seu?",
				"nextDialog": "2" 
			},{ 
				"id": 2, 
				"dep": true, 
				"depType":"input", 
				"depName": "name", 
				"depPlaceholder": "Digite seu nome", 
				"condition": "notEmpty", 
				"dialog":"Muito prazer, ${i1}", 
				"nextDialog": "3" 
			},{ 
				"id": 3, 
				"dep": false, 
				"dialog":"E aí, vc tem carro?",
				"nextDialog": "4" 
			},{ 
				"id": 4, 
				"dep": true, 
				"depType": "multiple", 
				"depName": "isCar", 
				"condition":"Sim|Não",
				"dialog":"Fale mais sobre ele! Qual o modelo?|E moto você tem?", 
				"nextDialog": "5|6" 
			},{ 
				"id": 5, 
				"dep": true, 
				"depType": "select", 
				"depList": "modelsCars", 
				"depPlaceholder": "Digite o modelo", 
				"depName": "modelCar",
				"condition": "notEmpty", 
				"dialog":"Vc lembra o ano?", 
				"nextDialog": "7" 
			},{ 
				"id": 6, 
				"dep": true, 
				"depType": "multiple", 
				"depName": "isMoto", 
				"condition":"Sim|Não",
				"dialog":"Fale mais sobre ela! Qual o modelo?|Não tem problema", 
				"nextDialog": "10|24" 
			},{ 
				"id": 7, 
				"dep": true, 
				"depType": "input", 
				"depName": "yearCar", 
				"depPlaceholder": "Digite o ano de modelo do seu carro (4 digitos)", 
				"condition": "notEmpty", 
				"dialog":"Que TOP hein?!", 
				"nextDialog": "8" 
			},{ 
				"id": 8, 
				"dep": false, 
				"dialog": "Por acaso vc tem mais algum possante / moto?!",
				"nextDialog": "9" 
			},{ 
				"id": 9, 
				"dep": true, 
				"depType": "multiple", 
				"depName": "carMoto", 
				"condition":"Carro|Moto|Não tenho mais nenhum veículo",
				"dialog":"Fale mais sobre ele! Qual o modelo?|Fale mais sobre ela! Qual o modelo?|Ah...legal!", 
				"nextDialog": "14|10|24" 
			},{
				"id": 10,
				"dep": true,
				"depType": "select", 
				"depList": "modelsMoto", 
				"depPlaceholder": "Digite o modelo", 
				"depName": "modelMoto",
				"condition": "notEmpty", 
				"dialog":"Vc lembra o ano?", 
				"nextDialog": "11"
			},{ 
				"id": 11, 
				"dep": true, 
				"depType": "input", 
				"depName": "yearMoto", 
				"depPlaceholder": "Digite o ano de modelo da sua moto (4 digitos)", 
				"condition": "notEmpty", 
				"dialog":"Blz!!!", 
				"nextDialog": "12" 
			},{ 
				"id": 12,
				"dep": false, 
				"dialog": "Por acaso vc tem mais algum possante / moto?!",
				"nextDialog": "13" 
			},{ 
				"id": 13, 
				"dep": true, 
				"depType": "multiple", 
				"depName": "carMoto", 
				"condition":"Carro|Moto|Não tenho mais nenhum veículo",
				"dialog":"Fale mais sobre ele! Qual o modelo?|Fale mais sobre ela! Qual o modelo?|Ah...legal!", 
				"nextDialog": "14|15|24" 
			},{ 
				"id": 14, 
				"dep": true, 
				"depType": "select", 
				"depList": "modelsCars", 
				"depPlaceholder": "Digite o modelo", 
				"depName": "modelCar2",
				"condition": "notEmpty", 
				"dialog":"Vc lembra o ano?", 
				"nextDialog": "15" 
			},{ 
				"id": 15, 
				"dep": true, 
				"depType": "input", 
				"depName": "yearCar2", 
				"depPlaceholder": "Digite o ano de modelo do seu carro (4 digitos)", 
				"condition": "notEmpty", 
				"dialog":"Só carro TOP hein?!", 
				"nextDialog": "16" 
			},{ 
				"id": 16, 
				"dep": false, 
				"dialog": "Por acaso vc tem mais alguma moto?!",
				"nextDialog": "17" 
			},{ 
				"id": 17, 
				"dep": true, 
				"depType": "multiple", 
				"depName": "carMoto", 
				"condition":"Tenho outra Moto|Não tenho mais nenhum veículo",
				"dialog":"Fale mais sobre ela! Qual o modelo?|Ah...legal!", 
				"nextDialog": "18|24" 
			},{
				"id": 18,
				"dep": true,
				"depType": "select", 
				"depList": "modelsMoto", 
				"depPlaceholder": "Digite o modelo", 
				"depName": "modelMoto2",
				"condition": "notEmpty", 
				"dialog":"Vc lembra o ano?", 
				"nextDialog": "19"
			},{ 
				"id": 19, 
				"dep": true, 
				"depType": "input", 
				"depName": "yearMoto2", 
				"depPlaceholder": "Digite o ano de modelo da sua moto (4 digitos)", 
				"condition": "notEmpty", 
				"dialog":"Blz!!!", 
				"nextDialog": "12" 
			},{ 
				"id": 20, 
				"dep": true,
				"depType": "select", 
				"depList": "modelsMoto", 
				"depPlaceholder": "Digite o modelo", 
				"depName": "modelMoto2",
				"condition": "notEmpty", 
				"dialog":"Vc lembra o ano?", 
				"nextDialog": "21" 
			},{ 
				"id": 21, 
				"dep": true, 
				"depType": "input", 
				"depName": "yearMoto2", 
				"depPlaceholder": "Digite o ano de modelo da sua moto (4 digitos)", 
				"condition": "notEmpty", 
				"dialog":"Só máquina, hein?!", 
				"nextDialog": "22" 
			},{ 
				"id": 22, 
				"dep": true, 
				"depType": "select", 
				"depList": "modelsCars", 
				"depPlaceholder": "Digite o modelo", 
				"depName": "modelCar2",
				"condition": "notEmpty", 
				"dialog":"Vc lembra o ano?", 
				"nextDialog": "23" 
			},{ 
				"id": 23, 
				"dep": true, 
				"depType": "input", 
				"depName": "yearCar2", 
				"depPlaceholder": "Digite o ano de modelo do seu carro (4 digitos)", 
				"condition": "notEmpty", 
				"dialog":"Só carro TOP hein?!", 
				"nextDialog": "24" 
			},{ 
				"id": 24, 
				"dep": false, 
				"dialog":"UFFAA... Já estamos acabando, faltam só mais 3 perguntas! :)",
				"nextDialog": "25"
			},{
				"id": 25,
				"dep": false, 
				"dialog":"Para vc aproveitar das promoções de Frete Grátis por região, me fale a cidade que vc mora?",
				"nextDialog": "26"
			},{
				"id": 26, 
				"dep": true, 
				"depType": "select", 
				"depList": "cities", 
				"depPlaceholder": "Digite a cidade", 
				"depName": "citie",
				"condition": "cities",
				"dialog":"Qual o estado?|Nós sempre lembramos de presentear nossos clientes em seus aniversários", 
				"nextDialog": "33|34" 
			}
		]};
						
		// Select Options
		 var modelsCars = [
   			{title: 'Audi - A1', id: '1'},{title: 'Audi - A3', id: '2'},{title: 'Audi - A3 Sedan', id: '3'},{title: 'Audi - A4', id: '4'},{title: 'Audi - A4 Avant', id: '5'},{title: 'Audi - A4 Sedan', id: '6'},{title: 'Audi - A5', id: '7'},{title: 'Audi - A6', id: '8'},{title: 'Audi - A7', id: '9'},{title: 'Audi - A8', id: '10'},{title: 'Audi - Q5', id: '11'},{title: 'Audi - Q7', id: '12'},{title: 'Audi - R8', id: '13'},{title: 'Audi - R8 GT', id: '14'},{title: 'Audi - RS 3 Sportback', id: '15'},{title: 'Audi - RS 5', id: '16'},{title: 'Audi - RS6 Avant', id: '17'},{title: 'Audi - TT Coupé', id: '18'},{title: 'Audi - TT Roadster', id: '19'},
   			{title: 'BMW - 320I', id: '20'},{title: 'BMW - 325I', id: '21'},{title: 'BMW - E46', id: '22'},{title: 'BMW - Série 1', id: '23'},{title: 'BMW - Série 1 Cabrio', id: '24'},{title: 'BMW - Série 1 Coupé', id: '25'},{title: 'BMW - Série 1 M', id: '26'},{title: 'BMW - Série 3', id: '27'},{title: 'BMW - Série 3 Cabrio', id: '28'},{title: 'BMW - Série 3 M3 Coupé', id: '29'},{title: 'BMW - Série 3 M3 Sedan', id: '30'},{title: 'BMW - Série 3 Sedan', id: '31'},{title: 'BMW - Série 5 Gran Turismo', id: '32'},{title: 'BMW - Série 5 Sedan', id: '33'},{title: 'BMW - Série 7 Sedan', id: '34'},{title: 'BMW - X1', id: '35'},{title: 'BMW - X3', id: '36'},{title: 'BMW - X5', id: '37'},{title: 'BMW - X6', id: '38'},{title: 'BMW - Z4 Roadster', id: '39'},
   			{title: 'Chana - Cargo', id: '40'},{title: 'Chana - Family', id: '41'},{title: 'Chana - Utility', id: '42'},
   			{title: 'Chery - Celer Hatch', id: '43'},{title: 'Chery - Celer Sedan', id: '44'},{title: 'Chery - Cielo Hatch', id: '45'},{title: 'Chery - Cielo Sedan', id: '46'},{title: 'Chery - Face', id: '47'},{title: 'Chery - QQ', id: '48'},{title: 'Chery - S-18', id: '49'},{title: 'Chery - Tiggo', id: '50'},
   			{title: 'Chevrolet - A10', id: '51'},{title: 'Chevrolet - A20', id: '52'},{title: 'Chevrolet - Agile', id: '53'},{title: 'Chevrolet - Astra', id: '54'},{title: 'Chevrolet - Astra Hatch', id: '55'},{title: 'Chevrolet - Astra Sedan', id: '56'},{title: 'Chevrolet - Blazer', id: '57'},{title: 'Chevrolet - Bonanza', id: '58'},{title: 'Chevrolet - C10', id: '59'},{title: 'Chevrolet - C20', id: '60'},{title: 'Chevrolet - Calibra', id: '61'},{title: 'Chevrolet - Camaro', id: '62'},{title: 'Chevrolet - Captiva', id: '63'},{title: 'Chevrolet - Caravan', id: '64'},{title: 'Chevrolet - Celta', id: '65'},{title: 'Chevrolet - Chevette', id: '66'},{title: 'Chevrolet - Chevy', id: '67'},{title: 'Chevrolet - Classic', id: '68'},{title: 'Chevrolet - Cobalt', id: '69'},{title: 'Chevrolet - Corsa', id: '70'},{title: 'Chevrolet - Corsa Classic', id: '71'},{title: 'Chevrolet - Corsa Hatch', id: '72'},{title: 'Chevrolet - Corsa Sedan', id: '73'},{title: 'Chevrolet - Corsa Wagon', id: '74'},{title: 'Chevrolet - Cruze', id: '75'},{title: 'Chevrolet - Cruze Sport6', id: '76'},{title: 'Chevrolet - D10', id: '77'},{title: 'Chevrolet - D20', id: '78'},{title: 'Chevrolet - Grand Blazer', id: '79'},{title: 'Chevrolet - Ipanema', id: '80'},{title: 'Chevrolet - Kadett', id: '81'},{title: 'Chevrolet - Malibu', id: '82'},{title: 'Chevrolet - Marajó', id: '83'},{title: 'Chevrolet - Meriva', id: '84'},{title: 'Chevrolet - Montana', id: '85'},{title: 'Chevrolet - Monza', id: '86'},{title: 'Chevrolet - Monza Hatch', id: '87'},{title: 'Chevrolet - Novo Prisma', id: '88'},{title: 'Chevrolet - Omega', id: '89'},{title: 'Chevrolet - Omega Suprema', id: '90'},{title: 'Chevrolet - Onix', id: '91'},{title: 'Chevrolet - Opala', id: '92'},{title: 'Chevrolet - Opala Comodoro', id: '93'},{title: 'Chevrolet - Opala Diplomata', id: '94'},{title: 'Chevrolet - Prisma', id: '95'},{title: 'Chevrolet - S10', id: '96'},{title: 'Chevrolet - Silverado', id: '97'},{title: 'Chevrolet - Sonic', id: '98'},{title: 'Chevrolet - Spin', id: '99'},{title: 'Chevrolet - Tigra', id: '100'},{title: 'Chevrolet - Tracker', id: '101'},{title: 'Chevrolet - Trailblazer', id: '102'},{title: 'Chevrolet - Vectra', id: '103'},{title: 'Chevrolet - Veraneio', id: '104'},{title: 'Chevrolet - Zafira', id: '105'},
   			{title: 'Chrysler - 300C',id: '106'},{title: 'Chrysler - Pt Cruiser',id: '107'},{title: 'Chrysler - Town & Country', id: '108'},
   			{title: 'Citroen - Aircross', id: '109'},{title:'Citroen - Berlingo', id: '110'},{title:'Citroen - C3', id: '111'},{title:'Citroen - C3 Picasso', id: '112'},{title:'Citroen - C30', id: '113'},{title:'Citroen - C4', id: '114'},{title:'Citroen - C4 Lounge', id: '115'},{title:'Citroen - C4 Pallas', id: '116'},{title:'Citroen - C4 Picasso', id: '117'},{title:'Citroen - C5', id: '118'},{title:'Citroen - C5 Tourer', id: '119'},{title:'Citroen - DS3', id: '120'},{title:'Citroen - DS5', id: '121'},{title:'Citroen - Jumper', id: '122'},{title:'Citroen - Xantia', id: '123'},{title:'Citroen - Xsara', id: '124'},{title:'Citroen - Xsara Picasso', id: '125'},
            {title: 'Daewoo - Espero', id: '126'},
            {title: 'Dodge - Dakota',id: '127'},{title: 'Dodge - Journey',id: '128'},{title: 'Dodge - RAM',id: '129'},{title: 'Dodge - RAM 2500',id: '130'},
            {title: 'Effa - Hafei Furgão', id: '131'},{title: 'Effa - Hafei Pick Up Baú', id: '132'},{title: 'Effa - Hafei Pick Up Cabine Dupla', id: '133'},{title: 'Effa - Hafei Pick Up Cabine Simples', id: '134'},{title: 'Effa - Hafei Van', id: '135'},{title: 'M100', id: '136'},{title: 'Effa - Pick Up Effa', id: '137'},
            {title: 'Ferrari - Ferrari', id: '138'},
            {title: 'Fiat 500',id: '139'},{title: 'Fiat Brava',id: '140'},{title: 'Fiat Bravo',id: '141'},{title: 'Fiat Doblo',id: '142'},{title: 'Fiat Doblo Adventure',id: '143'},{title: 'Fiat Doblo Cargo',id: '144'},{title: 'Fiat Ducato',id: '145'},{title: 'Fiat Elba',id: '146'},{title: 'Fiat Fiat 147',id: '147'},{title: 'Fiat Fiorino',id: '148'},{title: 'Fiat Freemont',id: '149'},{title: 'Fiat Grand Siena',id: '150'},{title: 'Fiat Idea',id: '151'},{title: 'Fiat Idea Adventure',id: '152'},{title: 'Fiat Linea',id: '153'},{title: 'Fiat Marea',id: '154'},{title: 'Fiat Palio',id: '155'},{title: 'Fiat Palio Adventure',id: '156'},{title: 'Fiat Palio Weekend',id: '157'},{title: 'Fiat Palio Young',id: '158'},{title: 'Fiat Panorama',id: '159'},{title: 'Fiat Premio',id: '160'},{title: 'Fiat Punto',id: '161'},{title: 'Fiat Siena',id: '162'},{title: 'Fiat Spazio',id: '163'},{title: 'Fiat Stilo',id: '164'},{title: 'Fiat Stilo Abarth',id: '165'},{title: 'Fiat Strada',id: '166'},{title: 'Fiat Tempra',id: '167'},{title: 'Fiat Tempra SW',id: '168'},{title: 'Fiat Tipo',id: '169'},{title: 'Fiat Uno',id: '170'},
            {title: 'Ford - Belina', id: '171'},{title: 'Ford - Corcel', id: '172'},{title: 'Ford - Courier', id: '173'},{title: 'Ford - Del Rey', id: '174'},{title: 'Ford - Ecosport', id: '175'},{title: 'Ford - Edge', id: '176'},{title: 'Ford - Escort', id: '177'},{title: 'Ford - Escort Zetec', id: '178'},{title: 'Ford - Explorer', id: '179'},{title: 'Ford - F-100', id: '180'},{title: 'Ford - F-1000', id: '181'},{title: 'Ford - F-2000', id: '182'},{title: 'Ford - F-250', id: '183'},{title: 'Ford - F-350', id: '184'},{title: 'Ford - F-4000', id: '185'},{title: 'Ford - Fiesta', id: '186'},{title: 'Ford - Fiesta Amazon', id: '187'},{title: 'Ford - Fiesta Hatch', id: '188'},{title: 'Ford - Fiesta Rocam', id: '189'},{title: 'Ford - Fiesta Sedan', id: '190'},{title: 'Ford - Focus', id: '191'},{title: 'Ford - Focus Hatch', id: '192'},{title: 'Ford - Focus Sedan', id: '193'},{title: 'Ford - Fusion', id: '194'},{title: 'Ford - Hobby', id: '195'},{title: 'Ford - Ka', id: '196'},{title: 'Ford - Ka Hatch', id: '197'},{title: 'Ford - Ka Sedan', id: '198'},{title: 'Ford - Maverick', id: '199'},{title: 'Ford - New Fiesta', id: '200'},{title: 'Ford - New Fiesta Hatch', id: '201'},{title: 'Ford - Pampa', id: '202'},{title: 'Ford - Perua Zetec', id: '203'},{title: 'Ford - Royale', id: '204'},{title: 'Ford - Transit', id: '205'},{title: 'Ford - Versailles', id: '206'},
            {title: 'Hafei - Towner Furgão',id: '207'},{title: 'Hafei - Towner Passageiro',id: '208'},
            {title: 'Honda - Accord', id: '209'},{title: 'Honda - City', id: '210'},{title: 'Honda - Civic', id: '211'},{title: 'Honda - CRV', id: '212'},{title: 'Honda - Fit', id: '213'},{title: 'Honda - HR-V', id: '214'},{title: 'Honda - New Civic', id: '215'},{title: 'Honda - New Fit',id: '216'},
			{title: 'Hyundai - Accent', id: '217'},{title: 'Hyundai - Atos', id: '218'},{title: 'Hyundai - Azera', id: '219'},{title: 'Hyundai - Elantra', id: '220'},{title: 'Hyundai - Equus', id: '221'},{title: 'Hyundai - H100', id: '222'},{title: 'Hyundai - HB20', id: '223'},{title: 'Hyundai - HB20S', id: '224'},{title: 'Hyundai - HB20X', id: '225'},{title: 'Hyundai - HR', id: '226'},{title: 'Hyundai - I30', id: '227'},{title: 'Hyundai - I30 CW', id: '228'},{title: 'Hyundai - iX35', id: '229'},{title: 'Hyundai - Santa Fe', id: '230'},{title: 'Hyundai - Sonata', id: '231'},{title: 'Hyundai - Tucson', id: '232'},{title: 'Hyundai - Veloster', id: '233'},{title: 'Hyundai - Veracruz', id: '234'},
			{title: 'Iveco - Daily 35S14',id: '235'},{title: 'Iveco - Daily 40S16',id: '236'},{title: 'Iveco - Daily 45C14',id: '237'},{title: 'Iveco - Daily 45S17',id: '238'},{title: 'Iveco - Daily 55C17',id: '239'},{title: 'Iveco - Daily 70C16',id: '240'},{title: 'Iveco - Stralis', id: '241'},
			{title: 'Jac - J2',id: '242'},{title: 'Jac - J3',id: '243'},{title: 'Jac - J3 Turin',id: '244'},{title: 'Jac - J5',id: '245'},{title: 'Jac - J6', id: '246'},
            {title: 'Jeep - Cherokee',id: '247'},{title: 'Jeep - Grand Cherokee',id: '248'},{title: 'Jeep - Grand Cherokee Laredo',id: '249'},{title: 'Jeep - Grand Cherokee Limited',id: '250'},{title: 'Jeep - Jeep Willys',id: '251'},{title: 'Jeep - Renegade',id: '252'},{title: 'Jeep - Wrangler',id: '253'},
            {title: 'Jinbei Topic - Jinbei Topic', id: '254'},
            {title: 'Kia - Besta', id: '255'},{title: 'Kia - Bongo', id: '256'},{title: 'Kia - Cadenza', id: '257'},{title: 'Kia - Carens', id: '258'},{title: 'Kia - Carnival', id: '259'},{title: 'Kia - Cerato', id: '260'},{title: 'Kia - Mohave', id: '261'},{title: 'Kia - Optima', id: '262'},{title: 'Kia - Picanto', id: '263'},{title: 'Kia - Sorento', id: '264'},{title: 'Kia - Soul', id: '265'},{title: 'Kia - Sportage', id: '266'},
            {title: 'Land Rover - Freelander 2', id: '267'},{title: 'Land Rover - Range Rover Evoque', id: '268'},{title: 'Land Rover - Range Rover Sport', id: '269'},{title: 'Land Rover - Range Rover Vogue', id: '270'},{title: 'Land Rover - Ranger',id: '271'},
            {title: 'Lifan - 320', id: '272'},{title: 'Lifan - 530', id: '273'},{title: 'Lifan - 620', id: '274'},{title: 'Lifan - X60',id: '275'},
          	{title: 'Mahindra - Mahindra Pick Up Scorpio',id:'276'},{title: 'Mahindra - Mahindra SUV',id:'277'},
            {title: 'Mazda - Mazda 626',id:'278'},{title: 'Mazda - Mazda B2500',id:'279'},
            {title: 'Mercedes Benz - Accelo', id:'280'},{title: 'Mercedes Benz - C180', id:'281'},{title: 'Mercedes Benz - C220', id:'282'},{title: 'Mercedes Benz - C280', id:'283'},{title: 'Mercedes Benz - CLA', id:'284'},{title: 'Mercedes Benz - Classe A', id:'285'},{title: 'Mercedes Benz - Classe B', id:'286'},{title: 'Mercedes Benz - Classe C', id:'287'},{title: 'Mercedes Benz - Classe C 250 Turbo Sport', id:'288'},{title: 'Mercedes Benz - Classe C 63 AMG Touring', id:'289'},{title: 'Mercedes Benz - Classe CL', id:'290'},{title: 'Mercedes Benz - Classe CLS 63 AMG', id:'291'},{title: 'Mercedes Benz - Classe E', id:'292'},{title: 'Mercedes Benz - Classe G', id:'293'},{title: 'Mercedes Benz - Classe GL', id:'294'},{title: 'Mercedes Benz - Classe GLK', id:'295'},{title: 'Mercedes Benz - Classe M', id:'296'},{title: 'Mercedes Benz - Classe S', id:'297'},{title: 'Mercedes Benz - Classe S 400 Hybrid', id:'298'},{title: 'Mercedes Benz - Classe SLK', id:'299'},{title: 'Mercedes Benz - Classe SLS AMG', id:'300'},{title: 'Mercedes Benz - MB 180', id:'301'},{title: 'Mercedes Benz - MB 709', id:'302'},{title: 'Mercedes Benz - MB 712', id:'303'},{title: 'Mercedes Benz - MB 914', id:'304'},{title: 'Mercedes Benz - Sprinter', id:'305'},
         	{title: 'Mini - Cooper', id: '306'},{title: 'Mini - Cooper Cabrio', id: '307'},{title: 'Mini - Cooper Countryman', id: '308'},{title: 'Mini - Cooper S Clubman-Hampton', id: '309'},{title: 'Mini - One', id: '310'},
            {title: 'Mitsubishi - Airtrek',id:'311'},{title: 'Mitsubishi - ASX',id:'312'},{title: 'Mitsubishi - Galant',id:'313'},{title: 'Mitsubishi - L200',id:'314'},{title: 'Mitsubishi - L200 Outdoor',id:'315'},{title: 'Mitsubishi - L200 Savana',id:'316'},{title: 'Mitsubishi - L200 Sport',id:'317'},{title: 'Mitsubishi - L200 Triton',id:'318'},{title: 'Mitsubishi - L300',id:'319'},{title: 'Mitsubishi - Lancer',id:'320'},{title: 'Mitsubishi - Lancer Evolution X',id:'321'},{title: 'Mitsubishi - Outlander',id:'322'},{title: 'Mitsubishi - Pajero',id:'323'},{title: 'Mitsubishi - Pajero Dakar',id:'324'},{title: 'Mitsubishi - Pajero Full',id:'325'},{title: 'Mitsubishi - Pajero Sport',id:'326'},{title: 'Mitsubishi - Pajero TR4',id:'327'},{title: 'Mitsubishi - Virage',id:'328'},
            {title: 'Nissan - Frontier',id: '329'},{title: 'Nissan - Grand Livina',id: '330'},{title: 'Nissan - Livina',id: '331'},{title: 'Nissan - March',id: '332'},{title: 'Nissan - Nissan D21',id: '333'},{title: 'Nissan - Sentra',id: '334'},{title: 'Nissan - Tiida Hatch',id: '335'},{title: 'Nissan - Tiida Sedan',id: '336'},{title: 'Nissan - Versa',id: '337'},{title: 'Nissan - Xterra',id: '338'}, 
            {title: 'Peugeot - 106', id: '339'},{title: 'Peugeot - 206', id: '340'},{title: 'Peugeot - 207', id: '341'},{title: 'Peugeot - 208', id: '342'},{title: 'Peugeot - 306', id: '343'},{title: 'Peugeot - 307', id: '344'},{title: 'Peugeot - 308', id: '345'},{title: 'Peugeot - 405', id: '346'},{title: 'Peugeot - 407', id: '347'},{title: 'Peugeot - 408', id: '348'},{title: 'Peugeot - 504', id: '349'},{title: 'Peugeot - 508', id: '350'},{title: 'Peugeot - 3008', id: '351'},{title: 'Peugeot - 206 SW', id: '352'},{title: 'Peugeot - 207 Sedan', id: '353'},{title: 'Peugeot - 207 SW', id: '354'},{title: 'Peugeot - 308 CC', id: '355'},{title: 'Peugeot - Boxer', id: '356'},{title: 'Peugeot - Hoggar', id: '357'},{title: 'Peugeot - Partner', id: '358'},{title: 'Peugeot - RCZ', id: '359'},
         	{title: 'Renault - Clio', id:'360'},{title: 'Renault - Clio Sedan', id:'361'},{title: 'Renault - Duster', id:'362'},{title: 'Renault - Duster Oroch', id:'363'},{title: 'Renault - Fluence', id:'364'},{title: 'Renault - Kangoo', id:'365'},{title: 'Renault - Kangoo Express', id:'366'},{title: 'Renault - Laguna', id:'367'},{title: 'Renault - Logan', id:'368'},{title: 'Renault - Master', id:'369'},{title: 'Renault - Megane', id:'370'},{title: 'Renault - Megane Grand Tour', id:'371'},{title: 'Renault - R19', id:'372'},{title: 'Renault - Sandero', id:'373'},{title: 'Renault - Sandero Stepway', id:'374'},{title: 'Renault - Scenic', id:'375'},{title: 'Renault - Symbol', id:'376'},
            {title: 'Seat - Cordoba', id: '377'},{title: 'Seat - Ibiza', id: '378'},
            {title: 'Smart - Fortwo MHD',id: '379'},{title: 'Smart - Fortwo Passion Cabrio',id: '380'},{title: 'Smart - Fortwo Passion Coupé',id: '381'},
            {title: 'SsangYong - Actyon Sports',id: '382'},{title: 'SsangYong - Korando',id: '383'},{title: 'SsangYong - Kyron',id: '384'},
            {title: 'Subaru - Forester',id:'385'},{title: 'Subaru - Impreza',id:'386'},{title: 'Subaru - Impreza Hatch',id:'387'},{title: 'Subaru - Impreza Sedan',id:'388'},{title: 'Subaru - Legacy',id:'389'},{title: 'Subaru - Outback',id:'390'},{title: 'Subaru - Tribeca',id:'391'},
     		{title: 'Suzuki - Grand Vitara',id: '392'},{title: 'Suzuki - Jimny',id: '393'},{title: 'Suzuki - SX4',id: '394'},{title: 'Suzuki - Vitara',id: '395'},
            {title: 'Toyota - Camry',id:'396'},{title: 'Toyota - Corolla',id:'397'},{title: 'Toyota - Corolla Fielder',id:'398'},{title: 'Toyota - Etios Hatch',id:'399'},{title: 'Toyota - Etios Sedan',id:'400'},{title: 'Toyota - Hilux',id:'401'},{title: 'Toyota - Hilux SR',id:'402'},{title: 'Toyota - Hilux SR5',id:'403'},{title: 'Toyota - Hilux SRV',id:'404'},{title: 'Toyota - Hilux SW4',id:'405'},{title: 'Toyota - Prius',id:'406'},{title: 'Toyota - RAV4',id:'407'},{title: 'Toyota - SW4',id:'408'},
            {title: 'Troller - T4', id: '409'},
            {title: 'Volkswagen - Amarok', id: '410'},{title: 'Volkswagen - Apollo', id: '411'},{title: 'Volkswagen - Bora', id: '412'},{title: 'Volkswagen - Brasilia', id: '413'},{title: 'Volkswagen - Constellation', id: '414'},{title: 'Volkswagen - Crossfox', id: '415'},{title: 'Volkswagen - Fox', id: '416'},{title: 'Volkswagen - Fusca', id: '417'},{title: 'Volkswagen - Gol', id: '418'},{title: 'Volkswagen - Gol G2', id: '419'},{title: 'Volkswagen - Gol G3', id: '420'},{title: 'Volkswagen - Gol G4', id: '421'},{title: 'Volkswagen - Gol G5', id: '422'},{title: 'Volkswagen - Gol G6', id: '423'},{title: 'Volkswagen - Gol Rallye G6', id: '424'},{title: 'Volkswagen - Golf', id: '425'},{title: 'Volkswagen - Golf Alemão', id: '426'},{title: 'Volkswagen - Golf GTI', id: '427'},{title: 'Volkswagen - Golf Mexicano', id: '428'},{title: 'Volkswagen - Jetta', id: '429'},{title: 'Volkswagen - Jetta Variant', id: '430'},{title: 'Volkswagen - Kombi', id: '431'},{title: 'Volkswagen - Logus', id: '432'},{title: 'Volkswagen - New Beetle', id: '433'},{title: 'Volkswagen - Novo Voyage', id: '434'},{title: 'Volkswagen - Parati', id: '435'},{title: 'Volkswagen - Parati G2', id: '436'},{title: 'Volkswagen - Parati G3', id: '437'},{title: 'Volkswagen - Parati G4', id: '438'},{title: 'Volkswagen - Passat', id: '439'},{title: 'Volkswagen - Passat Alemão', id: '440'},{title: 'Volkswagen - Passat Variant', id: '441'},{title: 'Volkswagen - Pick Up Corsa', id: '442'},{title: 'Volkswagen - Pointer', id: '443'},{title: 'Volkswagen - Polo', id: '444'},{title: 'Volkswagen - Polo Classic', id: '445'},{title: 'Volkswagen - Polo Sedan', id: '446'},{title: 'Volkswagen - Quantum', id: '447'},{title: 'Volkswagen - Santana', id: '448'},{title: 'Volkswagen - Santana Quantum', id: '449'},{title: 'Volkswagen - Saveiro', id: '450'},{title: 'Volkswagen - Saveiro Cross', id: '451'},{title: 'Volkswagen - Saveiro Cross G5', id: '452'},{title: 'Volkswagen - Saveiro Cross G6', id: '453'},{title: 'Volkswagen - Saveiro G1', id: '454'},{title: 'Volkswagen - Saveiro G2', id: '455'},{title: 'Volkswagen - Saveiro G3', id: '456'},{title: 'Volkswagen - Saveiro G4', id: '457'},{title: 'Volkswagen - Saveiro G5', id: '458'},{title: 'Volkswagen - Saveiro G6', id: '459'},{title: 'Volkswagen - Saveiro Sunset', id: '460'},{title: 'Volkswagen - Space Cross', id: '461'},{title: 'Volkswagen - SpaceFox', id: '462'},{title: 'Volkswagen - Tiguan', id: '463'},{title: 'Volkswagen - Touareg', id: '464'},{title: 'Volkswagen - Up', id: '465'},{title: 'Volkswagen - Variant', id: '466'},{title: 'Volkswagen - Voyage', id: '467'},{title: 'Volkswagen - Voyage G1', id: '468'},{title: 'Volkswagen - Voyage G5', id: '469'},{title: 'Volkswagen - Voyage G6', id: '470'},{title: 'Volkswagen - Voyage Super', id: '471'},{title: 'Volkswagen - VW 11.130', id: '472'},{title: 'Volkswagen - VW 11.140', id: '473'},{title: 'Volkswagen - VW 12.140', id: '474'},{title: 'Volkswagen - VW 12.180', id: '475'},{title: 'Volkswagen - VW 13.130', id: '476'},{title: 'Volkswagen - VW 13.150', id: '477'},{title: 'Volkswagen - VW 13.170', id: '478'},{title: 'Volkswagen - VW 14.140', id: '479'},{title: 'Volkswagen - VW 14.170', id: '480'},{title: 'Volkswagen - VW 14.180', id: '481'},{title: 'Volkswagen - VW 14.220', id: '482'},{title: 'Volkswagen - VW 16.200', id: '483'},{title: 'Volkswagen - VW 16.210', id: '484'},{title: 'Volkswagen - VW 16.220', id: '485'},{title: 'Volkswagen - VW 16.300', id: '486'},{title: 'Volkswagen - VW 24.220', id: '487'},{title: 'Volkswagen - VW 35.300', id: '488'},{title: 'Volkswagen - VW 6.90', id: '489'},{title: 'Volkswagen - VW 7.100', id: '490'},{title: 'Volkswagen - VW 7.110', id: '491'},{title: 'Volkswagen - VW 7.90', id: '492'},{title: 'Volkswagen - VW 8.100', id: '493'},{title: 'Volkswagen - VW 8.120', id: '494'},{title: 'Volkswagen - VW 8.140', id: '495'},{title: 'Volkswagen - VW 8.150', id: '496'},{title: 'Volkswagen - VW Delivery', id: '497'},{title: 'Volkswagen - VW Van', id: '498'},{title: 'Volkswagen - VW Worker', id: '499'},
            {title: 'Volvo - XC 60', id:'500'},{title: 'Volvo - S60', id: '501'}
		];

		var modelsMoto = [
			{title: 'BMW - F 800 GS',id: '1'},{title: 'BMW - F 800 R',id: '2'},{title: 'BMW - F 800 S',id: '3'},{title: 'BMW - G 450 X',id: '4'},{title: 'BMW - G 650 GS',id: '5'},{title: 'BMW - K 100',id: '6'},{title: 'BMW - K 100 RS',id: '7'},{title: 'BMW - K 1100 LT',id: '8'},{title: 'BMW - K 1200 GT',id: '9'},{title: 'BMW - K 1300 GT',id: '10'},{title: 'BMW - K 1300 R',id: '11'},{title: 'BMW - K 1600 GT',id: '12'},{title: 'BMW - K 75',id: '13'},{title: 'BMW - S 1000 R',id: '14'},
			{title: 'Caloi - Mobilete 50',id: '15'},{title: 'Caloi - Mobilete Caloi',id: '16'},
			{title: "Dafra - Apache RTR 150",id:"17"},{title: "Dafra - A 50",id:"18"},{title: "Dafra - Cityclass 200 I",id:"19"},{title: "Dafra - Citycom 300 I",id:"20"},{title: "Dafra - Fiddle III",id:"21"},{title: "Dafra - Horizon 150",id:"22"},{title: "Dafra - Horizon 250",id:"23"},{title: "Dafra - Kansas 150",id:"24"},{title: "Dafra - Kansas 250",id:"25"},{title: "Dafra - Laser 150",id:"26"},{title: "Dafra - Maxsym 400i",id:"27"},{title: "Dafra - Next 250",id:"28"},{title: "Dafra - Riva 150",id:"29"},{title: "Dafra - Roadwin 250R",id:"30"},{title: "Dafra - Smart 125",id:"31"},{title: "Dafra - Speed 150",id:"32"},{title: "Dafra - Super 100",id:"33"},{title: "Dafra - Super 50",id:"34"},{title: "Dafra - Zig +",id:"35"},{title: "Dafra - Zig 110",id:"36"},{title: "Dafra - Zig 50",id:"37"},
			{title: "Honda - 1200 Gold Wing", id: "38"},{title: "Honda - 125", id: "39"},{title: "Honda - 1500 Gold Wing", id: "40"},{title: "Honda - 750 Magna", id: "41"},{title: "Honda - Biz 100", id: "42"},{title: "Honda - Biz 125", id: "43"},{title: "Honda - C 100 Biz", id: "44"},{title: "Honda - C 100 Dream", id: "45"},{title: "Honda - CB 1000 - Big One", id: "46"},{title: "Honda - CB 1000R", id: "47"},{title: "Honda - CB 1300 F Super Four", id: "48"},{title: "Honda - CB 300R", id: "49"},{title: "Honda - CB 350K", id: "50"},{title: "Honda - CB 360", id: "51"},{title: "Honda - CB 400", id: "52"},{title: "Honda - CB 400 II", id: "53"},{title: "Honda - CB 450", id: "54"},{title: "Honda - CB 450 E", id: "55"},{title: "Honda - CB 50", id: "56"},{title: "Honda - CB 500", id: "57"},{title: "Honda - CB 500 F", id: "58"},{title: "Honda - CB 500 Four", id: "59"},{title: "Honda - CB 500 X", id: "60"},{title: "Honda - CB 550 Four", id: "61"},{title: "Honda - CB 600F Hornet", id: "62"},{title: "Honda - CB 650 F", id: "63"},{title: "Honda - CB 750 Four", id: "64"},{title: "Honda - CB 750 KZ", id: "65"},{title: "Honda - CB 750K", id: "66"},{title: "Honda - CB 900F Bold'or", id: "67"},{title: "Honda - CB 900F Hornet", id: "68"},{title: "Honda - CB Twister", id: "69"},{title: "Honda - CBF 125", id: "70"},{title: "Honda - CBR 1000F", id: "71"},{title: "Honda - CBR 1000RR", id: "72"},{title: "Honda - CBR 1000RR Fireblade", id: "73"},{title: "Honda - CBR 125", id: "74"},{title: "Honda - CBR 250R", id: "75"},{title: "Honda - CBR 450", id: "76"},{title: "Honda - CBR 500R", id: "77"},{title: "Honda - CBR 600F", id: "78"},{title: "Honda - CBR 600RR", id: "79"},{title: "Honda - CBR 650F", id: "80"},{title: "Honda - CBR 65F", id: "81"},{title: "Honda - CBR 900RR", id: "82"},{title: "Honda - CBR 900RR Fireblade", id: "83"},{title: "Honda - CBR 929RR", id: "84"},{title: "Honda - CBR 954RR Fireblade", id: "85"},{title: "Honda - CBX 1050", id: "86"},{title: "Honda - CBX 150 Aero", id: "87"},{title: "Honda - CBX 200 Strada", id: "88"},{title: "Honda - CBX 250 Twister", id: "89"},{title: "Honda - CBX 750 Four", id: "90"},{title: "Honda - CBX 750 Four Indy", id: "91"},{title: "Honda - CBX 750R", id: "92"},{title: "Honda - CG 125", id: "93"},{title: "Honda - CG 125 Fan", id: "94"},{title: "Honda - CG 125 Titan", id: "95"},{title: "Honda - CG 150", id: "96"},{title: "Honda - CG 150 Fan", id: "97"},{title: "Honda - CG 150 JOB", id: "98"},{title: "Honda - CG 160 Fan", id: "99"},{title: "Honda - CH 125R Spacy", id: "100"},{title: "Honda - CR 125", id: "101"},{title: "Honda - CR 250", id: "102"},{title: "Honda - CR 80", id: "103"},{title: "Honda - CRF 1000L African Twin", id: "104"},{title: "Honda - CRF 110F", id: "105"},{title: "Honda - CRF 150F", id: "106"},{title: "Honda - CRF 150R", id: "107"},{title: "Honda - CRF 230F", id: "108"},{title: "Honda - CRF 250L", id: "109"},{title: "Honda - CRF 250R", id: "110"},{title: "Honda - CRF 250X", id: "111"},{title: "Honda - CRF 50F", id: "112"},{title: "Honda - CTX 700N ABS", id: "113"},{title: "Honda - CX 500VT", id: "114"},{title: "Honda - Fury", id: "115"},{title: "Honda - GL 1000 Gold Wing", id: "116"},{title: "Honda - Helix 250", id: "117"},{title: "Honda - Interceptor V-Four", id: "118"},{title: "Honda - Lead 110", id: "119"},{title: "Honda - NC 700X", id: "120"},{title: "Honda - NC 750X", id: "121"},{title: "Honda - NX 150", id: "122"},{title: "Honda - NX 200", id: "123"},{title: "Honda - NX 350 Sahara", id: "124"},{title: "Honda - NX 400i Falcon", id: "125"},{title: "Honda - NX 650 Dominator", id: "126"},{title: "Honda - NX4 Falcon", id: "127"},{title: "Honda - NXR 125 Bros", id: "128"},{title: "Honda - NXR 150 Bros", id: "129"},{title: "Honda - NXR 160 Bros", id: "130"},{title: "Honda - PCX", id: "131"},{title: "Honda - POP 100", id: "132"},{title: "Honda - POP 110i", id: "133"},{title: "Honda - SBR 500R", id: "134"},{title: "Honda - SH 300i", id: "135"},{title: "Honda - Shadow 1100", id: "136"},{title: "Honda - Shadow 600C VT", id: "137"},{title: "Honda - Shadow 750", id: "138"},{title: "Honda - ST 1100 Pan European", id: "139"},{title: "Honda - ST 1300 Pan European", id: "140"},{title: "Honda - ST 70", id: "141"},{title: "Honda - Super Hawk 1000", id: "142"},{title: "Honda - TRX 350 Fourtrax 4X2", id: "143"},{title: "Honda - TRX 350 Fourtrax 4X4", id: "144"},{title: "Honda - TRX 420 Fourtrax 4X2", id: "145"},{title: "Honda - TRX 420 Fourtrax 4X4", id: "146"},{title: "Honda - TRX 700XX Sportrax", id: "147"},{title: "Honda - TRX 850", id: "148"},{title: "Honda - Turuna 125", id: "149"},{title: "Honda - Valkyrie 1500", id: "150"},{title: "Honda - Valkyrie 1800", id: "151"},{title: "Honda - Valkyrie GL 1500CF", id: "152"},{title: "Honda - Valkyrie Rune", id: "153"},{title: "Honda - VF1000F Interceptor", id: "154"},{title: "Honda - VF700F Interceptor", id: "155"},{title: "Honda - VF750C Magna", id: "156"},{title: "Honda - VF750F Interceptor", id: "157"},{title: "Honda - VFR 1200F", id: "158"},{title: "Honda - VFR 1200X", id: "159"},{title: "Honda - VFR 400R", id: "160"},{title: "Honda - VT 1300 CR", id: "161"},{title: "Honda - VTR 1000", id: "162"},{title: "Honda - VTR 250", id: "163"},{title: "Honda - VTX 1300", id: "164"},{title: "Honda - VTX 1800C", id: "165"},{title: "Honda - Way 125", id: "166"},{title: "Honda - XL 1000V Varadero", id: "167"},{title: "Honda - XL 125", id: "168"},{title: "Honda - XL 250R", id: "169"},{title: "Honda - XL 600V Transalp", id: "170"},{title: "Honda - XL 700V Transalp", id: "171"},{title: "Honda - XLR 125", id: "172"},{title: "Honda - XLX 250R", id: "173"},{title: "Honda - XLX 350R", id: "174"},{title: "Honda - XR 100", id: "175"},{title: "Honda - XR 200R", id: "176"},{title: "Honda - XR 250 Tornado", id: "177"},{title: "Honda - XR 250R", id: "178"},{title: "Honda - XR 400R", id: "179"},{title: "Honda - XR 650", id: "180"},{title: "Honda - XRE 300", id: "181"},{title: "Honda - XRV 750 Africa Twin", id: "182"},
			{title: 'Kasinski - Comet 250', id: '183'},{title: 'Kasinski - Comet 150', id: '184'},{title: 'Kasinski - Comet 650R', id: '185'},{title: 'Kasinski - Comet GT 250', id: '186'},{title: 'Kasinski - Comet GT 650', id: '187'},{title: 'Kasinski - Comet GT-R', id: '188'},{title: 'Kasinski - Comet Phase 2', id: '189'},{title: 'Kasinski - Cruise 125', id: '190'},{title: 'Kasinski - Cruiser II 125 Classic', id: '191'},{title: 'Kasinski - CRZ 150', id: '192'},{title: 'Kasinski - Ero Plus 125', id: '193'},{title: 'Kasinski - Flash 150', id: '194'},{title: 'Kasinski - GF 125 Speed', id: '195'},{title: 'Kasinski - Mirage 150', id: '196'},{title: 'Kasinski - Mirage 250', id: '197'},{title: 'Kasinski - Mirage 650', id: '198'},{title: 'Kasinski - Prima 150', id: '199'},{title: 'Kasinski - Prima 50', id: '200'},{title: 'Kasinski - Prima 500', id: '201'},{title: 'Kasinski - Prima Electra', id: '202'},{title: 'Kasinski - Prima Rally 50', id: '203'},{title: 'Kasinski - Seta 125', id: '204'},{title: 'Kasinski - Seta 150', id: '205'},{title: 'Kasinski - Soft 50', id: '206'},{title: 'Kasinski - Super CAB 100', id: '207'},{title: 'Kasinski - Super CAB 50', id: '208'},{title: 'Kasinski - Win 110', id: '209'},{title: 'Kasinski - Win Elektra', id: '210'},
			{title: 'Kawasaki - Concours', id:"211"},{title: 'Kawasaki - D Tracker X', id:"212"},{title: 'Kawasaki - ER 5', id:"213"},{title: 'Kawasaki - ER 6n', id:"214"},{title: 'Kawasaki - KX', id:"215"},{title: 'Kawasaki - KZ', id:"216"},{title: 'Kawasaki - Magik 125', id:"217"},{title: 'Kawasaki - Ninja', id:"218"},{title: 'Kawasaki - Ninja 250R', id:"219"},{title: 'Kawasaki - Ninja 300', id:"220"},{title: 'Kawasaki - Versys', id:"221"},{title: 'Kawasaki - Voyager', id:"222"},{title: 'Kawasaki - Vulcan', id:"223"},{title: 'Kawasaki - Z 1000', id:"224"},{title: 'Kawasaki - Z 300', id:"225"},{title: 'Kawasaki - Z 750', id:"226"},{title: 'Kawasaki - Z 800', id:"227"},{title: 'Kawasaki - ZX', id:"228"},{title: 'Kawasaki - ZX10R', id:"229"},{title: 'Kawasaki - ZX-14', id:"230"},
			{title: 'Lambretta - Lambreta',id:'231'},
			{title: 'Monark - Mobilete Monark', id: '232'},
			{title: 'Sundown - Akros 90cc', id: '233'},{title: 'Sundown - Akros 50cc', id: '234'},{title: 'Sundown - Fifty 50 (n.serie)', id: '235'},{title: 'Sundown - Fifty Summer 50 (Scooter)', id: '236'},{title: 'Sundown - Future', id: '237'},{title: 'Sundown - Hunter', id: '238'},{title: 'Sundown - Max', id: '239'},{title: 'Sundown - Max Se Trimoto', id: '240'},{title: 'Sundown - Stx', id: '241'},{title: 'Sundown - Vblade', id: '242'},{title: 'Sundown - Web', id: '243'},
			{title: "Suzuki - Address 50", id: "244"},{title: "Suzuki - Address 100", id: "245"},{title: "Suzuki - AG 100", id: "246"},{title: "Suzuki - AN125 Burgman", id: "247"},{title: "Suzuki - AN650 Burgman", id: "248"},{title: "Suzuki - Bandit 1200S", id: "249"},{title: "Suzuki - Bandit 1250", id: "250"},{title: "Suzuki - Bandit 600S", id: "251"},{title: "Suzuki - Bandit 650", id: "252"},{title: "Suzuki - Bandit N1200", id: "253"},{title: "Suzuki - Bandit N1250", id: "254"},{title: "Suzuki - Bandit N600", id: "255"},{title: "Suzuki - B-King", id: "256"},{title: "Suzuki - Boulevard C1500", id: "257"},{title: "Suzuki - Boulevard M109R", id: "258"},{title: "Suzuki - Boulevard M1500", id: "259"},{title: "Suzuki - Boulevard M1800", id: "260"},{title: "Suzuki - Boulevard M800", id: "261"},{title: "Suzuki - Burgman 125 Automática", id: "262"},{title: "Suzuki - Burgman 400", id: "263"},{title: "Suzuki - Burgman 650", id: "264"},{title: "Suzuki - Burgman i", id: "265"},{title: "Suzuki - DL 1000 V Strom", id: "266"},{title: "Suzuki - DL 650 V Strom", id: "267"},{title: "Suzuki - DR 350", id: "268"},{title: "Suzuki - DR 650 R", id: "269"},{title: "Suzuki - DR 800 S", id: "270"},{title: "Suzuki - DR-Z 400E", id: "271"},{title: "Suzuki - Freewind XF 650", id: "272"},{title: "Suzuki - Gladius", id: "273"},{title: "Suzuki - GS120", id: "274"},{title: "Suzuki - GS500E", id: "275"},{title: "Suzuki - GSR 125", id: "276"},{title: "Suzuki - GSR 150i", id: "277"},{title: "Suzuki - GSR 750", id: "278"},{title: "Suzuki - GSX 1100 F", id: "279"},{title: "Suzuki - GSX 1250 FA", id: "280"},{title: "Suzuki - GSX 1300 B-King", id: "281"},{title: "Suzuki - GSX 1300R Hayabusa", id: "282"},{title: "Suzuki - GSX 650 F", id: "283"},{title: "Suzuki - GSX 750 F", id: "284"},{title: "Suzuki - GSX-R1000", id: "285"},{title: "Suzuki - GSX-R1100 W", id: "286"},{title: "Suzuki - GSX-R600", id: "287"},{title: "Suzuki - GSX-R750", id: "288"},{title: "Suzuki - GT 550", id: "289"},{title: "Suzuki - GT 750", id: "290"},{title: "Suzuki - Inazuma", id: "291"},{title: "Suzuki - Intruder 125", id: "292"},{title: "Suzuki - Intruder 250", id: "293"},{title: "Suzuki - Intruder VS 1400 GLP", id: "294"},{title: "Suzuki - Intruder VS 800 GL", id: "295"},{title: "Suzuki - Katana 125", id: "296"},{title: "Suzuki - LC 1500 Intruder", id: "297"},{title: "Suzuki - Lets II 50", id: "298"},{title: "Suzuki - LS 650 Savage", id: "299"},{title: "Suzuki - Marauder 800", id: "300"},{title: "Suzuki - RF 600 R", id: "301"},{title: "Suzuki - RF 900 R", id: "302"},{title: "Suzuki - RM 125", id: "303"},{title: "Suzuki - RM 250", id: "304"},{title: "Suzuki - RM 80", id: "305"},{title: "Suzuki - RMX 250", id: "306"},{title: "Suzuki - RM-Z 250", id: "307"},{title: "Suzuki - RM-Z 450", id: "308"},{title: "Suzuki - TL 10000 S", id: "309"},{title: "Suzuki - TN 125", id: "310"},{title: "Suzuki - V-Strom 1000", id: "311"},{title: "Suzuki - V-strom 650 XT", id: "312"},{title: "Suzuki - VX 800", id: "313"},{title: "Suzuki - Yes 125", id: "314"},
			{title: "Triumph - Triumph", id: "315"},
			{title: "Yamaha - BWS 50", id:"316"},{title: "Yamaha - Axis 90", id:"317"},{title: "Yamaha - Crypton 100", id:"318"},{title: "Yamaha - Drag Star 1100", id:"319"},{title: "Yamaha - Drag Star 650", id:"320"},{title: "Yamaha - DT 180", id:"321"},{title: "Yamaha - DT 200", id:"322"},{title: "Yamaha - Factor 150", id:"323"},{title: "Yamaha - Factor YBR 125", id:"324"},{title: "Yamaha - Fazer 150", id:"325"},{title: "Yamaha - Fazer 250", id:"326"},{title: "Yamaha - Fazer 600", id:"327"},{title: "Yamaha - FJR 1300", id:"328"},{title: "Yamaha - FZ1", id:"329"},{title: "Yamaha - FZ6N", id:"330"},{title: "Yamaha - FZ8", id:"331"},{title: "Yamaha - FZR 1000", id:"332"},{title: "Yamaha - FZR 600", id:"333"},{title: "Yamaha - Jog 50", id:"334"},{title: "Yamaha - Jog Teen 50", id:"335"},{title: "Yamaha - Midnight Warrior", id:"336"},{title: "Yamaha - MT-01", id:"337"},{title: "Yamaha - MT-03", id:"338"},{title: "Yamaha - MT-07", id:"339"},{title: "Yamaha - MT-09", id:"340"},{title: "Yamaha - NEO AT 115", id:"341"},{title: "Yamaha - Raptor 660R", id:"342"},{title: "Yamaha - RD 125", id:"343"},{title: "Yamaha - RD 135", id:"344"},{title: "Yamaha - RD 350", id:"345"},{title: "Yamaha - RD 75", id:"346"},{title: "Yamaha - RDZ 125", id:"347"},{title: "Yamaha - RDZ 135", id:"348"},{title: "Yamaha - Road Star 1600", id:"349"},{title: "Yamaha - Royal Star 1300", id:"350"},{title: "Yamaha - RX 125", id:"351"},{title: "Yamaha - RX 125", id:"352"},{title: "Yamaha - RX 180", id:"353"},{title: "Yamaha - T115 Crypton", id:"354"},{title: "Yamaha - TDM 225", id:"355"},{title: "Yamaha - TDM 850", id:"356"},{title: "Yamaha - TDM 900", id:"357"},{title: "Yamaha - TDR 180", id:"358"},{title: "Yamaha - TMAX", id:"359"},{title: "Yamaha - TT 125", id:"360"},{title: "Yamaha - TT-R 125", id:"361"},{title: "Yamaha - TT-R 230", id:"362"},{title: "Yamaha - TX 650", id:"363"},{title: "Yamaha - V MAX", id:"364"},{title: "Yamaha - V MAX 1200", id:"365"},{title: "Yamaha - V MAX 1800", id:"366"},{title: "Yamaha - V Star 1100", id:"367"},{title: "Yamaha - V Star 650", id:"368"},{title: "Yamaha - Virago 250", id:"369"},{title: "Yamaha - Virago 400", id:"370"},{title: "Yamaha - WR 200", id:"371"},{title: "Yamaha - WR 250", id:"372"},{title: "Yamaha - WR 426F", id:"373"},{title: "Yamaha - WR 450", id:"374"},{title: "Yamaha - XJ 600S Diversion", id:"375"},{title: "Yamaha - XJ6 F", id:"376"},{title: "Yamaha - XJR 1200", id:"377"},{title: "Yamaha - XJR 1300", id:"378"},{title: "Yamaha - XT 225", id:"379"},{title: "Yamaha - XT 600 E", id:"380"},{title: "Yamaha - XT 660 R", id:"381"},{title: "Yamaha - XT1200Z", id:"382"},{title: "Yamaha - XTZ 125", id:"383"},{title: "Yamaha - XTZ 250 LANDER", id:"384"},{title: "Yamaha - XTZ 250 TENERE", id:"385"},{title: "Yamaha - XTZ 750S TENERE", id:"386"},{title: "Yamaha - XTZ Crosser 150", id:"387"},{title: "Yamaha - XV 1100 Virago", id:"388"},{title: "Yamaha - XV 250S Virago", id:"389"},{title: "Yamaha - XV 535S Virago", id:"390"},{title: "Yamaha - XV Virago 750", id:"391"},{title: "Yamaha - XVS 950 A Midnight Star", id:"392"},{title: "Yamaha - YBR 125", id:"393"},{title: "Yamaha - YBR 125 Factor", id:"394"},{title: "Yamaha - YFM 250R", id:"395"},{title: "Yamaha - YFM 350R", id:"396"},{title: "Yamaha - YFM 700R", id:"397"},{title: "Yamaha - YFM 80R", id:"398"},{title: "Yamaha - YFS 200 Blaster", id:"399"},{title: "Yamaha - YFZ 450", id:"400"},{title: "Yamaha - YP 250 Majesty", id:"401"},{title: "Yamaha - YZ 125", id:"402"},{title: "Yamaha - YZ 250", id:"403"},{title: "Yamaha - YZ 450F", id:"404"},{title: "Yamaha - YZ 80", id:"405"},{title: "Yamaha - YZ 85 LW", id:"406"},{title: "Yamaha - YZF 1000 Thunderace", id:"407"},{title: "Yamaha - YZF 450", id:"408"},{title: "Yamaha - YZF 600 Thundercat", id:"409"},{title: "Yamaha - YZF 750", id:"410"},{title: "Yamaha - YZF-R1", id:"411"},{title: "Yamaha - YZF-R125", id:"412"},{title: "Yamaha - YZF-R3", id:"413"},{title: "Yamaha - YZF-R6", id:"414"}
		];

		var cities = [
			{id : "50308", title:"São Paulo", uf : "SP"},{id : "04557", title:"Rio de Janeiro", uf : "RJ"},{id : "00108", title:"Brasília", uf : "DF"},{id : "27408", title:"Salvador", uf : "BA"},{id : "04400", title:"Fortaleza", uf : "CE"},{id : "06200", title:"Belo Horizonte", uf : "MG"},{id : "02603", title:"Manaus", uf : "AM"},{id : "06902", title:"Curitiba", uf : "PR"},{id : "11606", title:"Recife", uf : "PE"},{id : "14902", title:"Porto Alegre", uf : "RS"},{id : "08707", title:"Goiânia", uf : "GO"},{id : "01402", title:"Belém", uf : "PA"},{id : "18800", title:"Guarulhos", uf : "SP"},{id : "09502", title:"Campinas", uf : "SP"},{id : "11300", title:"São Luís", uf : "MA"},{id : "04904", title:"São Gonçalo", uf : "RJ"},{id : "04302", title:"Maceió", uf : "AL"},{id : "01702", title:"Duque de Caxias", uf : "RJ"},{id : "08102", title:"Natal", uf : "RN"},{id : "02704", title:"Campo Grande", uf : "MS"},{id : "11001", title:"Teresina", uf : "PI"},{id : "48708", title:"São Bernardo do Campo", uf : "SP"},{id : "07507", title:"João Pessoa", uf : "PB"},{id : "03500", title:"Nova Iguaçu", uf : "RJ"},{id : "47809", title:"Santo André", uf : "SP"},{id : "34401", title:"Osasco", uf : "SP"},{id : "49904", title:"São José dos Campos", uf : "SP"},{id : "07901", title:"Jaboatão dos Guararapes", uf : "PE"},{id : "43402", title:"Ribeirão Preto", uf : "SP"},{id : "70206", title:"Uberlândia", uf : "MG"},{id : "18601", title:"Contagem", uf : "MG"},{id : "52205", title:"Sorocaba", uf : "SP"},{id : "00308", title:"Aracaju", uf : "SE"},{id : "10800", title:"Feira de Santana", uf : "BA"},{id : "03403", title:"Cuiabá", uf : "MT"},{id : "09102", title:"Joinville", uf : "SC"},{id : "36702", title:"Juiz de Fora", uf : "MG"},{id : "13700", title:"Londrina", uf : "PR"},{id : "01405", title:"Aparecida de Goiânia", uf : "GO"},{id : "00205", title:"Porto Velho", uf : "RO"},{id : "00800", title:"Ananindeua", uf : "PA"},{id : "03302", title:"Niterói", uf : "RJ"},{id : "00456", title:"Belford Roxo", uf : "RJ"},{id : "05002", title:"Serra", uf : "ES"},{id : "01009", title:"Campos dos Goytacazes", uf : "RJ"},{id : "05200", title:"Vila Velha", uf : "ES"},{id : "05108", title:"Caxias do Sul", uf : "ES"},{id : "05407", title:"Florianópolis", uf : "SC"},{id : "00303", title:"Macapá", uf : "AP"},{id : "05109", title:"São João de Meriti", uf : "RJ"},{id : "29401", title:"Mauá", uf : "SP"},{id : "49805", title:"São José do Rio Preto", uf : "SP"},{id : "48500", title:"Santos", uf : "SP"},{id : "30607", title:"Mogi das Cruzes", uf : "SP"},{id : "06705", title:"Betim", uf : "MG"},{id : "13801", title:"Diadema", uf : "SP"},{id : "04009", title:"Campina Grande", uf : "PB"},{id : "25904", title:"Jundiaí", uf : "SP"},{id : "15200", title:"Maringá", uf : "PR"},{id : "43302", title:"Montes Claros", uf : "MG"},{id : "10609", title:"Carapicuíba", uf : "SP"},{id : "38709", title:"Piracicaba", uf : "SP"},{id : "09600", title:"Olinda", uf : "PE"},{id : "01308", title:"Cariacica", uf : "ES"},{id : "00401", title:"Rio Branco", uf : "AC"},{id : "01108", title:"Anápolis", uf : "GO"},{id : "06003", title:"Bauru", uf : "SP"},{id : "05309", title:"Vitória", uf : "ES"},{id : "03709", title:"Caucaia", uf : "CE"},{id : "51009", title:"São Vicente", uf : "SP"},{id : "23107", title:"Itaquaquecetuba", uf : "SP"},{id : "04106", title:"Caruaru", uf : "PE"},{id : "33307", title:"Vitória da Conquista", uf : "BA"},{id : "16200", title:"Franca", uf : "SP"},{id : "02404", title:"Blumenau", uf : "SC"},{id : "14407", title:"Pelotas", uf : "RS"},{id : "04606", title:"Canoas", uf : "RS"},{id : "19905", title:"Ponta Grossa", uf : "PR"},{id : "11101", title:"Petrolina", uf : "PE"},{id : "00100", title:"Boa Vista", uf : "RR"},{id : "54606", title:"Ribeirão das Neves", uf : "MG"},{id : "10707", title:"Paulista", uf : "PE"},{id : "70107", title:"Uberaba", uf : "MG"},{id : "04808", title:"Cascavel", uf : "PR"},{id : "18701", title:"Guarujá", uf : "SP"},{id : "54102", title:"Taubaté", uf : "SP"},{id : "41000", title:"Praia Grande", uf : "SP"},{id : "25506", title:"São José dos Pinhais", uf : "PR"},{id : "26902", title:"Limeira", uf : "SP"},{id : "03906", title:"Petrópolis", uf : "RJ"},{id : "06807", title:"Santarém", uf : "PA"},{id : "05701", title:"Camaçari", uf : "BA"},{id : "08003", title:"Mossoró", uf : "RN"},{id : "52502", title:"Suzano", uf : "SP"},{id : "21000", title:"Palmas", uf : "TO"},{id : "27701", title:"Governador Valadares", uf : "MG"},{id : "16907", title:"Santa Maria", uf : "RS"},{id : "52809", title:"Taboão da Serra", uf : "SP"},{id : "09209", title:"Gravataí", uf : "RS"},{id : "08402", title:"Várzea Grande", uf : "MT"},{id : "52403", title:"Sumaré", uf : "SP"},{id : "07304", title:"Juazeiro do Norte", uf : "CE"},{id : "04208", title:"Marabá", uf : "PA"},{id : "05708", title:"Barueri", uf : "SP"},{id : "15004", title:"Embu das Artes", uf : "SP"},{id : "08304", title:"Foz do Iguaçu", uf : "PR"},{id : "06305", title:"Volta Redonda", uf : "RJ"},{id : "31307", title:"Ipatinga", uf : "MG"},{id : "05302", title:"Imperatriz", uf : "MA"},{id : "23002", title:"Viamão", uf : "RS"},{id : "13409", title:"Novo Hamburgo", uf : "RS"},{id : "03251", title:"Parnamirim", uf : "RN"},{id : "48906", title:"São Carlos", uf : "SP"},{id : "02403", title:"Macaé", uf : "RJ"},{id : "02502", title:"Magé", uf : "RJ"},{id : "16602", title:"São José", uf : "SC"},{id : "20509", title:"Indaiatuba", uf : "SP"},{id : "05805", title:"Colombo", uf : "PR"},{id : "67202", title:"Sete Lagoas", uf : "MG"},{id : "13009", title:"Cotia", uf : "SP"},{id : "29005", title:"Marília", uf : "SP"},{id : "22306", title:"Divinópolis", uf : "MG"},{id : "00300", title:"Arapiraca", uf : "AL"},{id : "01608", title:"Americana", uf : "SP"},{id : "01900", title:"Itaboraí", uf : "RJ"},{id : "18705", title:"São Leopoldo", uf : "RS"},{id : "03208", title:"Araraquara", uf : "SP"},{id : "24402", title:"Jacareí", uf : "SP"},{id : "22505", title:"Itapevi", uf : "SP"},{id : "41406", title:"Presidente Prudente", uf : "SP"},{id : "07650", title:"Maracanaú", uf : "CE"},{id : "14802", title:"Itabuna", uf : "BA"},{id : "18407", title:"Juazeiro", uf : "BA"},{id : "19071", title:"Hortolândia", uf : "SP"},{id : "07602", title:"Rondonópolis", uf : "MT"},{id : "57807", title:"Santa Luzia", uf : "MG"},{id : "03702", title:"Dourados", uf : "MS"},{id : "00704", title:"Cabo Frio", uf : "RJ"},{id : "18805", title:"Rio Verde", uf : "GO"},{id : "01209", title:"Cachoeiro de Itapemirim", uf : "ES"},{id : "04202", title:"Chapecó", uf : "SC"},{id : "04608", title:"Criciúma", uf : "SC"},{id : "08203", title:"Itajaí", uf : "SC"},{id : "15602", title:"Rio Grande", uf : "RS"},{id : "00604", title:"Alvorada", uf : "RS"},{id : "12908", title:"Sobral", uf : "CE"},{id : "02902", title:"Cabo de Santo Agostinho", uf : "PE"},{id : "43907", title:"Rio Claro", uf : "SP"},{id : "14100", title:"Passo Fundo", uf : "RS"},{id : "12501", title:"Luziânia", uf : "GO"},{id : "05536", title:"Parauapebas", uf : "PA"},{id : "19207", title:"Lauro de Freitas", uf : "BA"},{id : "02804", title:"Araçatuba", uf : "SP"},{id : "02400", title:"Castanhal", uf : "PA"},{id : "00100", title:"Angra dos Reis", uf : "RJ"},{id : "00258", title:"Águas Lindas de Goiás", uf : "GO"},{id : "45803", title:"Santa Bárbara d'Oeste", uf : "SP"},{id : "15707", title:"Ferraz de Vasconcelos", uf : "SP"},{id : "03401", title:"Nova Friburgo", uf : "RJ"},{id : "00407", title:"Barra Mansa", uf : "RJ"},{id : "04805", title:"Nossa Senhora do Socorro", uf : "SE"},{id : "09401", title:"Guarapuava", uf : "PR"},{id : "13606", title:"Ilhéus", uf : "BA"},{id : "11201", title:"São José de Ribamar", uf : "MA"},{id : "29806", title:"Ibirité", uf : "MG"},{id : "05802", title:"Teresópolis", uf : "RJ"},{id : "02109", title:"Araguaína", uf : "TO"},{id : "02858", title:"Mesquita", uf : "RJ"},{id : "16309", title:"Francisco Morato", uf : "SP"},{id : "22208", title:"Itapecerica da Serra", uf : "SP"},{id : "23909", title:"Itu", uf : "SP"},{id : "08906", title:"Jaraguá do Sul", uf : "SC"},{id : "03205", title:"Linhares", uf : "ES"},{id : "12209", title:"Timon", uf : "MA"},{id : "51800", title:"Poços de Caldas", uf : "MG"},{id : "07605", title:"Bragança Paulista", uf : "SP"},{id : "38006", title:"Pindamonhangaba", uf : "SP"},{id : "03000", title:"Caxias", uf : "MA"},{id : "18001", title:"Jequié", uf : "BA"},{id : "11900", title:"Palhoça", uf : "SC"},{id : "31350", title:"Teixeira de Freitas", uf : "BA"},{id : "48807", title:"São Caetano do Sul", uf : "SP"},{id : "09300", title:"Lages", uf : "SC"},{id : "22307", title:"Itapetininga", uf : "SP"},{id : "03203", title:"Nilópolis", uf : "RJ"},{id : "21858", title:"Valparaíso de Goiás", uf : "GO"},{id : "03201", title:"Barreiras", uf : "BA"},{id : "00702", title:"Alagoinhas", uf : "BA"},{id : "03454", title:"Camaragibe", uf : "PE"},{id : "00107", title:"Abaetetuba", uf : "PA"},{id : "18204", title:"Paranaguá", uf : "PR"},{id : "07702", title:"Parnaíba", uf : "PI"},{id : "02700", title:"Maricá", uf : "RJ"},{id : "48004", title:"Patos de Minas", uf : "MG"},{id : "30706", title:"Mogi Guaçu", uf : "SP"},{id : "16408", title:"Franco da Rocha", uf : "SP"},{id : "25303", title:"Porto Seguro", uf : "BA"},{id : "52501", title:"Pouso Alegre", uf : "MG"},{id : "25300", title:"Jaú", uf : "SP"},{id : "04144", title:"Queimados", uf : "RJ"},{id : "68606", title:"Teófilo Otoni", uf : "MG"},{id : "07506", title:"Botucatu", uf : "SP"},{id : "20008", title:"Sapucaia do Sul", uf : "RS"},{id : "04107", title:"Atibaia", uf : "SP"},{id : "06002", title:"Garanhuns", uf : "PE"},{id : "16407", title:"Vitória de Santo Antão", uf : "PE"},{id : "04524", title:"Rio das Ostras", uf : "RJ"},{id : "13703", title:"Santa Rita", uf : "PB"},{id : "05608", title:"Barbacena", uf : "MG"},{id : "01804", title:"Araucária", uf : "PR"},{id : "56700", title:"Sabará", uf : "MG"},{id : "30709", title:"Simões Filho", uf : "BA"},{id : "27700", title:"Toledo", uf : "PR"},{id : "70701", title:"Varginha", uf : "MG"},{id : "07909", title:"Sinop", uf : "MT"},{id : "02103", title:"Cametá", uf : "PA"},{id : "02008", title:"Balneário Camboriú", uf : "SC"},{id : "01408", title:"Apucarana", uf : "PR"},{id : "00122", title:"Ji-Paraná", uf : "RO"},{id : "03307", title:"Araras", uf : "SP"},{id : "22400", title:"Uruguaiana", uf : "RS"},{id : "04202", title:"Crato", uf : "CE"},{id : "47304", title:"Santana de Parnaíba", uf : "SP"},{id : "19152", title:"Pinhais", uf : "PR"},{id : "13504", title:"Cubatão", uf : "SP"},{id : "16808", title:"Santa Cruz do Sul", uf : "RS"},{id : "03103", title:"Cachoeirinha", uf : "RS"},{id : "04906", title:"São Mateus", uf : "ES"},{id : "18304", title:"Conselheiro Lafaiete", uf : "MG"},{id : "06405", title:"Itapipoca", uf : "CE"},{id : "04201", title:"Resende", uf : "RJ"},{id : "02909", title:"Brusque", uf : "SC"},{id : "04204", title:"Campo Largo", uf : "PR"},{id : "04422", title:"Marituba", uf : "PA"},{id : "07700", title:"Maranguape", uf : "CE"},{id : "00209", title:"Araruama", uf : "RJ"},{id : "01506", title:"Colatina", uf : "ES"},{id : "01709", title:"Bragança", uf : "PA"},{id : "56206", title:"Valinhos", uf : "SP"},{id : "01602", title:"Bagé", uf : "RS"},{id : "02405", title:"Guarapari", uf : "ES"},{id : "51702", title:"Sertãozinho", uf : "SP"},{id : "43303", title:"Ribeirão Pires", uf : "SP"},{id : "02007", title:"Itaguaí", uf : "RJ"},{id : "07300", title:"São Félix do Xingu", uf : "PA"},{id : "03307", title:"Codó", uf : "MA"},{id : "71204", title:"Vespasiano", uf : "MG"},{id : "25003", title:"Jandira", uf : "SP"},{id : "11102", title:"Catanduva", uf : "SP"},{id : "05500", title:"Barretos", uf : "SP"},{id : "24009", title:"Paulo Afonso", uf : "BA"},{id : "07506", title:"Paço do Lumiar", uf : "MA"},{id : "18404", title:"Guaratinguetá", uf : "SP"},{id : "06508", title:"Birigui", uf : "SP"},{id : "21403", title:"Trindade", uf : "GO"},{id : "57006", title:"Votorantim", uf : "SP"},{id : "01303", title:"Barcarena", uf : "PA"},{id : "31703", title:"Itabira", uf : "MG"},{id : "54003", title:"Tatuí", uf : "SP"},{id : "56503", title:"Várzea Paulista", uf : "SP"},{id : "01507", title:"Arapongas", uf : "PR"},{id : "03504", title:"Araguari", uf : "MG"},{id : "08305", title:"Três Lagoas", uf : "MS"},{id : "45209", title:"Salto", uf : "SP"},{id : "10500", title:"Caraguatatuba", uf : "SP"},{id : "23404", title:"Itatiba", uf : "SP"},{id : "39806", title:"Poá", uf : "SP"},{id : "10727", title:"Eunápolis", uf : "BA"},{id : "02105", title:"Bento Gonçalves", uf : "RS"},{id : "00400", title:"Almirante Tamandaré", uf : "PR"},{id : "08004", title:"Formosa", uf : "GO"},{id : "06804", title:"Igarassu", uf : "PE"},{id : "00600", title:"Santana", uf : "AP"},{id : "47907", title:"Passos", uf : "MG"},{id : "03403", title:"Parintins", uf : "AM"},{id : "69901", title:"Ubá", uf : "MG"},{id : "13701", title:"São Lourenço da Mata", uf : "PE"},{id : "34708", title:"Ourinhos", uf : "SP"},{id : "00055", title:"Açailândia", uf : "MA"},{id : "00602", title:"Altamira", uf : "PA"},{id : "19401", title:"Coronel Fabriciano", uf : "MG"},{id : "03207", title:"Corumbá", uf : "MS"},{id : "28104", title:"Umuarama", uf : "PR"},{id : "08100", title:"Tucuruí", uf : "PA"},{id : "05502", title:"Paragominas", uf : "PA"},{id : "15231", title:"Novo Gama", uf : "GO"},{id : "43906", title:"Muriaé", uf : "MG"},{id : "10808", title:"Patos", uf : "PB"},{id : "19509", title:"Piraquara", uf : "PR"},{id : "00023", title:"Ariquemes", uf : "RO"},{id : "03701", title:"Cambé", uf : "PR"},{id : "34202", title:"Ituiutaba", uf : "MG"},{id : "18707", title:"Tubarão", uf : "SC"},{id : "12505", title:"Santa Cruz do Capibaribe", uf : "PE"},{id : "04007", title:"Araxá", uf : "MG"},{id : "03500", title:"Lagarto", uf : "SE"},{id : "01202", title:"Bacabal", uf : "MA"},{id : "20454", title:"Senador Canedo", uf : "GO"},{id : "07005", title:"Erechim", uf : "RS"},{id : "28703", title:"Santo Antônio de Jesus", uf : "BA"},{id : "04008", title:"Assis", uf : "SP"},{id : "05506", title:"Iguatu", uf : "CE"},{id : "11503", title:"Itumbiara", uf : "GO"},{id : "38203", title:"Lavras", uf : "MG"},{id : "05109", title:"Catalão", uf : "GO"},{id : "02270", title:"Japeri", uf : "RJ"},{id : "07953", title:"Tailândia", uf : "PA"},{id : "26704", title:"Leme", uf : "SP"},{id : "36505", title:"Paulínia", uf : "SP"},{id : "12005", title:"São Gonçalo do Amarante", uf : "RN"},{id : "02205", title:"Itaperuna", uf : "RJ"},{id : "09308", title:"Guaíba", uf : "RS"},{id : "01808", title:"Breves", uf : "PA"},{id : "00054", title:"Abreu e Lima", uf : "PE"},{id : "01902", title:"Itacoatiara", uf : "AM"},{id : "03606", title:"Itaituba", uf : "PA"},{id : "05208", title:"São Pedro da Aldeia", uf : "RJ"},{id : "32903", title:"Valença", uf : "BA"},{id : "22109", title:"Itanhaém", uf : "SP"},{id : "00308", title:"Barra do Piraí", uf : "RJ"},{id : "11909", title:"Jataí", uf : "GO"},{id : "09007", title:"Caieiras", uf : "SP"},{id : "07958", title:"Tangará da Serra", uf : "MT"},{id : "00607", title:"Aracruz", uf : "ES"},{id : "01807", title:"Bayeux", uf : "PB"},{id : "32404", title:"Itajubá", uf : "MG"},{id : "02504", title:"Manacapuru", uf : "AM"},{id : "02908", title:"Itabaiana", uf : "SE"},{id : "28502", title:"Mairiporã", uf : "SP"},{id : "00304", title:"Vilhena", uf : "RO"},{id : "07652", title:"Fazenda Rio Grande", uf : "PR"},{id : "04303", title:"Campo Mourão", uf : "PR"},{id : "01400", title:"Balsas", uf : "MA"},{id : "22406", title:"Itapeva", uf : "SP"},{id : "07208", title:"Ipojuca", uf : "PE"},{id : "45208", title:"Nova Serrana", uf : "MG"},{id : "33808", title:"Itaúna", uf : "MG"},{id : "57105", title:"Votuporanga", uf : "SP"},{id : "47105", title:"Pará de Minas", uf : "MG"},{id : "30805", title:"Mogi Mirim", uf : "SP"},{id : "08504", title:"Caçapava", uf : "SP"},{id : "47006", title:"Paracatu", uf : "MG"},{id : "26256", title:"Sarandi", uf : "PR"},{id : "13404", title:"Caratinga", uf : "MG"},{id : "44805", title:"Nova Lima", uf : "MG"},{id : "02504", title:"Cáceres", uf : "MT"},{id : "62500", title:"São João del Rei", uf : "MG"},{id : "49102", title:"São João da Boa Vista", uf : "SP"},{id : "48103", title:"Patrocínio", uf : "MG"},{id : "06501", title:"Candeias", uf : "BA"},{id : "04503", title:"Avaré", uf : "SP"},{id : "68705", title:"Timóteo", uf : "MG"},{id : "17609", title:"Planaltina", uf : "GO"},{id : "06606", title:"Ponta Porã", uf : "MS"},{id : "06701", title:"São Cristóvão", uf : "SE"},{id : "00049", title:"Cacoal", uf : "RO"},{id : "39409", title:"Manhuaçu", uf : "MG"},{id : "27207", title:"Lorena", uf : "SP"},{id : "50605", title:"São Roque", uf : "SP"},{id : "08403", title:"Francisco Beltrão", uf : "PR"},{id : "55406", title:"Ubatuba", uf : "SP"},{id : "18402", title:"Paranavaí", uf : "PR"},{id : "01608", title:"Barra do Corda", uf : "MA"},{id : "11709", title:"Guanambi", uf : "BA"},{id : "11306", title:"Quixadá", uf : "CE"},{id : "03004", title:"Cachoeira do Sul", uf : "RS"},{id : "03901", title:"Arujá", uf : "SP"},{id : "13909", title:"Serra Talhada", uf : "PE"},{id : "09500", title:"Gurupi", uf : "TO"},{id : "50704", title:"São Sebastião", uf : "SP"},{id : "07708", title:"Esteio", uf : "RS"},{id : "01209", title:"Coari", uf : "AM"},{id : "09908", title:"Santa Inês", uf : "MA"},{id : "05505", title:"Saquarema", uf : "RJ"},{id : "05554", title:"Seropédica", uf : "RJ"},{id : "70404", title:"Unaí", uf : "MG"},{id : "17508", title:"Jacobina", uf : "BA"},{id : "01102", title:"Araripina", uf : "PE"},{id : "04508", title:"Caldas Novas", uf : "GO"},{id : "10207", title:"Ijuí", uf : "RS"},{id : "07925", title:"Sorriso", uf : "MT"},{id : "17103", title:"Sant'Ana do Livramento", uf : "RS"},{id : "30501", title:"Serrinha", uf : "BA"},{id : "06408", title:"Gravatá", uf : "PE"},{id : "00203", title:"Cruzeiro do Sul", uf : "AC"},{id : "08603", title:"Pinheiro", uf : "MA"},{id : "15802", title:"São Bento do Sul", uf : "SC"},{id : "04007", title:"Carpina", uf : "PE"},{id : "29302", title:"Matão", uf : "SP"},{id : "19553", title:"Luís Eduardo Magalhães", uf : "BA"},{id : "09601", title:"Campo Limpo Paulista", uf : "SP"},{id : "06138", title:"Redenção", uf : "PA"},{id : "09706", title:"Pacatuba", uf : "CE"},{id : "13405", title:"Cruzeiro", uf : "SP"},{id : "30105", title:"Senhor do Bonfim", uf : "BA"},{id : "19901", title:"Sapiranga", uf : "RS"},{id : "18501", title:"Pato Branco", uf : "PR"},{id : "10057", title:"Dias d'Ávila", uf : "BA"},{id : "20904", title:"Curvelo", uf : "MG"},{id : "06008", title:"Três Rios", uf : "RJ"},{id : "01607", title:"Alfenas", uf : "MG"},{id : "07104", title:"Macaíba", uf : "RN"},{id : "11403", title:"Lajeado", uf : "RS"},{id : "36207", title:"João Monlevade", uf : "MG"},{id : "17509", title:"Santo Ângelo", uf : "RS"},{id : "06200", title:"Goiana", uf : "PE"},{id : "04703", title:"Moju", uf : "PA"},{id : "05508", title:"Cianorte", uf : "PR"},{id : "69307", title:"Três Corações", uf : "MG"},{id : "01000", title:"Aquiraz", uf : "CE"},{id : "03208", title:"Chapadinha", uf : "MA"},{id : "00406", title:"Alegrete", uf : "RS"},{id : "11405", title:"Quixeramobim", uf : "CE"},{id : "71303", title:"Viçosa", uf : "MG"},{id : "06102", title:"Bebedouro", uf : "SP"},{id : "02800", title:"Canindé", uf : "CE"},{id : "19709", title:"Ibiúna", uf : "SP"},{id : "16401", title:"Itapetinga", uf : "BA"},{id : "08007", title:"Picos", uf : "PI"},{id : "03204", title:"Camboriú", uf : "SC"},{id : "03006", title:"Caçador", uf : "SC"},{id : "27108", title:"Lins", uf : "SP"},{id : "27106", title:"Telêmaco Borba", uf : "PR"},{id : "24303", title:"Jaboticabal", uf : "SP"},{id : "11801", title:"Russas", uf : "CE"},{id : "01706", title:"Belo Jardim", uf : "PE"},{id : "07701", title:"Rio Largo", uf : "AL"},{id : "05101", title:"Viana", uf : "ES"},{id : "39301", title:"Pirassununga", uf : "SP"},{id : "11306", title:"Navegantes", uf : "SC"},{id : "15300", title:"Cataguases", uf : "MG"},{id : "46107", title:"Ouro Preto", uf : "MG"},{id : "04103", title:"Crateús", uf : "CE"},{id : "13401", title:"Tianguá", uf : "CE"},{id : "06307", title:"Palmeira dos Índios", uf : "AL"},{id : "06107", title:"Valença", uf : "RJ"},{id : "14604", title:"Irecê", uf : "BA"},{id : "56701", title:"Vinhedo", uf : "SP"},{id : "22604", title:"Itapira", uf : "SP"},{id : "02600", title:"Ceará-Mirim", uf : "RN"},{id : "04301", title:"Concórdia", uf : "SC"},{id : "01109", title:"Aracati", uf : "CE"},{id : "01201", title:"Arcoverde", uf : "PE"},{id : "06006", title:"Campo Formoso", uf : "BA"},{id : "09205", title:"Cajamar", uf : "SP"},{id : "07202", title:"Casa Nova", uf : "BA"},{id : "17202", title:"Santa Rosa", uf : "RS"},{id : "05064", title:"Novo Repartimento", uf : "PA"},{id : "10005", title:"Santa Luzia", uf : "MA"},{id : "35100", title:"Janaúba", uf : "MG"},{id : "02325", title:"Buriticupu", uf : "MA"},{id : "04907", title:"Castro", uf : "PR"},{id : "19753", title:"Santo Antônio do Descoberto", uf : "GO"},{id : "01905", title:"Amparo", uf : "SP"},{id : "03501", title:"Cascavel", uf : "CE"},{id : "22608", title:"Venâncio Aires", uf : "RS"},{id : "03904", title:"Bom Jesus da Lapa", uf : "BA"},{id : "05304", title:"Oriximiná", uf : "PA"},{id : "64704", title:"São Sebastião do Paraíso", uf : "MG"},{id : "09607", title:"Pacajus", uf : "CE"},{id : "04605", title:"Brumado", uf : "BA"},{id : "16201", title:"Sousa", uf : "PB"},{id : "07906", title:"Farroupilha", uf : "RS"},{id : "06708", title:"Santana do Araguaia", uf : "PA"},{id : "30508", title:"Mococa", uf : "SP"},{id : "02106", title:"Estância", uf : "SE"},{id : "04800", title:"Grajaú", uf : "MA"},{id : "35209", title:"Januária", uf : "MG"},{id : "15509", title:"Fernandópolis", uf : "SP"},{id : "09907", title:"Ouricuri", uf : "PE"},{id : "26109", title:"Formiga", uf : "MG"},{id : "14805", title:"Rio do Sul", uf : "SC"},{id : "24104", title:"Esmeraldas", uf : "MG"},{id : "12803", title:"Cosmópolis", uf : "SP"},{id : "08408", title:"Conceição do Coité", uf : "BA"},{id : "05202", title:"Escada", uf : "PE"},{id : "15103", title:"Embu-Guaçu", uf : "SP"},{id : "02006", title:"Caicó", uf : "RN"},{id : "06500", title:"Santa Izabel do Pará", uf : "PA"},{id : "05407", title:"Icó", uf : "CE"},{id : "15601", title:"Itamaraju", uf : "BA"},{id : "05401", title:"Itapecuru Mirim", uf : "MA"},{id : "03209", title:"Cabedelo", uf : "PB"},{id : "02202", title:"Capanema", uf : "PA"},{id : "26803", title:"Lençóis Paulista", uf : "SP"},{id : "08608", title:"Goianésia", uf : "GO"},{id : "14703", title:"Itaberaba", uf : "BA"},{id : "10905", title:"Pesqueira", uf : "PE"},{id : "01406", title:"Araranguá", uf : "SC"},{id : "09301", title:"União dos Palmares", uf : "AL"},{id : "05902", title:"Gaspar", uf : "SC"},{id : "03509", title:"Camaquã", uf : "RS"},{id : "37602", title:"Peruíbe", uf : "SP"},{id : "55000", title:"Tupã", uf : "SP"},{id : "02305", title:"Biguaçu", uf : "SC"},{id : "05497", title:"Cidade Ocidental", uf : "GO"},{id : "22509", title:"Vacaria", uf : "RS"},{id : "07502", title:"Indaial", uf : "SC"},{id : "05233", title:"Horizonte", uf : "CE"},{id : "03905", title:"Campo Bom", uf : "RS"}
		];
		
		// Message Templates 
		var robot = (txt) => `
			<div class="robot">
				<div class="avatar">
					<img src=${avatar.robot} alt="Avatar Boot" class="icon img-circle img-responsive">
				</div>
				<div class="msg">
					<p>${txt}</p>
				</div>
			</div>`;

		var user = (txt) => `
			<div class="user">
				<div class="avatar">
					<img src=${avatar.user} alt="Avatar Cliente" class="icon img-circle img-responsive">
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

		// Scroll Box on new message
		conversationBox.bind("DOMSubtreeModified",function(){
			conversationBox.scrollTop(99999999999);
		});

		// Active Send Button
		writeInput.on('input', function(){
			var input = $(this).val();
			if(input != ""){
				btnSend.addClass('active');
			}else{
				btnSend.removeClass('active');
			}
		});

		// Send on Enter Key
		writeInput.bind("enterKey",function(e){
			btnSend.click();
		});
		writeInput.keyup(function(e){
		    if(e.keyCode == 13)
		        $(this).trigger("enterKey");
		});

		// Send Event
		btnSend.on('click',function(){
			var next = talk.bootConversation[writeInput.attr('data-id')];

			if(next["condition"] == 'notEmpty'){
				if(!writeInput.val()){
					if(!$(".tag strong").html()){
						conversationBox.append(user("Você precisa inserir um valor"));
					}else{
						writeInput.val($(".tag strong").html());
					}
				}

				conversationBox.append(user(writeInput.val()));
				next.dialog = template(next.dialog, {i1: writeInput.val()});	

				saveItem(next.depName, writeInput.val());

				//console.log(saveItem(next.depName, writeInput.val()));
			
				//if (typeof(Storage) !== "undefined") {
				// localStorage.setItem(next.depName, writeInput.val()){
				//} else {
				    // Sorry! No Web Storage support..
				//}
				//writeInput.unbind();
				
				writeInput.attr('placeholder', 'Escreva sua mensagem');
				writeInput.val("");
				writeInput.prop('disabled', true);
				$('.field_autocomplete').hide();
				writeInput.show();

				setTimeout(function(){
					conversationBox.append(robot(next.dialog));
				},3000);
				if(next.nextDialog)
					bootTalk(next.nextDialog);
			}
			if(next["condition"] == 'cities'){
				conversationBox.append(user(writeInput.val()));
				next.dialog = template(next.dialog, {i1: writeInput.val()});

				next.dialog = next.dialog.split("|");
				next.nextDialog = next.nextDialog.split("|");

				saveItem(next.depName, writeInput.val());

				for(var i = 0; i < cities.length; i++)
				{
				  if(cities[i].title == writeInput.val())
				  {
				    saveItem('state', cities[i].uf);
				  }
				}


				writeInput.attr('placeholder', 'Escreva sua mensagem');
				writeInput.val("");
				writeInput.prop('disabled', true);
				$('.field_autocomplete').hide();
				writeInput.show();

				var state_option = 0;
				if($('.tag').html()){
					state_option = 1;				
				}
				
				setTimeout(function(){
					conversationBox.append(robot(next.dialog[state_option]));
				},3000);
				bootTalk(next.nextDialog[state_option]);
			}
		});

		var btnClick = (e) => {
			e = $(e);
			var next = talk.bootConversation[e.attr('data-id')];
			
			saveItem(next.depName, e[0].innerHTML);
			conversationBox.append(user(e[0].innerHTML));
			next.dialog = template(next.dialog, {i1: writeInput.val()});

			next.dialog = next.dialog.split("|");
			next.nextDialog = next.nextDialog.split("|");
			
			$("#multiple").remove();
			writeInput.show();
			btnSend.show();
			
			setTimeout(function(){
				conversationBox.append(robot(next.dialog[e.attr('data-option')]));
			},3000);
			
			if(next.nextDialog[e.attr('data-option')])
				bootTalk(next.nextDialog[e.attr('data-option')]);
		}
	
		// Set Inputs types
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
					writeInput.attr('placeholder', v.depPlaceholder);
					writeInput.focus();
				},this.setTime-3000);
			},
			multiple : function(v,i){
				setTimeout(function(){
					writeInput.hide();
					btnSend.hide();
					var btns = "";
					let options = v.condition.split("|");
					options.forEach(function (item, index, array) {
  						btns += `<button type="button" class="btn-multiple btn btn-primary" data-option=${index} data-id=${i}>${item}</button>`
					});
					$('.write').prepend(
						`<div id = "multiple">
							<label>Escolha uma alternativa: </label>
							<div class="btn-group">
								${btns}
							</div>
						</div>`
					);
					$('.btn-multiple').on('click',function(){
						btnClick(this);
					});
				},this.setTime-3000);
			},
			select : function(v,i){
				setTimeout(function(){
					writeInput.hide();
					writeInput.attr('data-id',i);
					$('.write').prepend(
						`<input id="select-input${i}" type="text" placeholder="${v.depPlaceholder}" data-id="${i}">`
					);
					let sele = $('#select-input'+i);
					sele.void_autocomplete({
						selections: 1,
						list: eval(v.depList),
						onItemSelect: function(item){
							console.log(item.title);
							writeInput.val(item.title);
						}
					});
					sele.on('keyup', function (e) {
						console.log($(this).val());
						writeInput.val($(this).val());
					});
				},this.setTime-3000);
			}
		}

		// Loops of conversations
		var bootTalk = ($index = 25, $i_time = 1) => {
			$index = parseInt($index);
			if( $index > 0 ) $i_time = 2;

			for (var i in talk.bootConversation){

				if(i >= $index){

					writeInput.prop('disabled', true);
					let v = talk.bootConversation[i];
					display.setTime = $i_time*3000;
					
					if(v.dep){
						status.show();
						if(v.depType == "input")
							display.input(v,i);				
						if(v.depType == "multiple")
							display.multiple(v,i);
						if(v.depType == "select")
							display.select(v,i);
						break;
					}else{					
						status.show();
						display.dialog(v,i);
						$index = v.nextDialog;
					}
					$i_time++;
				}
			}

			setTimeout(function(){
				status.hide();
			},($i_time-1)*3000);
		};

		bootTalk();	
})(jQuery);