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
            <h2>Messages:</h2>
            {props.messagesReceived
                .map(message => <MessageReceived key={message.id} from={message.from} text={message.text} />)}
        </>
    );
}

export default ChatMessages;