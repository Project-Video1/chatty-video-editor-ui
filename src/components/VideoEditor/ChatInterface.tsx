
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, MessageSquare, Bot, User, Sparkles, Minimize2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatMessage {
  id: number;
  sender: 'ai' | 'user';
  text: string;
  timestamp: Date;
}

export const ChatInterface: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: 'ai',
      text: "Hi there! I'm your AI video assistant. How can I help with your video?",
      timestamp: new Date()
    }
  ]);
  
  const quickEditSuggestions = [
    "Cut silent parts",
    "Add intro & outro",
    "Create highlights",
    "Add subtitles",
    "Sync to beat"
  ];

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user' as const,
      text: message,
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        sender: 'ai' as const,
        text: `I'll help you ${message.toLowerCase()}. Analyzing your video...`,
        timestamp: new Date()
      };
      setMessages(msgs => [...msgs, aiResponse]);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isExpanded) {
    return (
      <div className="fixed bottom-4 right-4">
        <Button 
          size="icon" 
          className="h-10 w-10 rounded-full bg-editor-accent hover:bg-editor-accent/90 shadow-lg"
          onClick={() => setIsExpanded(true)}
        >
          <MessageSquare className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-64 border-l border-editor-border bg-editor-darker flex flex-col">
      {/* Chat header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-editor-border">
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-editor-accent flex items-center justify-center mr-2">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-xs font-medium">AI Assistant</div>
            <div className="text-[10px] text-gray-400">Powered by CopCut</div>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsExpanded(false)}>
          <Minimize2 className="w-3.5 h-3.5" />
        </Button>
      </div>
      
      {/* Chat content */}
      <ScrollArea className="flex-1 p-2">
        <div className="flex flex-col space-y-3">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex items-start space-x-2 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.sender === 'ai' ? 'bg-editor-accent' : 'bg-gray-600'
              }`}>
                {msg.sender === 'ai' ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
              </div>
              
              <div className={`flex-1 max-w-[80%] ${msg.sender === 'user' ? 'text-right' : ''}`}>
                <div className={`p-2 rounded ${
                  msg.sender === 'ai' 
                    ? 'bg-editor-dark rounded-tl-none' 
                    : 'bg-editor-accent/20 text-white rounded-tr-none'
                }`}>
                  <p className="text-xs">{msg.text}</p>
                </div>
                <div className="text-[10px] text-gray-500 mt-0.5">{formatTime(msg.timestamp)}</div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      {/* Quick edit suggestions */}
      <div className="p-2 border-t border-editor-border">
        <div className="flex items-center mb-1.5">
          <Sparkles className="w-3 h-3 text-editor-accent mr-1" />
          <div className="text-[10px] font-medium">SUGGESTED EDITS</div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {quickEditSuggestions.map((suggestion, index) => (
            <Button 
              key={index} 
              variant="outline" 
              className="h-6 text-[10px] py-0 px-2 bg-editor-dark border-editor-border hover:bg-editor-border"
              onClick={() => {
                setMessage(suggestion);
              }}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Chat input */}
      <div className="p-2 border-t border-editor-border">
        <form 
          className="flex items-center space-x-1.5"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <Input
            placeholder="Type edit instructions..."
            className="bg-editor-dark border-editor-border text-xs h-7"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button 
            type="submit"
            size="icon" 
            className="bg-editor-accent hover:bg-editor-accent/90 h-7 w-7"
            disabled={!message.trim()}
          >
            <Send className="w-3 h-3" />
          </Button>
        </form>
      </div>
    </div>
  );
};
