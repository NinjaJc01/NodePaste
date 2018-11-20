//mserver.js
const express = require('express');        // call express
const app = express();                 // define our app using express
const bodyParser = require('body-parser');

class Paste {
    constructor(id,content) {
        this.id = id;
        this.content = content;
    }
    toJSON() {
        return {id:this.id,content:this.content}
    }
}
test = new Paste(5,"hello")
console.log(test.toJSON())
app.use(bodyParser.json());
const port = process.env.PORT || 8080; 
// ROUTES FOR OUR API
// =============================================================================
const router_api = express.Router();              // get an instance of the express Router
const router_404 = express.Router();

router_api.get('/', function (req, res) {
    console.log(timeStamp(), ": GET Request on /api/", "\n\tIP:", req.ip, "\n\tBody:", req.body, "\n\tUserAgent:", req.headers["user-agent"]);
    res.json({ message: 'hooray! welcome to our api!' });
    //global.statusLED.stop().off();
});


router_api.get('/paste/:pasteId', function (req, res) {
    console.log("test");
    res.send(test.toJSON())
  })

router_api.get('/status', function (req, res) {
    console.log(timeStamp(), ": GET Request on /api/status", "\n\tIP:", req.ip, "\n\tBody:", req.body, "\n\tUserAgent:", req.headers["user-agent"]);
    res.json({message:"Hello"});
});

router_api.post('/reset', function (req, res) {
    console.log(timeStamp(), ": POST Request on /api/reset", "\n\tIP:", req.ip, "\n\tBody:", req.body, "\n\tUserAgent:", req.headers["user-agent"]);
    res.json({ message: 'reset' })
});

router_api.post('/', function (req, res) {
    console.log(timeStamp(), ": POST Request on /api/", "\n\tIP:", req.ip, "\n\tBody:", JSON.stringify(req.body), "\n\tUserAgent:", req.headers["user-agent"]);
    res.json({ message: 'Something went wrong' });
});
router_404.all('/', function (req, res) {
    //res.statusCode = 404;
    console.log(req.url);
    res.redirect("/404")
    //global.statusLED.stop().off();
});
// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router_api);
app.use(express.static('pages'));
app.use('/*', router_404);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

//Stolen code below
function timeStamp() {
    // Create a date object with the current time
    var now = new Date();

    // Create an array with the current month, day and time
    var date = [now.getFullYear(), now.getMonth() + 1, now.getDate()];

    // Create an array with the current hour, minute and second
    var time = [now.getHours(), now.getMinutes(), now.getSeconds()];

    // Determine AM or PM suffix based on the hour
    var suffix = (time[0] < 12) ? "AM" : "PM";

    // Convert hour from military time
    time[0] = (time[0] < 12) ? time[0] : time[0] - 12;

    // If hour is 0, set it to 12
    time[0] = time[0] || 12;

    // If seconds and minutes are less than 10, add a zero
    for (var i = 1; i < 3; i++) {
        if (time[i] < 10) {
            time[i] = "0" + time[i];
        }
    }

    // Return the formatted string
    return date.join("/") + " " + time.join(":") + " " + suffix;
}