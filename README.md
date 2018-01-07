# tts-messaging

## What is this?
A toy application to play with AWS Lambda, Polly, and [Serverless Framework](https://serverless.com/) myself.

## Deploy

Before you deploy this application you will need to setup your AWS credential. See [Quick start](https://serverless.com/framework/docs/providers/aws/guide/quick-start/) in the Serverless documentation.

1. Copy serverless.example.yml to serverless.yml
2. Edit serverless.yml to change ```__PREFIX__``` to any prefix string you think it doesn't collide with others
3. Do the following to deploy
    ```
    npm install
    npm run sls deploy
    ```
4. Check the output and find the URL of your API.
    You will see like this:
    ````
    Endpoints:
      GET - https://xxxxxxxx.execute-api.us-west-2.amazonaws.com/dev/audios
      POST - https://xxxxxxxx.execute-api.us-west-2.amazonaws.com/dev/messages
    ````
    The URI you need is like this:
    ````
    https://xxxxxxxx.execute-api.us-west-2.amazonaws.com/dev/
    ````
5. Copy site/config.example.js to site/config.js
6. Edit config.js to change ```__API_GATEWAY_RESTAPI__``` to that you find in the step 4.
7. Update S3 content by:
    ````
    npm run sls s3sync
    ````
8. Now you can use your browser to visit the S3 website like this:
    ````
    http://{YOUR_PREFIX}-ttsmsg.s3-website-us-west-2.amazonaws.com/site/
    ````

## Remove
1. When you are done and want to clean up anything you've created, do the following:
    ````
    npm run sls remove
    ````

## Disclaimer

There is no warranty of any kind.

Contributions are always welcomed.

## License

See the file LICENSE.

Copyright (c) 2017 Koichi Inoue.
