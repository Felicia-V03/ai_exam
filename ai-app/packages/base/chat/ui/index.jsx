import './index.css';
import { Message } from '@aiapp/message';
import { Loading } from '@aiapp/loading';
import { useChatLogic } from '@aiapp/usechat';

export const Chat = () => {
  const { messages, loading, handleSubmit, inputRef } = useChatLogic();

  const messageComponents = messages.map((message, index) => (
    <Message text={message.text} role={message.role} key={index}/>
  ));

  return (
    <section className="chat">
      <section className="chat__messages">
        { messageComponents }
        { loading && <Loading /> }
      </section>

      <form className="chat__form" onSubmit={handleSubmit}>
        <input type="text" className="chat__input" ref={inputRef}/>
        <button className="chat__btn">Skicka!</button>
      </form>
    </section>
  )
}