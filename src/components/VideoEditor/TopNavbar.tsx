
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Share, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const TopNavbar: React.FC = () => {
  return (
    <div className="flex items-center justify-between px-4 h-12 bg-editor-darker border-b border-editor-border">
      {/* Left side - Logo */}
      <div className="flex items-center">
        <div className="text-primary font-bold text-lg">CopCut</div>
      </div>
      
      {/* Center - Project name */}
      <div className="flex items-center">
        <Input 
          defaultValue="Untitled Project" 
          className="h-8 w-56 text-sm bg-transparent border-none focus-visible:ring-1 focus-visible:ring-primary text-center"
        />
        <div className="flex items-center ml-2 text-xs text-gray-400">
          <span className="bg-green-500 rounded-full w-1.5 h-1.5 mr-1.5 pulse"></span>
          Auto-saved
        </div>
      </div>
      
      {/* Right side - Actions */}
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" className="text-xs h-8 hover:bg-primary/10">
          <Save className="w-3.5 h-3.5 mr-1.5" />
          Save
        </Button>
        <Button variant="ghost" size="sm" className="text-xs h-8 hover:bg-primary/10">
          <Share className="w-3.5 h-3.5 mr-1.5" />
          Share
        </Button>
        <Button size="sm" className="text-xs h-8 bg-primary hover:bg-primary/90">
          <Download className="w-3.5 h-3.5 mr-1.5" />
          Export
        </Button>
      </div>
    </div>
  );
};
