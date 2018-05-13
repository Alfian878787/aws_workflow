var s = require('net').Socket();
var targetList = ["localhost:8078", "localhost:8079", "localhost:8080"];

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

var target = getRandomInt(3);
var count = 0

s.on('error', function(err){
    console.log(err);
    count += 1;
    if (count < 3){
        target = (target + 1) % 3
        console.log(target)
        var ipAddress = targetList[target].slice(0, targetList[target].length - 5);
        var port = targetList[target].slice(targetList[target].length-4, targetList[target].length);
        s.connect(port, ipAddress);
    }
})

console.log(target);
var ipAddress = targetList[target].slice(0, targetList[target].length - 5);
var port = targetList[target].slice(targetList[target].length-4, targetList[target].length);

s.connect(port, ipAddress);

// Successfully connection.

console.log("successful access");
s.setTimeout(3000);
s.write('Hello');
s.on('data', function (data) {
    console.log(data.toString());
    s.end();
});

s.on('timeout', () => {
    count += 1;
    if (count < 3){
        target = (target + 1) % 3
        console.log(target)
        var ipAddress = targetList[target].slice(0, targetList[target].length - 5);
        var port = targetList[target].slice(targetList[target].length-4, targetList[target].length);
        s.end()

        var newS = require('net').Socket();
        newS.connect(port, ipAddress);
        console.log("successful access");
        newS.write('Hello');
        newS.on('data', function (data) {
            console.log(data.toString());
            newS.end();
        });
    }
})



