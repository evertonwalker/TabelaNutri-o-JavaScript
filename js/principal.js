 		//Capturando o form;
 		var form = document.querySelector("#form-adiciona");

		//Capturando o botão do dom que será Clicado.
		 var button = document.querySelector("#adicionar-paciente");

		//Capturando os pacientes para calcular seus imcs 
		var pacientes = document.querySelectorAll(".paciente");

		//executo um loop para cada paciente encontrado, cálculo seu IMC E EXIBO na tela.
		for(var i = 0; i < pacientes.length; i++){

		var pesoValido = validarPeso(pacientes[i].querySelector(".info-peso").textContent);
		var alturaValida = validarAltura(pacientes[i].querySelector(".info-altura").textContent);

			if(validarPeso && validarAltura){
				//Setando na coluna IMC, o valor retornado pela função IMC, onde pede a altura e o peso do paciente.
				pacientes[i].querySelector(".info-imc").textContent = imc(pacientes[i].querySelector(".info-peso").textContent, 
				pacientes[i].querySelector(".info-altura").textContent);
			} 

		}

		//método responsável por verificar o peso dos pacientes
 		function validarPeso(peso){
 			if(peso > 0 && peso <= 300){
 				return true;
 			} else {
 				return false;
 			}

 		}

 		//método responsável por verificar o Altura dos pacientes
 		function validarAltura(altura){
 			if(altura > 0 && altura < 3.00){
 				return true;
 			} else {
 				return false;
 			}
 		}

 		//método responsável por validações do paciente e retorna um array de erro caso encontre algo.
 		function validarPaciente(paciente){

 			var erros = [];

 			if(paciente.nome.length == 0 ){
 				erros.push("O nome não pode ser vazio");
 			}

 			if(paciente.gordura.length == 0){
 				erros.push("A gordura não pode ser vazia");
 			}

 			if(paciente.altura.length == 0){
 				erros.push("A altura não pode ser vazia")
 			}

 			if(paciente.peso.length == 0){
 				erros.push("O peso não pode ser vazio");
 			}

 			if(!validarAltura(paciente.altura)){
 				erros.push("Altura é inválida");
 			}

 			if(!validarPeso(paciente.peso)){
 				erros.push("Peso é inválido")
 			}

 			return erros;

 		}

 		//Função que marca os pacientes com risco de obesidade assim que inicia o sistema
 		function addMarcacaoInicialRisco(){

	 		for(var i = 0; i < this.pacientes.length; i++){
			 	if(pacientes[i].querySelector(".info-imc").textContent >= 25){
			 		pacientes[i].classList.add("paciente-invalido");
			 	}
		 	}
 		}

 		//Função igual, porém apenas para os novos pacientes que são adicionados.
		function addMarcacaoRisco(paciente, tr){	
 	
 			if(paciente.peso > 25){
			 	tr.classList.add("paciente-invalido");
 			}
		}

		//Método responsável por capturar os erros e pra cada erro adicionar em uma Li para ser apresentada
 		function exibirMensagemErros(erros){
 			
 			var ul = document.querySelector("#mensagens-erro");
 			ul.innerHTML = "";

 			erros.forEach((erro) => {

 				var li = document.createElement("li");
 				li.textContent = erro;
 				ul.appendChild(li);

 			});
 			
 		}


 		//Função feita pra retorna o imc.
		function imc(peso, altura){
			//Função toFixed, recebe o número de parâmetros que deveram ser exibidos após a virgula.
			return (peso/ (altura * altura)).toFixed(2);
		}

		//função que recebe os dados do formulário e converte em um paciente no formato JSON
		function obterPacienteFormulario(){
			
			var paciente = {
				
				nome : this.form.nome.value,
				altura: this.form.altura.value,
				peso: this.form.peso.value,
				gordura: this.form.gordura.value,
				imc: imc(this.form.peso.value, this.form.altura.value)
			}

			return paciente;
		}

		//Retorna uma TD, com o dado já inserido nela e uma classe caso você queira adicionar
		function montarTd(dado, classe){
			
			var td = document.createElement("td");
			td.textContent = dado;
			td.classList.add(classe);

			return td;

		}

		//função responsável por montar toda uma TR, colocar as TD's, passar os valores e retornar ela;
		function montarTr(paciente){

			var pacienteTr = document.createElement("tr");
			pacienteTr.classList.add(".paciente");

		 	//Adicionar Td's ao paciente TD. 
		 	pacienteTr.appendChild(montarTd(paciente.nome, "info-nome"));
		    pacienteTr.appendChild(montarTd(paciente.peso, "info-peso"));
		    pacienteTr.appendChild(montarTd(paciente.altura, "info-altura"));
		    pacienteTr.appendChild(montarTd(paciente.gordura, "info-gordura"));
		    pacienteTr.appendChild(montarTd(paciente.imc, "info-imc"));

		    return pacienteTr;

		}

		//método responsável por receber um paciente, selecionar a tabela
		//e adiciona-lo a mesma.
		function adicionarPacienteNaTela(paciente){

			//Capturando a Tabela;
			var tabela = document.querySelector("#tabela-pacientes");
			//Retornando uma TR toda preenchida;
		 	var pacienteTr = montarTr(paciente);
		 	//Adicionando a TR a Tabela.
		 	tabela.appendChild(pacienteTr);

		 	return pacienteTr

		}

		//Função que é chamada assim que o botão adicionar paciente é clicado.
		function adicionarPaciente(){

			//retirando o comportamento padrão de recarregar a página ao subimeter um formulário.
		 	event.preventDefault();

		 	//Retornando o paciente montando no formato JSON;
		 	var paciente = obterPacienteFormulario();

		 	//validações de erros.
		 	var erros = validarPaciente(paciente);

		 	//caso encontre erro exibe na tela e sai da função.
		 	if(erros.length > 0){
		 		exibirMensagemErros(erros);
		 		return;
		 	}	

		 	//adiciona paciente a tela
		 	adicionarPacienteNaTela(paciente);

		 	//limpa os erros
		 	var ulErros = document.querySelector("#mensagens-erro");
		 	ulErros.innerHTML = "";

 			//Limpando os dados do formulário:
 			form.reset();

 			//adiciona marcação caso o novo paciente esteja àcima do peso.
 			addMarcacaoRisco(paciente, adicionarPacienteNaTela(paciente));

 		}
	
 		addMarcacaoInicialRisco();

		 //Adicionando um evento ao botão.
		 button.addEventListener("click", adicionarPaciente);
	
		// ---------------->> O CÓDIGO DAQUI PRA BAIXO É NÍVEL de aprendizado <<----------

		 //O DOM, ou document object Model carrega todo conteúdo da página, caso queira ver é só usar um
		console.log(document);

		//Através desse objeto temos uma serie de métodos que podem ser utilizados para manipulação
		//da página, por exemplo aqui capturamos todos conteúdos da primeira tag H1, dentro do DOM

		//é valido lembrar que ele seleciona apenas o primeiro, por isso é valido usar names,classes ou ids para as tags.
		//var teste = document.querySelector("h1");
		var titulo = document.querySelector(".titulo");

		//Guardamos isso em uma variável e com o atributo textContent, iremos manipular o seu conteúdo
		titulo.textContent = "Everton Walker";		

			
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
