
import React, { useState, useRef, useEffect } from 'react';
import { Play, ChevronDown, Plus, Scissors, Lock, Eye, EyeOff, Music, Video, Text, Layers, Trash2, Undo, Redo } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

type TrackType = 'video' | 'audio' | 'text' | 'effects';

interface Track {
  id: number;
  name: string;
  type: TrackType;
  visible: boolean;
  locked: boolean;
}

export const Timeline: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [showAllTracks, setShowAllTracks] = useState(true);
  const [hoverPosition, setHoverPosition] = useState<number | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  const totalDuration = 30; // seconds
  const ticksCount = Math.ceil(totalDuration * zoom);
  
  const [tracks, setTracks] = useState<Track[]>([
    {
      id: 1,
      name: "Main Video",
      type: "video",
      visible: true,
      locked: false,
    },
    {
      id: 2,
      name: "B-Roll",
      type: "video",
      visible: true,
      locked: false,
    },
    {
      id: 3,
      name: "Sound FX",
      type: "audio",
      visible: true,
      locked: false,
    },
    {
      id: 4,
      name: "Music",
      type: "audio",
      visible: true,
      locked: false,
    },
  ]);
  
  // Track mouse position on timeline
  const handleMouseMove = (e: React.MouseEvent) => {
    if (timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      // Convert x position to time value
      const timePosition = (x / (timelineRef.current.scrollWidth)) * totalDuration * zoom;
      setHoverPosition(Math.max(0, Math.min(timePosition, totalDuration)));
    }
  };
  
  const handleMouseLeave = () => {
    setHoverPosition(null);
  };

  const generateTimeMarkers = () => {
    const markers = [];
    const interval = zoom >= 2 ? 1 : 5;
    
    for (let i = 0; i <= ticksCount; i += interval) {
      markers.push(
        <div key={i} className="flex flex-col items-center">
          <div className="h-2 border-l border-gray-600 w-[1px]"></div>
          <div className="text-[10px] text-gray-400">{i}s</div>
        </div>
      );
    }
    return markers;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTrackTypeIcon = (type: TrackType) => {
    switch(type) {
      case 'video': return <Video className="w-3 h-3" />;
      case 'audio': return <Music className="w-3 h-3" />;
      case 'text': return <Text className="w-3 h-3" />;
      case 'effects': return <Layers className="w-3 h-3" />;
      default: return null;
    }
  };

  const toggleTrackVisibility = (trackId: number) => {
    setTracks(tracks.map(track => 
      track.id === trackId ? { ...track, visible: !track.visible } : track
    ));
  };

  const toggleTrackLock = (trackId: number) => {
    setTracks(tracks.map(track => 
      track.id === trackId ? { ...track, locked: !track.locked } : track
    ));
  };

  const handleTrim = () => {
    console.log("Trim at position:", currentTime);
    // Trim functionality would be implemented here
  };
  
  const handleDelete = () => {
    console.log("Delete selection");
    // Delete functionality would be implemented here
  };
  
  const handleUndo = () => {
    console.log("Undo last action");
    // Undo functionality would be implemented here
  };
  
  const handleRedo = () => {
    console.log("Redo last action");
    // Redo functionality would be implemented here
  };

  return (
    <div className="h-56 border-t border-editor-border flex flex-col bg-editor-dark">
      {/* Timeline header */}
      <div className="flex items-center justify-between px-3 py-1 bg-editor-darker border-b border-editor-border">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="h-6 text-xs px-2 hover:bg-primary/10">
            <Play className="w-3 h-3 mr-1" />
            Play
          </Button>
          <span className="text-[10px] text-gray-400">
            {formatTime(currentTime)} / {formatTime(totalDuration)}
          </span>
          
          {/* Added new editing tools */}
          <div className="h-4 border-r border-gray-600 mx-1"></div>
          
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-1 hover:bg-primary/10" onClick={handleTrim}>
                  <Scissors className="w-3.5 h-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Trim clip</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-1 hover:bg-primary/10" onClick={handleDelete}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete selection</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-1 hover:bg-primary/10" onClick={handleUndo}>
                  <Undo className="w-3.5 h-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Undo</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-1 hover:bg-primary/10" onClick={handleRedo}>
                  <Redo className="w-3.5 h-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Redo</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex items-center space-x-2">
          <ToggleGroup type="single" value={zoom.toString()} size="sm">
            <ToggleGroupItem 
              value="0.5" 
              onClick={() => setZoom(0.5)} 
              className="text-[10px] h-6 px-2"
            >
              0.5x
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="1" 
              onClick={() => setZoom(1)} 
              className="text-[10px] h-6 px-2"
            >
              1x
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="2" 
              onClick={() => setZoom(2)} 
              className="text-[10px] h-6 px-2"
            >
              2x
            </ToggleGroupItem>
          </ToggleGroup>
          
          <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 hover:bg-primary/10">
            <Plus className="w-3 h-3 mr-1" />
            Track
          </Button>
          
          <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 hover:bg-primary/10">
            <Scissors className="w-3 h-3 mr-1" />
            Split
          </Button>
        </div>
      </div>
      
      {/* Timeline content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Time markers */}
        <div className="h-6 border-b border-editor-border flex items-end px-3 bg-editor-darker">
          <div className="flex space-x-[40px]">
            {generateTimeMarkers()}
          </div>
        </div>
        
        {/* Timeline tracks */}
        <div className="flex-1 overflow-hidden flex">
          {/* Track labels */}
          <div className="w-36 border-r border-editor-border flex flex-col bg-editor-darker overflow-y-auto">
            <div className="p-1 border-b border-editor-border flex items-center justify-between">
              <span className="text-[10px] font-medium">Tracks</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-5 w-5" 
                onClick={() => setShowAllTracks(!showAllTracks)}
              >
                <ChevronDown className={`w-3 h-3 transition-transform ${showAllTracks ? '' : 'rotate-180'}`} />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {tracks.map((track) => (
                <div 
                  key={track.id}
                  className="h-8 border-b border-editor-border flex items-center px-1.5 group"
                >
                  <div className="flex items-center space-x-1 w-full">
                    <div className={cn(
                      "w-4 h-4 rounded flex items-center justify-center",
                      track.type === 'video' ? 'bg-blue-500/20 text-blue-500' :
                      track.type === 'audio' ? 'bg-purple-500/20 text-purple-500' :
                      track.type === 'text' ? 'bg-pink-500/20 text-pink-500' : 'bg-green-500/20 text-green-500'
                    )}>
                      {getTrackTypeIcon(track.type)}
                    </div>
                    <span className="text-[10px] flex-1 truncate">{track.name}</span>
                    
                    <div className="flex items-center space-x-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-5 w-5" 
                        onClick={() => toggleTrackVisibility(track.id)}
                      >
                        {track.visible ? (
                          <Eye className="w-3 h-3" />
                        ) : (
                          <EyeOff className="w-3 h-3 text-gray-500" />
                        )}
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-5 w-5" 
                        onClick={() => toggleTrackLock(track.id)}
                      >
                        <Lock className={cn("w-3 h-3", track.locked ? "text-primary" : "text-gray-500")} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 border-t border-editor-border rounded-none justify-start text-[10px] text-primary"
              onClick={() => {
                const newTrackId = tracks.length + 1;
                setTracks([...tracks, {
                  id: newTrackId,
                  name: `Track ${newTrackId}`,
                  type: 'video',
                  visible: true,
                  locked: false
                }]);
              }}
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Add Track
            </Button>
          </div>
          
          {/* Timeline tracks content */}
          <div 
            ref={timelineRef}
            className="flex-1 overflow-auto relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Current time indicator */}
            <div 
              className="absolute h-full w-px bg-primary z-10 pointer-events-none"
              style={{ left: `${currentTime * 40 * zoom}px` }}
            ></div>
            
            {/* Hover time indicator */}
            {hoverPosition !== null && (
              <div 
                className="absolute h-full w-px bg-white/30 z-5 pointer-events-none"
                style={{ left: `${hoverPosition * 40 * zoom}px` }}
              ></div>
            )}
            
            {/* Track contents */}
            <div style={{ width: `${totalDuration * 40 * zoom}px` }} className="h-full">
              {tracks.map((track) => (
                <div 
                  key={track.id} 
                  className="h-8 border-b border-editor-border relative flex items-center"
                >
                  {/* Show empty track with dashed border for drag and drop */}
                  <div className="absolute w-full h-6 border border-dashed border-editor-border rounded-sm mx-1 my-1"></div>
                </div>
              ))}
            </div>
            
            {/* Empty state message - show only if no tracks */}
            {tracks.length === 0 && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-gray-500 flex flex-col items-center">
                <Plus className="w-6 h-6 border-2 border-dashed border-gray-600 rounded-full p-1" />
                <div className="text-xs mt-1">Drag media to create timeline</div>
              </div>
            )}
          </div>
        </div>
        
        {/* Timeline scrubber - removed the scroll button */}
        <div className="h-5 px-36 bg-editor-darker border-t border-editor-border">
          <Slider
            value={[currentTime]}
            max={totalDuration}
            step={0.01}
            onValueChange={(values) => setCurrentTime(values[0])}
          />
        </div>
      </div>
    </div>
  );
};
