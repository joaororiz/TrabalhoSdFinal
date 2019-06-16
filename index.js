const restify = require('restify');

const server = restify.createServer({
	name: 'myapp',
	version: '1.0.0'
});

var knex = require('knex')({

	client: 'mysql',
	connection: {
		host :'u0zbt18wwjva9e0v.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
		user : 'om3r87khmo6oatd4',
		password : 'r79k0rvzqwjyvwml',
		database : 'qvhui4h3kx15c6el'
	}
});


server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

const cool = require('cool-ascii-faces')
const path = require('path')
const PORT = process.env.PORT || 5000


server.listen(PORT, function(){
	console.log('%s listening at %s', server.name, server.url);
});


//rotas rest

server.get('/positions',(req, res, next) => {

	knex('vaga').then((dados) =>{
		res.send(dados);
	}, next)
});

server.get('/positions/:id', (req, res, next) => {

	const { id } = req.params;

	knex('vaga')
		.where('id', id)
		.first() //pegar distinto
		.then((dados) =>{
			if(!dados) return res.send(new errs.BadRequestError('Nehum registro encontrado'));
			res.send(dados);
		}, next)
});

server.get('/positions/:description/:full_time', (req, res, next) => {

	const { description } = req.params;
	const { full_time } = req.params;

	knex('vaga')
		.where('description', description, 'full_time', full_time)
		.first() //pegar distinto
		.then((dados) =>{
			if(!dados) return res.send(new errs.BadRequestError('Nehum registro encontrado'));
			res.send(dados);
		}, next)
});

server.get('/positions/:description/:full_time/:location', (req, res, next) => {

	const { description } = req.params;
	const { full_time } = req.params;
	const { location } = req.params;

	knex('vaga')
		.where('description', description, 'full_time',full_time, 'location', location)
		.first() //pegar distinto
		.then((dados) =>{
			if(!dados) return res.send(new errs.BadRequestError('Nehum registro encontrado'));
			res.send(dados);
		}, next)
});
