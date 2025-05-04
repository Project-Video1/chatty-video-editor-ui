
import React from 'react';
import { FileVideo, Radio, Text, Sticker, Layers, Sliders, Music, Video } from 'lucide-react';

export const LeftSidebar: React.FC = () => {
  const tools = [
    { icon: FileVideo, label: 'Import' },
    { icon: Music, label: 'Audio' },
    { icon: Text, label: 'Text' },
    { icon: Sticker, label: 'Stickers' },
    { icon: Video, label: 'Effects' },
    { icon: Sliders, label: 'Transitions' },
    { icon: Layers, label: 'Captions' },
    { icon: Radio, label: 'Filters' },
  ];

  return (
    <div className="w-20 bg-editor-darker border-r border-editor-border flex flex-col items-center py-2">
      {tools.map((tool, index) => (
        <div 
          key={index}
          className={`flex flex-col items-center justify-center w-full py-3 px-2 cursor-pointer hover:bg-editor-dark ${
            index === 0 ? 'bg-editor-dark/50' : ''
          }`}
        >
          <tool.icon className="w-5 h-5 mb-1" />
          <span className="text-xs text-gray-400">{tool.label}</span>
        </div>
      ))}
    </div>
  );
};
