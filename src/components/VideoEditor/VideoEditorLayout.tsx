
import React from 'react';
import { TopNavbar } from './TopNavbar';
import { LeftSidebar } from './LeftSidebar';
import { AssetLibrary } from './AssetLibrary';
import { PreviewArea } from './PreviewArea';
import { ChatInterface } from './ChatInterface';
import { Timeline } from './Timeline';

const VideoEditorLayout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen w-screen bg-editor-dark text-white overflow-hidden">
      {/* Top Navigation Bar */}
      <TopNavbar />
      
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar with Tools */}
        <LeftSidebar />
        
        {/* Middle Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Asset Library and Preview */}
          <div className="flex flex-1 overflow-hidden">
            {/* Asset Library / Media */}
            <AssetLibrary />
            
            {/* Preview Area */}
            <PreviewArea />
            
            {/* Chat Interface */}
            <ChatInterface />
          </div>
          
          {/* Timeline */}
          <Timeline />
        </div>
      </div>
    </div>
  );
};

export default VideoEditorLayout;
