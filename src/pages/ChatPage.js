import { useState } from "react";
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import SendMessage from "../components/chat/SendMessage";
import ChatMessages from "../components/chat/ChatMessages";
import { useAuth } from '../components/context/AuthProvider';
import { v4 as uuidv4 } from 'uuid';
import jwt_decode from 'jwt-decode'
import styles from '../components/styles/Chat.module.css'

var stompClient=null;

const ChatPage = () => {
    const auth = useAuth();
    const [user, setUser] = useState({
        username: jwt_decode(auth.auth.accessToken).sub,
        connected: false
    });
    const [messagesReceived, setMessagesReceived] = useState([]);
    const [connection, setConnection] = useState(false);

    const registerUser = () => {
        let socket = new SockJS("http://localhost:8080/ws");
        stompClient = over(socket);
        stompClient.connect({}, onConnected, onError);
        setConnection(true);
    }

    const onConnected = () => {
        setUser({...user, "connected": true});
        stompClient.subscribe('/topic/publicmessages', (data) => {
            console.log(data);
            onMessageReceived(data);
        });
    }

    const onError = (err) => {
        console.log(err);
    }

    // send the data using stomp
    const sendMessage = (newMessage) => {
        const payload = { 'id': uuidv4(), 'from': user.username, 'text': newMessage.text };
        stompClient.send('/topic/publicmessages', {}, JSON.stringify(payload));
    };

    // display the received data
    const onMessageReceived = (data) => {
        const message = JSON.parse(data.body);
        setMessagesReceived(messagesReceived => [...messagesReceived, message]);
    }

    return (
        <div>
            <ChatMessages user={user.username} messagesReceived={messagesReceived} />
            {connection ? 
            <div><span className={styles.online}>● </span>You are Online <SendMessage user={user.username} onMessageSend={sendMessage} /></div> 
            : 
            <div><div><span className={styles.offline}>● </span>You are Offline</div><button onClick={registerUser}>connect to chat</button></div>}
        </div>
    )
}

export default ChatPage;