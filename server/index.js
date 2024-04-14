const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server,{
    cors:{
        origin:'*'
    }
});

const PORT = process.env.PORT || 5000;

// Maintain list of active rooms
const activeRooms = {};

io.on('connection', (socket) => {
    console.log('New client connected');

    // When a new room is created
    socket.on('createRoom', (roomName) => {
        const roomId = generateRoomId();
        activeRooms[roomId] = { name: roomName, users: [] };
        socket.emit('roomCreated', roomId);
    });

    // When a user joins a room
    socket.on('joinRoom', ({ roomId, userName }) => {
        if (activeRooms[roomId]) {
            activeRooms[roomId].users.push(userName);
            socket.join(roomId);
            io.to(roomId).emit('userJoined', activeRooms[roomId]);
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

function generateRoomId() {
    return Math.random().toString(36).substring(7);
}

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
