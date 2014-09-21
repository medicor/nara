var express = require('express'),
	path = require('path'),
//	favicon = require('static-favicon'),
//	logger = require('morgan'),
	parser = require('body-parser'),
	moment = require('moment'),
//	cors = require('cors'),
	app = express(),

	handlebars = require('express-handlebars').create({
		defaultLayout: 'main',
		layoutsDir: __dirname + '/views/layouts/',
		partialsDir: __dirname + '/views/partials/',
		helpers: {
			now: function (aFormat) { 
				return moment().format(aFormat);
			},
			iif: function(aLeftHand, aRightHand, aString) {
				return aLeftHand === aRightHand ? aString : '';
			}
		}
	}),
	
	ContentProvider = require('./provider').ContentProvider,
	contentProvider = new ContentProvider();

//app.enable('view cache');
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars.engine);

//app.use(logger('dev'));
//app.use(cors());
//app.use(favicon());
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(express.static(__dirname + '/public'));

app.use('/users', function(req, res) {
	res.send('respond with a resource');
});

app.use('/', function(req, res) {
	if (req.url === '/') {
		res.redirect('/home');
		return;
	}
	contentProvider.find(req.url, function(aContent) {
		res.render('index', { 
			siteName: 'NARA', 
			siteTitle: 'Nordic Arthroplasty Register Association',
			pageContent: aContent,
			currentURL: req.url
		});
	});
});

app.use(function(req, res, next) {
	var ex = new Error('Not Found');
	ex.status = 404;
	next(ex);
});

app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: app.get('env') === 'development' ? err : {}
	});
});

app.listen(process.env.OPENSHIFT_INTERNAL_PORT || 3000, process.env.OPENSHIFT_NODEJS_IP || "192.168.1.89");
