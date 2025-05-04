
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, MessageSquare } from 'lucide-react';

export const ChatInterface: React.FC = () => {
  const [message, setMessage] = useState('');
  
  const quickEditSuggestions = [
    "Auto Cut Silence",
    "Highlight Reel",
    "Color Grade",
    "Add Subtitles",
    "Sync to Music",
    "Cinematic Look",
    "Vertical Crop"
  ];

  return (
    <div className="w-80 border-l border-editor-border bg-editor-darker flex flex-col">
      {/* Chat header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-editor-border">
        <div className="text-sm font-medium">AI Chat Assistant</div>
        <MessageSquare className="w-4 h-4 text-editor-accent" />
      </div>
      
      {/* Chat content */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col space-y-4">
        {/* AI welcome message */}
        <div className="flex items-start space-x-2">
          <div className="w-8 h-8 rounded-full bg-editor-accent flex items-center justify-center">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="bg-editor-dark p-3 rounded-lg rounded-tl-none">
              <p className="text-sm">Tell me what edits to apply to your video</p>
              <p className="text-xs text-gray-400 mt-1">
                Examples: "Trim silent parts", "Add cinematic color grade"
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick edit suggestions */}
      <div className="p-4 border-t border-editor-border">
        <div className="text-xs text-gray-400 mb-2">QUICK EDITS</div>
        <div className="grid grid-cols-2 gap-2">
          {quickEditSuggestions.map((suggestion, index) => (
            <Button 
              key={index} 
              variant="outline" 
              className="w-full h-8 text-xs justify-center bg-editor-dark border-editor-border"
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Chat input */}
      <div className="p-4 border-t border-editor-border">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Tell me what edits to apply to your video..."
            className="bg-editor-dark border-editor-border text-sm"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button size="icon" className="bg-editor-accent hover:bg-editor-accent/90">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
