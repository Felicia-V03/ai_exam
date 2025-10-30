import { useState, useRef, useEffect } from 'react';
import { chain } from '@chatapp/chains';

export const useChatLogic = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  
  useEffect(() => {
    setMessages([
      { role: 'assistant', text: 'Hej, det är TechNova AB kundtjäntbot, Techchi. Hur kan jag hjälpa dig?' }
    ]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const question = inputRef.current.value;
    if (!question.trim()) return;

    setLoading(true);
    setMessages((prev) => [...prev, { role: 'user', text: question }]);
    inputRef.current.value = '';

    try {
      const answer = await chain.invoke({ question });
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: answer?.response || answer || 'Ingen respons.' },
      ]);
      console.log('Answer from chain:', answer);
    } catch (error) {
      console.error('Chain error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: 'Ett fel uppstod när svaret hämtades.' },
      ]);
    }

    setLoading(false);
  };


  return { messages, loading, inputRef, handleSubmit };
}