// Acquire from S3 bucket and send it to ML module.
var AWS = require('aws-sdk');
var async = require('async');
AWS.config.update({region:'us-east-1'});

var s3 = new AWS.S3();
var util = require('util');
exports.handler = function(event, context, callback){
    console.log("Reading from events \n", util.inspect(event, {depth: 5}));

    // Same name
    var srcBucket = event.Records[0].s3.bucket.name;
    var srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
    var dstBucket = "ml-result";
    var destKey = srcKey;
    // Waterfall for async model
    if (srcBucket == dstBucket) {
        callback("source and destination are the same");
        return;
    }
    async.waterfall([
        function download(next){
            s3.getObject({
                Bucket: srcBucket,
                Key: srcKey
            },
            next);
        },
        function mlrequest(response, next){
            // Todo: Understand the workflow of image sender.
            next(null, response.Context, res);
        },
        function upload(contentType, data, next){
            // Put the data to destination place.
            s3.putObject({
                Bucket: dstBucket,
                Key: srcKey,
                Body: data,
                ContentType: contentType
            },
            next);
        }
    ], function (err){
        if (err){
            console.log("error happens");
        }
        else {
            console.log("successful");
        }
        callback(null, "message")
        }
    )
}