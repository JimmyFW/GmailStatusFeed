GmailStatusFeed
===============
The ultimate goal of this thing is to fetch the status messages of your friends on Gmail and allow you to

1. view them in a nice facebook-like interface so you can look back on all the nice memories
(interesting links, feelings, little outbursts, etc)
2. view statistics of what your friends are saying. I plan on having
    a. sentiment analysis
    b. friend specific information: distribution of status update times, most frequently used words

I'm trying to achieve this by setting up an XMPP server in node.js. The finished project should be a daemon
which constantly runs in the background, pushing status changes to a MongoDB database in real time, and rendering
a front-end display using express.js. Later I might change my mind to use meteor.js.

Right now, I've got a script that logs status changes to a text file.
I also decided to implement a script that redirects chats to cleverbot - just a fun thing I did on the side.

Next steps are: implement a persistent server (possibly using MongoDB) to store status updates.
Then, use some MVC framework to make this into a webapp.

Instructions
===============
1. git clone https://github.com/JimmyFW/GmailStatusFeed.git
2. cd status-reader
3. npm install
4. Make a file called .credentials.json that contains one line, formatted as follows:
    {user: '[GMAIL_ID_GOES_HERE]', pwd: '[GMAIL_PWD_GOES_HERE]'}
    .credentials.json should be in the same directory as status-reader.js
    don't forget the dot!
5. node status-reader.js

For fun:
5. node cleverbot.js
6. start a conversation with a friend, and watch the magic happen!


Dependencies
===============
node-simple-xmpp

libxmljs

express.js

mongodb

fs