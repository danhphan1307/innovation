
var express = require('express');
var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

/* At the top, with other redirect methods before other routes */
app.get('*',function(req,res,next){
  if(req.headers['x-forwarded-proto']!='https')
    res.redirect('https://hsl-parking.herokuapp.com'+req.url)
  else
    next() /* Continue to other routes if we're not redirecting */
})
// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/'));
app.use('/paidzone', express.static(__dirname + '/'));
app.use('/bike', express.static(__dirname + '/'));
app.use('/parking', express.static(__dirname + '/'));
app.use('/freezone', express.static(__dirname + '/'));
app.use('/layer', express.static(__dirname + '/'));
app.use('/user', express.static(__dirname + '/'));
// set the home page route
app.get('/', function(req, res) {

            // make sure index is in the right directory. In this case /app/index.html
            res.render('index');
});

app.listen(port, function() {
            console.log('Our app is running on http://localhost:' + port);
});

