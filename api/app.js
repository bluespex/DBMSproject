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
    password : 'prpa2772928',
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

app.put('/buy', (req,res) => {
	const {user_id, menu_id} = req.body;
	// let temp;
	// db('menu').where({
	// 	id : menu_id
	// }).select('price')
	// .then((x,temp) => {temp=x; })
	// .catch(err => {console.log('error')})
	// console.log(temp);
	db('cart').where({
		user_id : user_id,
		menu_id : menu_id
	}).returning('quantity')
	.increment({
		quantity : 1
	}).then(cnt => res.json(cnt))
	.catch(
		db('cart')
		.returning('menu_id')
		.insert({
			user_id : user_id,
			menu_id : menu_id,
			quantity : 1 
		}).then(id => res.json(id))
		.catch(err => res.json(err))
	// 	err => {
	// console.log(1);
	// }
	)
})

app.post('/cart', (req,res) => {
	const {user_id} = req.body;
	db('cart')
	  .join('menu', 'cart.menu_id', '=', 'menu.id')
	  .select('name','quantity','price','id')
	  .where({user_id : user_id})
		.then(data => {
			res.json(data);
		})
		.catch(err => res.json("error occured"))

})

// app.post('/sum', (req,res) => {
// 	const {user_id} = req.body;
// 	// console.log(1);
// 	db('cart')
// 	  .join('menu', 'cart.menu_id', '=', 'menu.id')
// 	  .sum('quantity')
// 	  .where({user_id : user_id})
// 		.then(data => {
// 			res.json(data[0].sum);
// 		})
// 		.catch(err => res.json("error occured"))

// })

module.exports = app;
