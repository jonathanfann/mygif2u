var express = require('express');
var bodyParser = require('body-parser')
var app     = express();
var path    = require('path');
var giphy = require('giphy-api')(process.env.GIPHY_API_KEY);

app.use(express.static('public'));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.post('/make-gr8', urlencodedParser, function(req, res) {
  giphy.random({
    tag: req.body.searchTerm || 'peepee'
  }, function(err, output) {
    res.send(output.data);
  });
});

app.listen(5006);

console.log('Running at http://localhost:5006');
