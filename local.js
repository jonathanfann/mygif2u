var express = require("express");
var app     = express();
var path    = require("path");

app.use(express.static('public'));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/redux',function(req,res){
  res.sendFile(path.join(__dirname+'/redux.html'));
});

app.listen(5006);

console.log("Running at http://localhost:5006");
