
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Share, Download } from 'lucide-react';

export const TopNavbar: React.FC = () => {
  return (
    <div className="flex items-center justify-between px-6 h-14 bg-editor-darker border-b border-editor-border">
      {/* Left side - Logo and menu */}
      <div className="flex items-center space-x-4">
        <div className="text-editor-accent font-bold text-xl">CopCut</div>
        <div className="flex items-center space-x-6">
          <Button variant="ghost" className="text-xs h-8">Projects</Button>
          <Button variant="ghost" className="text-xs h-8">Templates</Button>
          <Button variant="ghost" className="text-xs h-8">Help</Button>
        </div>
      </div>
      
      {/* Center - Project name */}
      <div className="flex items-center">
        <div className="text-sm font-medium px-3 py-1 bg-editor-dark/70 rounded-md hover:bg-editor-dark cursor-pointer">
          Untitled Project
        </div>
        <div className="flex items-center ml-3 text-xs text-gray-400">
          <span className="bg-green-500 rounded-full w-2 h-2 mr-2"></span>
          Auto saved: 20:07:48
        </div>
      </div>
      
      {/* Right side - Actions */}
      <div className="flex items-center space-x-3">
        <Button variant="outline" className="text-xs h-9 bg-transparent">
          <Save className="w-4 h-4 mr-1" />
          Save Project
        </Button>
        <Button variant="outline" className="text-xs h-9 bg-transparent">
          <Share className="w-4 h-4 mr-1" />
          Share
        </Button>
        <Button className="text-xs h-9 bg-editor-accent hover:bg-editor-accent/90">
          <Download className="w-4 h-4 mr-1" />
          Export
        </Button>
      </div>
    </div>
  );
};
