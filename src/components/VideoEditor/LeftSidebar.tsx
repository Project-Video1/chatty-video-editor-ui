
import React from 'react';
import { Import, Audio, Text, Stickers, Effects, Transitions, Layers, Sliders } from 'lucide-react';

export const LeftSidebar: React.FC = () => {
  const tools = [
    { icon: Import, label: 'Import' },
    { icon: Audio, label: 'Audio' },
    { icon: Text, label: 'Text' },
    { icon: Stickers, label: 'Stickers' },
    { icon: Effects, label: 'Effects' },
    { icon: Transitions, label: 'Transitions' },
    { icon: Layers, label: 'Captions' },
    { icon: Sliders, label: 'Filters' },
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
