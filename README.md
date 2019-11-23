# DcoderAssignment

## note

1. API port 4000
2. mongo port 27017 and 27018 (replica sets)

## how to install

1. clone the repo
2. then do _docker-compose up_
3. for first time we need to configure replica sets, by following steps
   * connect both mongo server running on port 27017 and 27018 using your local system
   * on your system terminal type following commands $ _mongo localhost:27017_ and $ _mongo localhost:27018_
   * after connecting copy the content from __/mongo/mongoPrimaryConfig.js__ and pest it on one of mongo shell if you got message __status ok__ means you are connected
   * now copy the content from __/mongo/mongoSlaveConfig.js__ and pest it on other mongo shell if you got message __status ok__ means you are connected
4. if its not the first time then connect both of mongo servers, on SECONDARY mongo connection copy the content from __/mongo/mongoSlaveConfig.js__ and pest it on shell if you got __status ok__ means you are good to go :)
5. after doing all this if you got message __server started on port 4000__ you are good to go :)

## if server not started

1. I am using __nodemon__ for the server and nodemon doesn't exit the process even it crash (so docker restart policies are not applied) so for restarting the server kindly press __CTRL + S on server.js__ file it will restart the server and you will recive the message on docker terminal that server is __started on port 4000__

## Postman api documentation is located at api doc
