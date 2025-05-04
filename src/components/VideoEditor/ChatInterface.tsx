
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, MessageSquare, Bot, User, Sparkles, X, Maximize2, Minimize2 } from 'lucide-react';
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
      text: "Hi there! I'm your AI video assistant. Tell me what edits you'd like to apply to your video and I'll help you make them.",
      timestamp: new Date()
    }
  ]);
  
  const quickEditSuggestions = [
    "Cut silent parts",
    "Add intro & outro",
    "Create highlights",
    "Add color grade",
    "Generate subtitles",
    "Sync to music beat",
    "Add cinematic crop"
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
        text: `I'll help you ${message.toLowerCase()}. Let me analyze your video first.`,
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
      <div className="fixed bottom-6 right-6">
        <Button 
          size="icon" 
          className="h-12 w-12 rounded-full bg-editor-accent hover:bg-editor-accent/90 shadow-lg"
          onClick={() => setIsExpanded(true)}
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-96 border-l border-editor-border bg-editor-darker flex flex-col">
      {/* Chat header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-editor-border">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-editor-accent flex items-center justify-center mr-3">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-medium">AI Video Assistant</div>
            <div className="text-xs text-gray-400">Powered by CopCut</div>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsExpanded(false)}>
            <Minimize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* Chat content */}
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex items-start space-x-2 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.sender === 'ai' ? 'bg-editor-accent' : 'bg-gray-600'
              }`}>
                {msg.sender === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>
              
              <div className={`flex-1 max-w-[85%] ${msg.sender === 'user' ? 'text-right' : ''}`}>
                <div className={`p-3 rounded-lg ${
                  msg.sender === 'ai' 
                    ? 'bg-editor-dark rounded-tl-none' 
                    : 'bg-editor-accent/20 text-white rounded-tr-none'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
                <div className="text-xs text-gray-500 mt-1">{formatTime(msg.timestamp)}</div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      {/* Quick edit suggestions */}
      <div className="p-4 border-t border-editor-border">
        <div className="flex items-center mb-2">
          <Sparkles className="w-3.5 h-3.5 text-editor-accent mr-1.5" />
          <div className="text-xs font-medium">SUGGESTED EDITS</div>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickEditSuggestions.map((suggestion, index) => (
            <Button 
              key={index} 
              variant="outline" 
              className="h-8 text-xs py-0 px-3 bg-editor-dark border-editor-border hover:bg-editor-border"
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
      <div className="p-4 border-t border-editor-border">
        <form 
          className="flex items-center space-x-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <Input
            placeholder="Tell me what edits to apply..."
            className="bg-editor-dark border-editor-border text-sm"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button 
            type="submit"
            size="icon" 
            className="bg-editor-accent hover:bg-editor-accent/90 h-10 w-10"
            disabled={!message.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};
