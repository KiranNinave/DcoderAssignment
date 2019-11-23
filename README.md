# DcoderAssignment

## note

1. API port 4000
2. mongo port 27017 and 27018 (replica sets)

## how to install

1. clone the repo
2. then do docker-compose up
3. for first time we need to configure replica sets, by following steps
   a. connect both mongo server running on port 27017 and 27018 using your local system
   b. on your system terminal type following commands $ mongo localhost:27017 and $ mongo localhost:27018
   c. after connecting copy the content from /mongo/mongoPrimaryConfig.js and pest it on one of mongo shell if you got message status ok means you are connected
   d. now copy the content from /mongo/mongoSlaveConfig.js and pest it on other mongo shell if you got message status ok means you are connected
4. if its not the first time then connect both of mongo servers, on SECONDARY mongo connection copy the content from /mongo/mongoSlaveConfig.js and pest it on shell if you got status ok means you are good to go :)
5. after doing all this if you got message server started on port 4000 you are good to go :)

## if server not started

1. I am using nodemon for the server and nodemon doesn't exit the process even it crash (so docker restart policies are not applied) so for restarting the server kindly press CTRL + S on server.js file it will restart the server and you will recive the message on docker terminal that server is started on port 4000

## Postman api documentation is located at api doc
