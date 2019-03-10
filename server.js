let express = require('express');
let app = express();
var child_process = require('child_process');
let bodyParser = require('body-parser');
let port = 3000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function(req, res){
    console.log("Get call came");
    return res.send("Get Success");
})

app.post('/test/:param1/:param2', function(req, res){
    console.log("Post call came");
    let command = `sh ./test.sh ${req.params["param1"]} ${req.params["param2"]}`;
    child_process.exec(command, (error, stdOut, stdErr) => {
        if (error !== null){
            console.log(error);
            return res.send("error")
        }
        else {
            console.log('stdout: ' + stdOut || null);
            console.log('stderr: ' + stdErr || null);
            return res.send("success")
        }
    })
});

app.listen(port, function(){
    console.log("bashCaller server running on ",port);
})
