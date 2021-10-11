const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const route = require('./routes');
const cors = require('cors');
require('dotenv').config();

const db = require('./models/database');

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({limit: '100mb', extended: false}));
app.use(bodyParser.json({ limit: '100mb', extended: true }));
app.use(cors());

route(app);

if(process.env.NODE_ENV === "appstore") {
    app.use(express.static(path.join(__dirname, '/client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    })
} else {
    app.get('/', (req, res) => {
        res.send('Api Running!');
    })
}

var http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "https://bibi-cosmetic-store.herokuapp.com/"
    }
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) &&
        users.push({userId, socketId})
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

const getUserId = (userId) => {
    return users.find(user => user.userId === userId);
}

io.on('connection', (socket) => {
    console.log('User connected.');
    socket.on("addUser", userId => {
        addUser(userId, socket.id);
        io.emit('getUsers', users);
    });

    socket.on('sendMessage', ({senderId, receiverId, text}) => {
        const user = getUserId(receiverId);
        socket.to(user?.socketId).emit('getMessage', {
            senderId,
            text,
        });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        removeUser(socket.id);
        io.emit('getUsers', users);
    });
});

db.sync().then(function () {
    const port = process.env.PORT || 5000;
    console.log(`Server is listening on port ${port}`);
    app.listen(port);
}).catch(console.error);