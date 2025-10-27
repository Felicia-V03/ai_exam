import { useState, useRef } from 'react';
import { chain } from '@aiapp/chains';

export const useChatLogic = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const question = inputRef.current.value;
    if (!question.trim()) return;

    setLoading(true);
    setMessages((prev) => [...prev, { role: 'user', text: question }]);
    inputRef.current.value = '';
    const answer = await chain.invoke({ question }, {configurable : { sessionId : 'hejsan'}});

    setMessages((prev) => [
      ...prev,
      { role: 'assistant', text: answer.response || 'No response' },
    ]);

    setLoading(false);
  };

  return { messages, loading, inputRef, handleSubmit };
}