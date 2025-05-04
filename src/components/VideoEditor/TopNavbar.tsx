
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Share, Download, Maximize2, Minus, X } from 'lucide-react';

export const TopNavbar: React.FC = () => {
  return (
    <div className="flex items-center justify-between px-4 h-12 bg-editor-darker border-b border-editor-border">
      {/* Left side - Logo and menu */}
      <div className="flex items-center space-x-4">
        <div className="text-editor-accent font-semibold text-lg">CopCut</div>
        <Button variant="ghost" className="text-xs h-8">Menu</Button>
        <div className="flex items-center text-xs text-gray-400">
          <span className="bg-green-500 rounded-full w-2 h-2 mr-2"></span>
          Auto saved: 20:07:48
        </div>
      </div>
      
      {/* Center - Project name */}
      <div className="text-sm">0503</div>
      
      {/* Right side - Actions */}
      <div className="flex items-center space-x-2">
        <Button variant="outline" className="text-xs h-8 bg-transparent">
          <Save className="w-4 h-4 mr-1" />
          Save Project
        </Button>
        <Button className="text-xs h-8 bg-editor-accent hover:bg-editor-accent/90">
          <Download className="w-4 h-4 mr-1" />
          Export
        </Button>
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <Minus className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <Maximize2 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
