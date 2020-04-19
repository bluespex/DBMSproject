var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
var logger = require('morgan');
const knex = require('knex');



const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'piyush1999',
    database : 'dbms'
  }
});

const bodyParser = require('body-parser');
const cors = require('cors');

const saltRounds = 10;

var app = express();




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());


app.get('/', (req,res) => {
	res.send(database.users);
})

app.post('/signin', (req,res) => {

	db.select('email','hash').from('login')
	.where('email','=',req.body.email)
	.then(data => {
		const isValid = bcrypt.compareSync(req.body.password,data[0].hash);
		if(isValid){
			return db.select('*').from('users')
			.where('email','=',req.body.email)
			.then(user => {
				res.json(user[0])
			})
			.catch(err => res.status(400).json('unable to get user'))
			
		} else {
			res.status(400).json("credentials not correct");
		}
	})
	.catch(err => res.status(400).json("credentials not correct"))
})

app.post('/register', (req,res) => {
	const {email,name,password} = req.body;

	const hash = bcrypt.hashSync(password, saltRounds);
	console.log(hash);
		db.transaction(trx => {
			trx.insert({
				email: email,
				hash: hash
			})
			.into('login')
			.returning('email')
			.then(loginEmail => {
				return trx('users')
					.returning('*')
					.insert({
						email : loginEmail[0],
						name: name,
						joined: new Date()
					})
					.then(user => {
						res.json(user[0]);
					})
			})
			.then(trx.commit)
			.catch(trx.rollback)
		})
		
		.catch(err => res.status(400).json(err))
})

app.get('/menu', (req,res) => {
	db.select('*')
		.from('menu')
		.then(menu => res.json(menu))
		.catch(err => res.status(400).json(err))
})

module.exports = app;
