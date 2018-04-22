# image processsing

This image processing model is implemented on aws-lambda infrastracture.

Deploy Steps:

Create dependence
```
$ mkdir improcess
$ cd improcess
```

Npm Configuration.
```
$ npm install async gm 
```

Code structure
```
improcess.js
/node_modules/async
/node_modules/gm
```

Zip whole directory and name it as improcess.zip

Create lambda function 
```
$ aws lambda create-function \
--region us-east-1 \
--function-name improcess \
--zip-file fileb:///improcess.zip \
--role <role-arn> \
--handler improcess.handler \
--runtime nodejs8.10 \
--profile adminuser \
--timeout 10 \
--memory-size 1024
```

Invoke test events for lambda function
```
$ aws lambda invoke \
--invocation-type Event \
--function-name improcess \
--region region \
--payload file:///test-event.json \
--profile adminuser \
outputfile.txt
``` 