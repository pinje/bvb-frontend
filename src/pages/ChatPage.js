import { useState } from "react";
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import SendMessage from "../components/chat/SendMessage";
import ChatMessages from "../components/chat/ChatMessages";
import { useAuth } from '../components/context/AuthProvider';
import { v4 as uuidv4 } from 'uuid';
import jwt_decode from 'jwt-decode'
import styles from '../components/styles/Chat.module.css'
import nocloud from '../img/nocloud.png'
import { Navigate, useLocation } from 'react-router-dom';

var stompClient=null;

const ChatPage = () => {
    const auth = useAuth();
    const [user, setUser] = useState({
        username: jwt_decode(auth.auth.accessToken).sub,
        connected: false
    });
    const [messagesReceived, setMessagesReceived] = useState([]);
    const [connection, setConnection] = useState(false);
    const location = useLocation();

    if (auth === 0) {
        return <Navigate to="/AuthError" state={{ from: location }}></Navigate>
    }

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

    function connected() {
        if (connection) {
            return (
                <div>
                    <span className={styles.online}>● </span>You are Online 
                    <ChatMessages user={user.username} messagesReceived={messagesReceived} />
                    <SendMessage user={user.username} onMessageSend={sendMessage} />
                </div>
            )
        } else {
            return (
                <div className={styles.offlinechatbox}>
                    <div className={styles.info}>
                        <img src={nocloud} className={styles.logo}/><span className={styles.offline}>You are Offline</span>
                    </div>
                    <div>
                        <button className={styles.button} onClick={registerUser}>connect to chat</button>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className={styles.chatpage}>
            <div className='page-title'>CHATROOM</div>
            {connected()}
        </div>
    )
}

export default ChatPage;