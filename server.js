var express = require("express");
var app     = express();
var path    = require("path");

app.use(express.static('public'));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

app.post('/make-gr8', bodyParser.json(), function(req, res) {
  giphy.search({
    q: req.body.searchTerm,
    rating: 'pg'
  }, function(err, res) {
    res.send(res);
  });
});

app.listen(80);

console.log("Running at http://104.131.106.43:80");
