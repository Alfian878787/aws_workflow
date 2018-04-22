// dependencies
var async = require('async');
var AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});

var util = require('util');

// Dynamodb access control.
var date  = JSON.stringify(new Date());
var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

// constants
var MAX_WIDTH  = 100;
var MAX_HEIGHT = 100;

// get reference to S3 client 
var s3 = new AWS.S3();
var src, dest;

function findcommon(input_data, relationship){
    if (input_data.length < 1)
        return null
    var result = new Set(relationship[input_data[0]])
    for(var i=1; i < input_data.length; i++){
        var b = new Set(relationship[input_data[i]])
        var result = new Set([...result].filter(x => b.has(x)));
    }
    return result
}

let relationship = {
        "Mark":["Ray","Ariadne","Betty","Flora"],
        "Ray":["Mark","Ariadne"],
        "Ariadne":["Ray","Mark","Flora"],
        "Betty":["Mark","Ariadne"],
        "Flora":["Gail","Ariadne"],
        "Gail":["Flora"],
        "Hilary":[],
        "Jean":["Jeff"],
        "Jing":["Jill"],
        "Jeff":["Jean"],
        "Jill":["Jing"]
}

exports.handler = function(event, context, callback) {
    // Read options from the event.
    console.log("Reading options from event:\n", util.inspect(event, {depth: 5}));
    var srcBucket = event.Records[0].s3.bucket.name;
    // Object key may have spaces or unicode non-ASCII characters.
    var srcKey    =
    decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));  
    var dstBucket = "ml-social";
    var dstKey    = "res";

    // Sanity check: validate that source and destination are different buckets.
    if (srcBucket == dstBucket) {
        callback("Source and destination buckets are the same.");
        return;
    }

    // Download the image from S3, transform, and upload to a different S3 bucket.
    async.waterfall([
        function download(next) {
            // Download the image from S3 into a buffer.
            s3.getObject({
                    Bucket: srcBucket,
                    Key: srcKey
                },
                next);
            },

        function transform(response, next) {
            // Check the social networking flow.
            
            var raw_data = response.Body.toString('utf8')
            console.log(raw_data);
            var handler_data = raw_data.split(",");
            src = JSON.stringify(handler_data);
            var res = findcommon(handler_data, relationship);
            res = JSON.stringify(Array.from(res).join(','));
            console.log(res);
            next(null, response.ContentType , res);
        },
        
        function upload(contentType, data, next) {
            // Stream the transformed image to a different S3 bucket.
            s3.putObject({
                    Bucket: dstBucket,
                    Key: "res.json",
                    Body: data,
                    ContentType: contentType
                },
                next);
            
            // Upload to dynamodb 
            console.log(date);
            var params = {
                  TableName: 'social_networking',
                  Item: {
                    'time': date,
                    'src': src,
                    'dest': data
                  }
                };

            docClient.put(params, function(err, data) {
              if (err) {
                console.log("Error", err);
              } else {
                console.log("Success", data);
              }
            });

            }
        ], function (err) {
            if (err) {
                console.error(
                    'Unable to resize ' + srcBucket + '/' + srcKey +
                    ' and upload to ' + dstBucket + '/' + dstKey +
                    ' due to an error: ' + err
                );
            } else {
                console.log(
                    'Successfully resized ' + srcBucket + '/' + srcKey +
                    ' and uploaded to ' + dstBucket + '/' + dstKey
                );
            }

            callback(null, "message");
        }
    );
};
