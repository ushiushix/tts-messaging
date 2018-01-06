'use strict';

console.log('Loading function');
var AWS = require('aws-sdk');

exports.handler = (event, context, callback) => {
    const response = {
	statusCode: 200,
	headers: {
	    'Content-Type': 'application/json',
	    'Access-Control-Allow-Origin': '*'
	}
    };
    console.log('Received event:', JSON.stringify(event, null, 2));
    const body = JSON.parse(event.body);
    var message = body.message;
    console.log('message =', message);
    if (message == null) {
	response.statusCode = 400;
	response.body = JSON.stringify({status: false});
        callback(null, response);
        return;
    }
    var s3 = new AWS.S3();
    var bucketName = process.env.BUCKET;
    var keyName = 'messages/' + new Date().toISOString() + '.txt';
    var params = {Bucket: bucketName, Key: keyName, Body: message };
    console.log('Putting ' + JSON.stringify(params));
    s3.putObject(params, function(err, data) {
      if (err) {
	  response.statusCode = 400;
	  response.body = JSON.stringify({status: false});
          callback(err, response);
	  return;
      };
      response.body = JSON.stringify({status: true});
      callback(null, response);
    });
};
