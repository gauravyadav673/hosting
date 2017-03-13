var express = require('express')
var app = express()
var mongoose = require('mongoose')
mongoose.connect("mongodb://gaurav:26january@ds021034.mlab.com:21034/gaurav_test");
var db = mongoose.connection;
db.once('open',function(){
	console.log('huh');
})
var loginSchema = mongoose.Schema({username:String,password:String})
var LogIn = mongoose.model('logIn',loginSchema)
app.set('view engine' , 'ejs');
var bodyParser = require('body-parser');

app.set('port',(process.env.PORT || 5000))

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.post('/register',function(req,res){
	var login = new LogIn({username:req.body.username,
							password:req.body.password
						});
	login.save(function(error,info){
		res.send(info)
	})
})

app.post('/login',function(req,res){
	LogIn.findOne({
		username:req.body.username,
		password:req.body.password
	},function(error,info){
		if(info)
			res.send("Logged In")
		else
			res.send("Wrong User")
	})
})

app.post('/reg',function(req,res){
	LogIn.findOne({
		username:req.body.username,
		password:req.body.password
	},function(error,info){
		if(info)
			res.send("Allready exists")
		else{	
			var login = new LogIn({username:req.body.username,
							password:req.body.password
						});
			login.save(function(error,info){
			res.send(info)
	})

		}
			
	})
		
		
})

app.listen(app.get('port'), function(){
	console.log('API is running on port', app.get('port'))
})
app.get('/admin',function(req,res){
	res.render('pop');
})