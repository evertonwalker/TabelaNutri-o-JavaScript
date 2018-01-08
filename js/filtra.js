var campoFiltro = document.querySelector("#filtrar-tabela");

//O evento input é disparado sempre que alguém digita algo naquele input.
campoFiltro.addEventListener("input", function(){

	//Seleciona os pacientes
	var pacientes = document.querySelectorAll(".paciente");

	  if(this.value.length > 0){
			for(var i = 0; i < pacientes.length; i ++){

			//2 parâmetros podem ser passado no constructor do objeto o primeiro é o que desejamos procurar
			// o segundo é referente as caracteristicas que serão buscadas então como queremos uma busca ignorando
			//case sensitive passaremos o: i.

			var expressao = new RegExp(this.value, "i");

			//Se ele não encontrar o nome do paciente ele adiciona a tag invisivel, caso encontre ele remove.
			if(!expressao.test(pacientes[i].querySelector(".info-nome").textContent)){
				pacientes[i].classList.add("invisivel");

			} else {
				pacientes[i].classList.remove("invisivel");
			}
		 }
			
		//Caso não exista nada digitando no input, ele simplesmente exibi todos os pacientes.			
		 } else {
		 	
		 	for(var i = 0; i< pacientes.length; i++){
		 		pacientes[i].classList.remove("invisivel");

		 	}
		 }

	

});