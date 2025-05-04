
import React, { useState } from 'react';
import { FileVideo, Music, Text, Sticker, Layers, Sliders, Video, Image, Settings } from 'lucide-react';
import { cn } from "@/lib/utils";

export const LeftSidebar: React.FC = () => {
  const [activeToolIndex, setActiveToolIndex] = useState(0);
  
  const tools = [
    { icon: FileVideo, label: 'Media' },
    { icon: Text, label: 'Text' },
    { icon: Image, label: 'Images' },
    { icon: Sticker, label: 'Stickers' },
    { icon: Music, label: 'Audio' },
    { icon: Video, label: 'Effects' },
    { icon: Sliders, label: 'Transitions' },
    { icon: Layers, label: 'Captions' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-16 bg-editor-darker border-r border-editor-border flex flex-col items-center">
      <div className="flex-1 py-2">
        {tools.map((tool, index) => (
          <div 
            key={index}
            className={cn(
              "flex flex-col items-center justify-center w-full py-3 cursor-pointer transition-all duration-200",
              index === activeToolIndex 
                ? "bg-editor-dark text-editor-accent" 
                : "hover:bg-editor-dark/30 text-gray-400 hover:text-white"
            )}
            onClick={() => setActiveToolIndex(index)}
          >
            <tool.icon className={cn(
              "w-5 h-5", 
              index === activeToolIndex ? "text-editor-accent" : ""
            )} />
            <span className="text-xs mt-1 opacity-70">{tool.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
