import React, { useState } from 'react';
import './ChatInterface.css';

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      // Add user message
      setMessages([...messages, { text: inputText, sender: 'user' }]);
      setIsLoading(true);

      try {
        // Send message to backend
        const response = await fetch('http://localhost:8000/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: inputText }),
        });

        const data = await response.json();
        
        // Add backend response
        setMessages(prev => [...prev, { 
          text: data.response, 
          sender: 'system' 
        }]);
      } catch (error) {
        console.error('Error sending message to backend:', error);
        setMessages(prev => [...prev, { 
          text: "Sorry, there was an error processing your message.", 
          sender: 'system' 
        }]);
      } finally {
        setIsLoading(false);
        setInputText('');
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`message ${message.sender}`}
          >
            {message.text}
          </div>
        ))}
        {isLoading && (
          <div className="message system loading">
            Thinking...
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatInterface; 