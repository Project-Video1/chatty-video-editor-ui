
import React from 'react';
import { Search, Grid, List, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const AssetLibrary: React.FC = () => {
  return (
    <div className="w-72 bg-editor-darker border-r border-editor-border flex flex-col">
      {/* Search */}
      <div className="p-3 border-b border-editor-border">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Search project, subjects in image, lines" 
            className="pl-9 bg-editor-dark border-editor-border text-sm"
          />
        </div>
      </div>
      
      {/* Filter/Sort */}
      <div className="flex justify-between items-center px-3 py-2 border-b border-editor-border">
        <div className="flex items-center space-x-1">
          <div className="bg-editor-accent/20 text-editor-accent rounded-full p-1">
            <Import className="w-4 h-4" />
          </div>
          <span className="text-sm">Import</span>
        </div>
        
        <div className="flex items-center space-x-1">
          <button className="p-1 hover:bg-editor-border rounded">
            <Grid className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-editor-border rounded">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-editor-border rounded text-xs border border-editor-border px-2">
            All
          </button>
        </div>
      </div>
      
      {/* Media Items */}
      <div className="p-3 flex-1 overflow-y-auto">
        <div className="text-sm text-gray-400 mb-2">All</div>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="relative group">
            <div className="absolute top-1 right-1 text-xs bg-black/70 px-1 rounded">
              00:16
            </div>
            <img 
              src="https://via.placeholder.com/150" 
              alt="Video thumbnail" 
              className="w-full aspect-video object-cover rounded border border-editor-border"
            />
            <div className="text-xs text-gray-400 mt-1">one.mp4</div>
          </div>
        </div>
      </div>
    </div>
  );
};
