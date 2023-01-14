import { useState } from "react";
import styles from '../styles/Chat.module.css'
import send from '../../img/send.png'

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
    <form className={styles.sendbox} onSubmit={onSubmit}>
      <input id='message' type='text' onChange={(event) => setMessage(event.target.value)} value={message} className={styles.input}></input>
      <button onClick={onMessageSend} className={styles.submit}><img src={send} className={styles.logo} />Send</button>
    </form>
  );
}

export default SendMessage;