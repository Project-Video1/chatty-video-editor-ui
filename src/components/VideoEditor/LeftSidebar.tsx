
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
    <div className="w-20 bg-editor-darker border-r border-editor-border flex flex-col items-center">
      <div className="flex-1 py-4">
        {tools.map((tool, index) => (
          <div 
            key={index}
            className={cn(
              "flex flex-col items-center justify-center w-full py-4 px-2 cursor-pointer transition-all duration-200",
              index === activeToolIndex 
                ? "bg-editor-dark text-editor-accent" 
                : "hover:bg-editor-dark/50 text-gray-400 hover:text-white"
            )}
            onClick={() => setActiveToolIndex(index)}
          >
            <tool.icon className={cn(
              "w-5 h-5 mb-1.5", 
              index === activeToolIndex ? "text-editor-accent" : ""
            )} />
            <span className="text-xs">{tool.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
