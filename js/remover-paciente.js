var tabela = document.querySelector("table");

//Aplicamos aqui um evento chamando Event Bubbling, que sua análogia é a ideia de que, um filho ativa um evento e esse evento
//vai subindo até o pai, de forma que se uma TD ativar o evento => a Tr escuta = > a Tbody => Table e assim sucessivamente até chegar no body
//então Capturamos o targeto clicado e não removemos apenas ele mas seu Pai também, com o parâmetro parentNode ( nó pai).
tabela.addEventListener("dblclick", (event) => {

  if(event.target.tagName == "TD"){

		event.target.parentNode.classList.add("fadeOut");
		
		setTimeout(() => {
			event.target.parentNode.remove();
		}, 300);
	}
});

