
import React from 'react';
import { MoreHorizontal, Play } from 'lucide-react';

export const Timeline: React.FC = () => {
  const generateTimeMarkers = () => {
    const markers = [];
    for (let i = 0; i <= 5; i++) {
      markers.push(
        <div key={i} className="flex flex-col items-center">
          <div className="timeline-tick"></div>
          <div className="timeline-tick-label">{i}.00s</div>
        </div>
      );
    }
    return markers;
  };

  return (
    <div className="h-48 border-t border-editor-border flex flex-col">
      {/* Timeline header */}
      <div className="flex items-center justify-between px-4 py-2 bg-editor-darker border-b border-editor-border">
        <Play className="w-4 h-4" />
        <div className="text-xs text-gray-400">00:03:09 / 00:05:00</div>
        <div className="flex space-x-2">
          <button className="text-xs border border-editor-border rounded px-2 py-0.5 bg-editor-dark">
            1x
          </button>
          <button className="hover:bg-editor-dark p-1 rounded">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Timeline content */}
      <div className="flex-1 bg-editor-dark overflow-hidden flex flex-col">
        {/* Time markers */}
        <div className="h-8 border-b border-editor-border flex items-end px-4">
          <div className="flex justify-between w-full">
            {generateTimeMarkers()}
          </div>
        </div>
        
        {/* Timeline tracks */}
        <div className="flex-1 overflow-y-auto relative">
          {/* Current time indicator */}
          <div 
            className="absolute h-full w-px bg-red-500 left-1/4 top-0 z-10"
            style={{ left: '80px' }}
          ></div>
          
          {/* Video tracks */}
          {[1, 2, 3, 4, 5].map((track) => (
            <div 
              key={track} 
              className="video-layer flex items-center border-b border-editor-border px-4 hover:bg-editor-darker"
            >
              <div className="w-6 text-xs text-gray-500">{track}</div>
              <div className="flex-1 h-full relative">
                {track === 1 && (
                  <div 
                    className="absolute h-5/6 top-[7%] rounded bg-blue-500/20 border border-blue-500/40"
                    style={{ left: '40px', width: '120px' }}
                  ></div>
                )}
              </div>
            </div>
          ))}
          
          {/* Empty state message */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-gray-500 flex flex-col items-center">
            <div className="w-8 h-8 border-2 border-gray-600 rounded flex items-center justify-center mb-2">
              <MoreHorizontal className="w-4 h-4" />
            </div>
            <div className="text-sm">Drag material here and start to create</div>
          </div>
        </div>
      </div>
    </div>
  );
};
