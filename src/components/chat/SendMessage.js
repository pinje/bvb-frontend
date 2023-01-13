import { useState } from "react";
import styles from '../styles/Chat.module.css'

const SendMessage = (props) => {
  const [message, setMessage] = useState('');

  if (!props) {
    return <></>;
  }

  const onMessageSend = () => {
    if (!message) {
      alert('Please type a message!');
    }

    props.onMessageSend({ 'text': message});
    setMessage('');
  }

  const onSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <form onSubmit={onSubmit}>
      <input id='message' type='text' onChange={(event) => setMessage(event.target.value)} value={message} className={styles.input}></input>
      <button onClick={onMessageSend}>Send</button>
    </form>
  );
}

export default SendMessage;