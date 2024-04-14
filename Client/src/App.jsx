import  { useState } from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:5000');

function App() {
    const [roomName, setRoomName] = useState('');
    const [roomId, setRoomId] = useState('');
    const [userName, setUserName] = useState('');
    const [room, setRoom] = useState(null);
    

    // Function to create a new room
    const createRoom = () => {
        socket.emit('createRoom', roomName);
        socket.on('roomCreated', (roomId) => {
            setRoomId(roomId);
            alert(roomId);
            setRoom({ name: roomName, users: [] });
        });
    };

    // Function to join a room
    const joinRoom = () => {
        socket.emit('joinRoom', { roomId, userName });
        socket.on('userJoined', (room) => {
            setRoom(room);
        });
       

    };

    return (
        <div>
            <h1>Create/Join Room</h1>
            <div>
                <input
                    type="text"
                    placeholder="Room Name"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                />
                <button onClick={createRoom}>Create Room</button>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Room ID"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Your Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                
                <button onClick={joinRoom}>Join Room</button>
            </div>
            {room && (
                <div>
                    <h2>Room: {room.name}</h2>
                    <h3>Users:</h3>
                    <ul>
                        {room.users.map((user, index) => (
                            <li key={index}>{user}</li>
                        ))}
                    </ul>
                   
                </div>
            )}
        </div>
    );
}

export default App;
