import { useAuth } from '../context/AuthProvider';
import styles from '../styles/Chat.module.css'
import jwt_decode from 'jwt-decode'
import { useEffect, useRef, useState } from 'react';

const MessageReceived = (props) => {

    const auth = useAuth();
    const user = jwt_decode(auth.auth.accessToken).sub;

    function check(name) {
        if (name == user) {
            return (
                <b className={styles.own}>{props.from}</b>
            )
        } else {
            return (
                <b>{props.from}</b>
            )
        }
    }

    return (
        <div className={styles.message}>
            {check(props.from)}: {props.text}
        </div>
    );
};

const ChatMessages = (props) => {
    const [scrolledUp, setScrolledUp] = useState(false);
    const chatBoxRef = useRef(null);

    useEffect(() => {
        if (!scrolledUp) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [props.messagesReceived, scrolledUp]);

    const handleScroll = () => {
        if (chatBoxRef.current.scrollTop < chatBoxRef.current.scrollHeight - chatBoxRef.current.clientHeight) {
            setScrolledUp(true);
        } else {
            setScrolledUp(false);
        }
    };
    
    return (
        <>
            <div ref={chatBoxRef} className={styles.chatbox} onScroll={handleScroll}>
            {props.messagesReceived
                .map(message => <MessageReceived key={message.id} from={message.from} text={message.text} />)}
            </div>
        </>
    );
}

export default ChatMessages;