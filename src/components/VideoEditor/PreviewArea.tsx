
import React from 'react';
import { Play, SkipBack, SkipForward, Settings } from 'lucide-react';

export const PreviewArea: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col">
      {/* Preview header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-editor-border">
        <div className="text-sm">Previewing — video</div>
        <Settings className="w-4 h-4" />
      </div>
      
      {/* Preview content */}
      <div className="flex-1 flex items-center justify-center bg-editor-darker relative">
        <img 
          src="https://via.placeholder.com/640x480" 
          alt="Video preview" 
          className="max-h-full max-w-full object-contain"
        />
      </div>
      
      {/* Preview controls */}
      <div className="px-4 py-2 flex items-center justify-between border-t border-editor-border bg-editor-darker">
        <div className="text-xs text-gray-400">00:00:00.000</div>
        
        <div className="flex items-center space-x-4">
          <button className="p-1 hover:bg-editor-border rounded">
            <SkipBack className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-editor-border rounded-full bg-editor-dark">
            <Play className="w-5 h-5" />
          </button>
          <button className="p-1 hover:bg-editor-border rounded">
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
        
        <div className="text-xs text-gray-400">00:00:16:00</div>
      </div>
    </div>
  );
};
