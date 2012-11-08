GmailStatusFeed
===============
The ultimate goal of this thing is to fetch the status messages of your friends on Gmail and allow you to

1. view them in a nice facebook-like interface so you can look back on all the nice memories (complaints about
problem sets due the next morning, links to ridiculous content, etc)
2. perform queries on the statuses so you can run sociological studies, analyzing things such as average

time of post for a given friend, frequency of words, etc.


I'm trying to achieve this by setting up an XMPP server in node.js. The finished project should have a daemon
which constantly runs in the background, pushing status changes to a SQL database in real time, and rendering
a front-end display using express.js.


Right now, I've got a script that logs status changes to a text file.
I also decided to implement a script that redirects chats to cleverbot. That's just a fun thing I did on the side.

Next steps are: implement a persistent server (possibly using MongoDB) to store status updates.
Then, use some MVC framework to make this into a webapp.


Dependencies
===============
node-simple-xmpp

libxmljs

express.js
