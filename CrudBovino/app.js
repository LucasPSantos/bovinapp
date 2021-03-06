const express = require('express');
const path = require('path');
const consign = require('consign');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const methodOverride = require('method-override');
const error = require('./middlewares/error');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser('BovinApp'));
app.use(expressSession({ resave: true, saveUninitialized: true,
	secret: 'BovinApp' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

//Express session middleware


//Express messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

consign({})
  .include('models')
  .then('controllers')
  .then('routes')
  .into(app)
;

app.use(error.notFound);
app.use(error.serverError);

var porta = 3000;

app.listen(porta, () => {
    console.log("Servidor no ar. http://localhost:" + porta);
});