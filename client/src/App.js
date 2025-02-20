import './App.css';
import { useEffect, useState } from 'react';

import io from 'socket.io-client';
// connect to socket server
// frontend uses 3001
const socket = io.connect('http://localhost:3001');


function App() {
  // sent message
  const [message, setMessage] = useState("");

  // received message
  const [messageReceived, setMessageReceived] = useState("");

  // 1. emit send message 
  // function to send message - emits
  const sendMessage = () => {
    socket.emit("send_message", { message });
  }

  //4. listen for receive message 
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    })
  }, [socket])

  return (
    <div className="App">
      <input placeholder="message..." onChange={(event) => setMessage(event.target.value)} />
      <button onClick={sendMessage}>send message!</button>
      <h1> message:</h1>
      {messageReceived}
  </div>
  );
}

export default App;
