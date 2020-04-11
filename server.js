// usei o express para criar e configurar meu servidor
const express = require("express")
const server = express()

const db = require("./db")

/*const ideas = [
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
]*/

//Configurar arquivos estaticos (css, js, imagens)
server.use(express.static("public"))

//Habilitar uso do req.body
server.use(express.urlencoded({ extended: true }))

//Configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
	express: server,
	noCache: true, // boolean
})

// Criei uma rota /
// e capturo o pedido do cliente para responder
server.get("/", function(req, res) {

	db.all(`SELECT * FROM ideas `, function(err, rows){
		if (err) {
			console.log(err)
			return res.send("Erro no banco de dados")
		}

		const reversedIdeas = [...rows].reverse()	

		let lastIdeas = []
		for (let idea of reversedIdeas) {
			if (lastIdeas.length < 3) {
				lastIdeas.push(idea)
			}
		}

		return res.render("index.html", { ideas: lastIdeas })
	})
	
})

server.get("/ideias", function(req, res) {

	db.all(`SELECT * FROM ideas `, function(err, rows){
		if (err) {
			console.log(err)
			return res.send("Erro no banco de dados")
		}

		const reversedIdeas = [...rows].reverse()

		return res.render("ideias.html", { ideas: reversedIdeas })

	})
})

server.post("/", function(req, res) {
	//Inserir dados na tabela
	const query = `
		INSERT INTO ideas(
			image,
			title,
			category,
			description,
			link	
		) VALUES(?,?,?,?,?);
	`

	const values =  [
		req.body.image,
		req.body.title,
		req.body.category,
		req.body.description,
		req.body.link
	]


	db.run(query, values, function(err) {
		if (err) {
			console.log(err)
			return res.send("Erro no banco de dados")
		}

		return res.redirect("/ideias")
	}) 
})

// liguei meu servidor na porat 3000
server.listen(3000)