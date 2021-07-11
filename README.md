Any web application consists of 2 parts Frontend and Backend, Frontend is the part through which any
User can interact with the app. Relationship Application is an interactive web application developed 
using ReactJS for Frontend and Material UI for designing component pages. Backend part is developed 
using NodeJS, Express and mongoDB. Index.js is the entery point to our application. mongoDB connection
and port creation part of backend takes place here. api's are defined in api directory and mongo models
are defined in models directory.UI directory contains react code.


1. we can use AWS EC2 instance to host our nodejs application as it is highly reliable, provides 
complete computing solutions and it can be controlled Completely

2. Dynamo DB can be used to store data as it is easy to administer, it allows Scalable data storage as 
users can store infinity amount of data according to their need and also it is very secure for  
applications running on Amazon EC2 to access internet resources, such as Amazon DynamoDB
  
3. For managing 1M requests per day we can use NGINX as load balancer which can help clients to access
different servers.



we can use below methods for opptimising web performance 
1. defer script tag so that they don't block rendering
2. bundle javascript using webpack
3. minify javascript
4. using ES6 for code reduction and using differential loading 
