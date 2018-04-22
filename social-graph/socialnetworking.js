// dependencies
var async = require('async');
var AWS = require('aws-sdk');

var util = require('util');
var request = require('request');


// constants
var MAX_WIDTH  = 100;
var MAX_HEIGHT = 100;

// get reference to S3 client 
var s3 = new AWS.S3();
 
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
    var dstBucket = srcBucket + "resized";
    var dstKey    = "resized-" + srcKey;

    // Sanity check: validate that source and destination are different buckets.
    if (srcBucket == dstBucket) {
        callback("Source and destination buckets are the same.");
        return;
    }
    
    // request('http://bnb.data.bl.uk/doc/resource/007446989.json', function (error, response, body) {
    // if (!error && response.statusCode == 200) {
    //     console.log(body) // Print the google web page.
    //  }
    // })

    console.log("start waterfall");
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

            console.log(response);
            raw_data = JSON.parse(response)
            console.log(raw_data)
            res = findcommon(input_data, relationship)
            next(null, res, null);
            // gm(response.Body).size(function(err, size) {
            //     // Infer the scaling factor to avoid stretching the image unnaturally.
            //     var scalingFactor = Math.min(
            //         MAX_WIDTH / size.width,
            //         MAX_HEIGHT / size.height
            //     );
            //     var width  = scalingFactor * size.width;
            //     var height = scalingFactor * size.height;

            //     // Transform the image buffer in memory.
            //     this.resize(width, height)
            //         .toBuffer(imageType, function(err, buffer) {
            //             if (err) {
            //                 next(err);
            //             } else {
            //                 next(null, response.ContentType, buffer);
            //             }
            //         });
            // });

        },
        function upload(contentType, data, next) {
            // Stream the transformed image to a different S3 bucket.
            s3.putObject({
                    Bucket: dstBucket,
                    Key: dstKey,
                    Body: data,
                    ContentType: contentType
                },
                next);
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
