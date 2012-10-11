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

Right now, I really haven't got much. But I kinda outlined the general idea above.

Dependencies
===============
express.js
node-simple-xmpp