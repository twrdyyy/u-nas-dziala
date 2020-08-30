var express     = require("express");
var login       = require('./routes/loginroutes');
var userStats   = require('./routes/statsroutes');
var userRouting = require('./routes/userrouting');
var bodyParser  = require('body-parser');
var app         = express();
const port      = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'Welcome to U nas dziala! app api' });
});

router.post('/get-route', function(req, res) {
    res.json({"points":[{"latitude":52.50930,"longitude":13.42937},{"latitude":52.50904,"longitude":13.42913},{"latitude":52.50895,"longitude":13.42904},{"latitude":52.50868,"longitude":13.42880},{"latitude":52.50840,"longitude":13.42857},{"latitude":52.50816,"longitude":13.42839},{"latitude":52.50791,"longitude":13.42825},{"latitude":52.50757,"longitude":13.42772},{"latitude":52.50752,"longitude":13.42785},{"latitude":52.50742,"longitude":13.42809},{"latitude":52.50735,"longitude":13.42824},{"latitude":52.50730,"longitude":13.42837},{"latitude":52.50673,"longitude":13.42961},{"latitude":52.50619,"longitude":13.43092},{"latitude":52.50574,"longitude":13.43195},{"latitude":52.50528,"longitude":13.43299},{"latitude":52.50513,"longitude":13.43336},{"latitude":52.50464,"longitude":13.43451},{"latitude":52.50451,"longitude":13.43482},{"latitude":52.50444,"longitude":13.43499},{"latitude":52.50418,"longitude":13.43564},{"latitude":52.50372,"longitude":13.43673},{"latitude":52.50343,"longitude":13.43738},{"latitude":52.50330,"longitude":13.43767},{"latitude":52.50275,"longitude":13.43873}]});
});

router.get('/test', login.test);

router.get('/getRating', userStats.getRating);
router.get('/getPoints', userStats.getPoints);
router.post('/addRating', userStats.addRating);
router.post('/addPoints', userStats.addPoints);
router.post('/createRide', userRouting.driverRoute);


router.post('/register',login.register);
router.post('/login',login.login)
app.use('/api', router);
app.listen(port);
