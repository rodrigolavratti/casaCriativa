// usei o express para criar e configurar meu servidor
const express = require("express")
const server = express()

const ideas = [
	{
		img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
		title: "Cursos de Programação",
		category: "Estudo",
		description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
		url: "https://www.google.com/"
	},
	{
		img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
		title: "Exercícios",
		category: "Saúde",
		description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
		url: "https://www.google.com/"
	},
	{
		img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
		title: "Meditação",
		category: "Mentalidade",
		description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
		url: "https://www.google.com/"
	},
	{
		img: "https://image.flaticon.com/icons/svg/2737/2737421.svg",
		title: "Karaokê",
		category: "Diversão em Família",
		description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
		url: "https://www.google.com/"
	},
	{
		img: "https://image.flaticon.com/icons/svg/2781/2781045.svg",
		title: "Negocios",
		category: "Empresas",
		description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
		url: "https://www.google.com/"
	},
	{
		img: "https://image.flaticon.com/icons/svg/2781/2781031.svg",
		title: "Cartões",
		category: "Investimentos",
		description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
		url: "https://www.google.com/"
	},
]

//Configurar arquivos estaticos (css, js, imagens)
server.use(express.static("public"))

//Configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
	express: server,
	noCache: true, // boolean
})

// Criei uma rota
// e capturo o pedido do cliente para responder
server.get("/", function(req, res) {

	const reversedIdeas = [...ideas].reverse()

	let lastIdeas = []
	for (let idea of reversedIdeas) {
		if (lastIdeas.length < 3) {
			lastIdeas.push(idea)
		}
	}
	
	return res.render("index.html", { ideas: lastIdeas })
})

server.get("/ideias", function(req, res) {

	const reversedIdeas = [...ideas].reverse()

	return res.render("ideias.html", { ideas: reversedIdeas })
})

// liguei meu servidor na porat 3000
server.listen(3000)