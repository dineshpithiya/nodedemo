var app   = require('express')();
var http = require('http').Server(app);
var mysql = require('mysql');
var bodyParser = require("body-parser");

var fs = require('fs');
var new_location = '/demo';

const fileUpload = require('express-fileupload');
app.use(fileUpload());
var connection = mysql.createConnection(
{
		host     : 'localhost',
		user     : 'root',
		password : 'password',
		database : 'books',
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

	
app.get('/',function(req,res)
{
	var data = {
		"Data":""
	};
	data["Data"] = "Welcome to Book Store DEMO...";
	res.json(data);
});

app.get('/book',function(req,res)
{
	var data = {
		"error":1,
		"Books":""
	};
	
	connection.query("SELECT * from book",function(err, rows, fields)
	{
		if(rows.length != 0){
			data["error"] = 0;
			data["Books"] = rows;
			res.json(data);
		}else{
			data["Books"] = 'No books Found..';
			res.json(data);
		}
	});
});

app.post('/book',function(req,res)
{
	var Bookname = req.body.bookname;
	var Authorname = req.body.authorname;
	var Price = req.body.price;
	var data = {
		"error":1,
		"Books":""
	};
	res.json([{'name':1,'id':2}]);
	if(!!Bookname && !!Authorname && !!Price)
	{
		connection.query("INSERT INTO book VALUES('',?,?,?)",[Bookname,Authorname,Price],function(err, rows, fields){
			if(!!err){
				data["Books"] = "Error Adding data";
			}else{
				data["error"] = 0;
				data["Books"] = "Book Added Successfully";
			}
			res.json(data);
		});
	}
	else
	{
		data["Books"] = "Please provide all required data (i.e : Bookname, Authorname, Price)";
		res.json(data);
	}
});

app.put('/book',function(req,res)
{
	var Id = req.body.id;
	var Bookname = req.body.bookname;
	var Authorname = req.body.authorname;
	var Price = req.body.price;
	var data = {
		"error":1,
		"Books":""
	};
	
	if(!!Id && !!Bookname && !!Authorname && !!Price)
	{
		connection.query("UPDATE book SET BookName=?, AuthorName=?, Price=? WHERE id=?",[Bookname,Authorname,Price,Id],function(err, rows, fields){
			if(!!err){
				data["Books"] = "Error Updating data";
			}else{
				data["error"] = 0;
				data["Books"] = "Updated Book Successfully";
			}
			res.json(data);
		});
	}
	else
	{
		data["Books"] = "Please provide all required data (i.e : id, Bookname, Authorname, Price)";
		res.json(data);
	}
});

app.delete('/book',function(req,res)
{
	var Id = req.body.id;
	var data = {
		"error":1,
		"Books":""
	};
	if(!!Id)
	{
		connection.query("DELETE FROM book WHERE id=?",[Id],function(err, rows, fields)
		{
			if(!!err){
				data["Books"] = "Error deleting data";
			}else{
				data["error"] = 0;
				data["Books"] = "Delete Book Successfully";
			}
			res.json(data);
		});
	}
	else
	{
		data["Books"] = "Please provide all required data (i.e : id )";
		res.json(data);
	}
});

/*app.post('/upload', function(req, res) {
  console.log(req.files.foo); // the uploaded file object 
});*/
app.post('/upload', function(req, res) 
{
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
 	var path = process.cwd('/');
 	// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
    let sampleFile = req.files.sampleFile;
 
    //res.send(req.files.sampleFile);*/
	
    // Use the mv() method to place the file somewhere on your server 
    //if (!fs.existsSync('path')) fs.mkdirSync('newdinesh','7777', true);

    if (!fs.existsSync(path+'/track3'))
    {
        fs.mkdirSync(path+'/track3','777', true);
    }
    
    sampleFile.mv(path+'/track3/filename.jpg', function(err) 
	{
	    if (err)
	      return res.status(500).send(err);
	 
	    res.send('File uploaded!');
	});
  
});

http.listen(8080,function()
{
	console.log("Connected & Listen to port 8080");
});