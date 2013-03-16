GmailStatusFeed
===============
The ultimate goal of this thing is to fetch the status messages of your friends on Gmail and allow you to

1. view them in a nice facebook-like interface so you can look back on all the nice memories
(interesting links, feelings, little outbursts, etc)
2. view statistics of what your friends are saying. I plan on having
    a. sentiment analysis
    b. friend specific information: distribution of status update times, most frequently used words

I'm trying to achieve this by setting up a node.js server. The finished project should be a daemon
which constantly runs in the background, pushing status changes to a MongoDB database, and rendering
a front-end display in real time using express.js and socket.io.

status-reader.js consists of a node xmpp chat client which fetches gmail status updates,
an express.js frontend, and a socket.io pipeline which sends data asynchronously
and renders page updates in real time.

cleverbot.js is a script that redirects chats to cleverbot, letting it speak to your friends
on your behalf - just a fun thing I did on the side.

Next steps are: implement a persistent server (using Mongoose and MongoDB) to store status updates.
Then, use some MVC framework to make this into a webapp.

Instructions
===============
1. git clone https://github.com/JimmyFW/GmailStatusFeed.git
2. cd status-reader
3. npm install
4. Make a file called ".credentials.json" that contains one line, formatted as follows:

```
{user: '[GMAIL_ID_GOES_HERE]', pwd: '[GMAIL_PWD_GOES_HERE]'}
```

.credentials.json should be in the same directory as status-reader.js. Don't forget the dot!

Run in the prompt with
```
node status-reader.js
```

For fun:

```
node cleverbot.js
```
then start a conversation with a friend. Sit back and watch the magic happen!


Dependencies
===============
node-simple-xmpp

libxmljs

express.js

mongodb

fs

socket.io

mongoose

Database Planning
===============
*Should store chat info for each user.
*
