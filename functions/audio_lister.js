// Load the SDK
const AWS = require('aws-sdk')
const S3 = new AWS.S3();
const BUCKET_NAME = process.env.BUCKET;
const REGION = process.env.REGION
var URI_BASE = null;
if (REGION == 'us-east-1') {
  URI_BASE = 'http://' + BUCKET_NAME + '.s3.amazonaws.com/';
} else {
  URI_BASE = 'http://' + BUCKET_NAME + '.s3-' + REGION + '.amazonaws.com/';
}
    
console.log('Loading function');

exports.handler = function(event, context, callback) {
    const response = {
	statusCode: 200,
	headers: {
	    'Content-Type': 'application/json',
	    'Access-Control-Allow-Origin': '*'
	}
    };
    var params = {
	Bucket: BUCKET_NAME,
	Prefix: 'audio/'
    };
    S3.listObjects(params, function(err, data) {
	if(err) {
	    console.log(err);
	    response.statusCode = 500;
	    response.body = err;
	    callback(err, response);
	    return;
	}
	results = []
	for (var item of data.Contents) {
	    results.push(URI_BASE + item.Key);
	}
	response.body = JSON.stringify({results: results});
	callback(null, response);
    });
};
