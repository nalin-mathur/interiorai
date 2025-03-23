import React from 'react';
import ImageUpload from './components/ImageUpload';
import ChatInterface from './components/ChatInterface';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <div className="image-section">
        <ImageUpload />
      </div>
      <div className="chat-section">
        <ChatInterface />
      </div>
    </div>
  );
}

export default App; 