var express = require("express");
var router = express.Router();

const database = {
	users: [
		{
			id: '1',
			name: 'piyush',
			email: 'piyush@gmail.com',
			password: 'apple',
			entries: 0,
			joined: new Date()
		},
		{
			id: '2',
			name: 'bhanu',
			email: 'bhanu@gmail.com',
			password: 'banana',
			entries: 0,
			joined: new Date()
		}

	]
}

router.post("/signin", function(req, res, next) {
	// if(database.users[0].email === req.body.email){
	// 	res.send(database.users);
	// }
	res.send("signedin");
});

module.exports = router;