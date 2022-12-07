import { useEffect } from "react";
import { useState } from "react";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import SendMessage from "../components/chat/SendMessage";
import ChatMessages from "../components/chat/ChatMessages";
import { useAuth } from '../components/context/AuthProvider';
import { v4 as uuidv4 } from 'uuid';

const ENDPOINT = "http://localhost:8080/chat"

function ChatPage() {
    const [stompClient, setStompClient] = useState();
    const [username, setUsername] = useState();
    const [messagesReceived, setMessagesReceived] = useState([]);
    const auth = useAuth();

    useEffect(() => {

        setUsername("test");

        const socket = SockJS(ENDPOINT);
        
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, () => {
            stompClient.subscribe('/topic/publicmessages', (data) => {
                console.log(data);
                onMessageReceived(data);
            });
        });
        setStompClient(stompClient);
    }, []);

    // send the data using stomp
    const sendMessage = (newMessage) => {
        const payload = { 'id': uuidv4(), 'from': username, 'text': newMessage.text };
        stompClient.send('/topic/publicmessages', {}, JSON.stringify(payload));
    };

    // display the received data
    const onMessageReceived = (data) => {
        const message = JSON.parse(data.body);
        setMessagesReceived(messagesReceived => [...messagesReceived, message]);
    }

    return (
        <div>
            <SendMessage username={username} onMessageSend={sendMessage} />
            <br/>
            <br/>
            <ChatMessages username={username} messagesReceived={messagesReceived} />
        </div>
    )
}

export default ChatPage;