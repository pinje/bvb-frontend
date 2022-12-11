import '../styles/Chat.css'

const MessageReceived = (props) => {
    return (
        <div>
            <b>{props.from}</b>: {props.text}
        </div>
    );
};

const ChatMessages = (props) => {
    return (
        <>
            <h2>CHAT</h2>
            <div className="chat-box">
            {props.messagesReceived
                .map(message => <MessageReceived key={message.id} from={message.from} text={message.text} />)}
            </div>
            
        </>
    );
}

export default ChatMessages;