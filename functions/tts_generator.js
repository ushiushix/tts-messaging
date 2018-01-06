// Load the SDK
const AWS = require('aws-sdk')
const XMLEscape = require('xml-escape');
const S3 = new AWS.S3();
const REGION = process.env.REGION;

console.log('Loading function');

exports.handler = function (event, context, callback) {
	console.log(event);
	var eventName = event.Records[0].eventName
	var bucket = event.Records[0].s3.bucket.name;
	var key = event.Records[0].s3.object.key;
	key = decodeURIComponent(key);
	console.log("Target: " + bucket + "/" + key);
	if (!(key.startsWith('messages/') && key.endsWith('.txt'))) {
		console.log('Unrelated key: ' + key);
		callback();
		return;
	}
	var message = null;
	var params = {
		Bucket: bucket,
		Key: key
	};
	S3.getObject(params, function (err, data) {
		if (err) {
			console.log(err);
			callback(err);
			return;
		}
		console.log("Got data:" + data.Body);
		message = data.Body.toString();
		message = XMLEscape(message);
		console.log('Calling polly');
		var Polly = new AWS.Polly({
			signatureVersion: 'v4',
			region: REGION
		});
		params = {
			'Text': '<speak><prosody rate="fast">' + message + '</prosody></speak>',
			'TextType': 'ssml',
			'OutputFormat': 'mp3',
			'VoiceId': 'Mizuki'
		}
		Polly.synthesizeSpeech(params, (err, data) => {
			if (err) {
				console.log(err);
				callback(err);
				return;
			} else if (data) {
				if (data.AudioStream instanceof Buffer) {
					audioKey = key.replace('messages', 'audio') + '.mp3';
					params = { Bucket: bucket, Key: audioKey, Body: data.AudioStream };
					S3.putObject(params, function (err, data) {
						if (err) {
							return console.log(err)
						}
						console.log("The file was saved!")
					});
				}
			}
		});
	});
};
