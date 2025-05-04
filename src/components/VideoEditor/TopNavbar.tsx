
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Share, Download } from 'lucide-react';

export const TopNavbar: React.FC = () => {
  return (
    <div className="flex items-center justify-between px-4 h-12 bg-editor-darker border-b border-editor-border">
      {/* Left side - Logo */}
      <div className="flex items-center">
        <div className="text-editor-accent font-bold text-lg">CopCut</div>
      </div>
      
      {/* Center - Project name */}
      <div className="flex items-center">
        <div className="text-sm font-medium px-2 py-1 rounded-md hover:bg-editor-dark/50 cursor-pointer transition-all">
          Untitled Project
        </div>
        <div className="flex items-center ml-2 text-xs text-gray-400">
          <span className="bg-green-500 rounded-full w-1.5 h-1.5 mr-1.5"></span>
          Auto-saved
        </div>
      </div>
      
      {/* Right side - Actions */}
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" className="text-xs h-8">
          <Save className="w-3.5 h-3.5 mr-1.5" />
          Save
        </Button>
        <Button variant="ghost" size="sm" className="text-xs h-8">
          <Share className="w-3.5 h-3.5 mr-1.5" />
          Share
        </Button>
        <Button size="sm" className="text-xs h-8 bg-editor-accent hover:bg-editor-accent/90">
          <Download className="w-3.5 h-3.5 mr-1.5" />
          Export
        </Button>
      </div>
    </div>
  );
};
