var botaoBuscar = document.querySelector("#buscar-pacientes");

//Evento disparado ao click do botão
botaoBuscar.addEventListener("click", function(){

	//Objeto responsável por fazer as requisições XML
	var xhr = new XMLHttpRequest();

	//Span na tela, para ser usado caso encontre erro.
	var erroAjax = document.querySelector("#erro-ajax");

	 //atributo de configuração do objeto, passamos o método e a url.
	 xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes");			

	 		//Evento que existe caso seja carregado algo no xhr.
			xhr.addEventListener("load", function(){

				//verificamos o status da requisição, caso seja sucesso, adiciono os pacientes na tela.
				if(xhr.status == 200){

				erroAjax.classList.add("invisivel");
				var resposta = JSON.parse(xhr.responseText);

				resposta.forEach(function(paciente){
					adicionarPacienteNaTela(paciente);
				});

				//casso Erro eu exibo um erro genêrico e exibo o porque no console. 
				} else  {

					erroAjax.classList.remove("invisivel");
					console.log(xhr.status);
					console.log(xhr.responseText);

				}		
				 		
		});

	//Momento que envia
	xhr.send();

});
