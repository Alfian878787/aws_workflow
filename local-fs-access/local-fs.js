// This script descirbes how to access local filesystem for aws lambda function.
var fs = require('fs');

exports.handler = function(event, context, callvack){
    console.log("Access entry");
    
    fs.writeFile("/tmp/test", "Hey there!", function(err) {
        if(err) {
            return console.log(err);
        }
    
        console.log("The file was saved!");
    }); 
    
    fs.readFile('/tmp/test', function read(err, data) {
    if (err) {
        throw err;
    }
    console.log(data.toString('utf8'))
    });
    
}