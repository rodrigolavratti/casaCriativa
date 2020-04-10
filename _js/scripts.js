function onOff(){
   document
      .querySelector("#modal")
      .classList
      .toggle("hide")

   /*O script abaixo é referente ao modal do arquivo ideias.html, ele preenche a tela toda sem deixar scroll*/   
   document
      .querySelector("body")
      .classList
      .toggle("hideScroll")

   /*O script abaixo serve para telas menores e a modal ficar vizivel e não fixa */
   document
      .querySelector("#modal")
      .classList
      .toggle("addScroll")
}
