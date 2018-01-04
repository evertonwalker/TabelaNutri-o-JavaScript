 		function verificarImc(imc, tag){

		 if(imc == "Dados do paciente são inválidos."){
			tag.classList.add("paciente-invalido");
			}

 		}	

 		//Função feita pra retorna o imc.
		function imc(peso, altura){

			if(peso < 0 || peso > 1000 || altura < 0 || altura > 3.00){
				return "Dados do paciente são inválidos.";
			} 
			
			//Função toFixed, recebe o número de parâmetros que deveram ser exibidos após a virgula.
			return (peso/ (altura * altura)).toFixed(2);
		}


		//O DOM, ou document object Model carrega todo conteúdo da página, caso queira ver é só usar um
		console.log(document);

		//Através desse objeto temos uma serie de métodos que podem ser utilizados para manipulação
		//da página, por exemplo aqui capturamos todos conteúdos da primeira tag H1, dentro do DOM

		//é valido lembrar que ele seleciona apenas o primeiro, por isso é valido usar names,classes ou ids para as tags.
		//var teste = document.querySelector("h1");
		var titulo = document.querySelector(".titulo");

		//Guardamos isso em uma variável e com o atributo textContent, iremos manipular o seu conteúdo
		titulo.textContent = "Everton Walker";

		//Capturando todos dados de quem possui classs com nome Paciente e guardando em uma variável
		
		var pacientes = document.querySelectorAll(".paciente");

		pacientes = document.querySelectorAll(".paciente");
	
		//executo um loop para cada paciente encontrado, cálculo seu IMC E EXIBO na tela.
		for(var i = 0; i < pacientes.length; i++){

		//Setando na coluna IMC, o valor retornado pela função IMC, onde pede a altura e o peso do paciente.
		pacientes[i].querySelector(".info-imc").textContent = imc(pacientes[i].querySelector(".info-peso").textContent, 
		pacientes[i].querySelector(".info-altura").textContent);
		
		verificarImc(pacientes[i].querySelector(".info-imc").textContent, pacientes[i]);

		}
		//Se os dados forem inválidos com o método style.color ele altera todo estilo do paciente, a fim de facilitar a visualização
		//pacientes[i].style.color = "red";
		//Mas caso todo site deveriar ser alterado então deveríamos colocar isson o CSS e assim a alteração seria genêrica
		// feito isso basta apenas adicionar a classe aos pacientes com erros.	

		//Criando um evento click, sempre que o título for criado a função será executada.
		//primeiro parâmetro ação, segundo a função.
		/*titulo.addEventListener("click", function(){
			console.log("eae");
		});

		titulo.addEventListener("click", mostraMensagem);

		function mostraMensagem(){
			alert("Hello Evento");
		}

		caso queira pegar o  valor do input, seleciona a query e depois utilizier o .value para obter por exemplo:
			var nome = document.querySelector("#nome-input");
			nome.value;
		 */


		 //Selecionando o botão do dom que será Clicado.
		 var button = document.querySelector("#adicionar-paciente");

		 //Adicionando um evento ao botão.
		 button.addEventListener("click", function(){
		 	
		 	//retirando o comportamento padrão de recarregar a página ao subimeter um formulário.
		 	event.preventDefault();

		 	//Capturando o form;
		 	var form = document.querySelector("#form-adiciona");

		 	//Capturando cada valor digitado nos inputs.
			var nome = form.nome.value;
		 	var gordura = form.gordura.value;
		 	var altura = form.altura.value;
		 	var peso = form.peso.value;
		 	
		 	//Criando as tags que serão utilizadas para adicionar o paciente: TR e TD'S
		 	var pacienteTr = document.createElement("tr");
		 	var nomeTd = document.createElement("td");
		 	var gorduraTd = document.createElement("td");
		 	var alturaTd = document.createElement("td");
		 	var pesoTd = document.createElement("td");
		 	var imcTd = document.createElement("td");

		 	//Passando o valor obtido pelos inputs para cada TD.
		 	nomeTd.textContent = nome;
		 	gorduraTd.textContent = gordura;
		 	alturaTd.textContent = altura;
		 	pesoTd.textContent = peso;
		 	imcTd.textContent = imc(peso, altura);

		 	verificarImc(imcTd.textContent, pacienteTr);

		 	//Adicionando todas TD ao seu pai TR.
		 	pacienteTr.appendChild(nomeTd);
		    pacienteTr.appendChild(pesoTd);
		    pacienteTr.appendChild(alturaTd);
		    pacienteTr.appendChild(gorduraTd);
		    pacienteTr.appendChild(imcTd);
		 	
		 	//Capturando a Tabela e adicionando a TR com o paciente criado.
		 	var tabela = document.querySelector("#tabela-pacientes");
		 	tabela.appendChild(pacienteTr);
 

		 });

		 



		