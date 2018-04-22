# Social networking graph

This social graph is implemented pon aws-lambda infrastracture.

Deploy Steps:

Create dependence
```
$ mkdir social-graph
$ cd social-graph
```

Npm Configuration.
```
$ npm install async
```

Code structure
```
socialnetworking.js
/node_modules/async
```

Zip whole directory and name it as socialnetworking.zip

Create lambda function 
```
$ aws lambda create-function \
--region us-east-1 \
--function-name socialnetworking \
--zip-file fileb:///socialnetworking.zip \
--role <role-arn> \
--handler socialnetworking.handler \
--runtime nodejs8.10 \
--profile adminuser \
--timeout 10 \
--memory-size 1024
```

Invoke test events for lambda function
```
$ aws lambda invoke \
--invocation-type Event \
--function-name socialnetworking \
--region region \
--payload file:///test-event.json \
--profile adminuser \
outputfile.txt
``` 