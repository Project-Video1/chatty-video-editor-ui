
import React, { useState } from 'react';
import { Play, ChevronDown, Plus, Scissors, Lock, Eye, EyeOff, Music, Video, Text, Layers } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';

type TrackType = 'video' | 'audio' | 'text' | 'effects';

interface Track {
  id: number;
  name: string;
  type: TrackType;
  visible: boolean;
  locked: boolean;
  clips: {
    id: number;
    start: number; // start time in seconds
    duration: number; // duration in seconds
    color: string;
    name: string;
  }[];
}

export const Timeline: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [showAllTracks, setShowAllTracks] = useState(true);
  
  const totalDuration = 30; // seconds
  const ticksCount = Math.ceil(totalDuration * zoom);
  
  const [tracks, setTracks] = useState<Track[]>([
    {
      id: 1,
      name: "Main Video",
      type: "video",
      visible: true,
      locked: false,
      clips: [
        { id: 101, start: 0, duration: 8, color: "bg-blue-500", name: "Intro" },
        { id: 102, start: 10, duration: 5, color: "bg-blue-600", name: "Scene 1" },
        { id: 103, start: 16, duration: 8, color: "bg-blue-500", name: "Outro" }
      ]
    },
    {
      id: 2,
      name: "Overlay",
      type: "video",
      visible: true,
      locked: false,
      clips: [
        { id: 201, start: 2, duration: 6, color: "bg-green-500", name: "B-Roll" }
      ]
    },
    {
      id: 3,
      name: "Sound Effects",
      type: "audio",
      visible: true,
      locked: false,
      clips: [
        { id: 301, start: 1, duration: 2, color: "bg-amber-500", name: "Whoosh" },
        { id: 302, start: 15, duration: 3, color: "bg-amber-600", name: "Transition" }
      ]
    },
    {
      id: 4,
      name: "Music",
      type: "audio",
      visible: true,
      locked: false,
      clips: [
        { id: 401, start: 0, duration: 24, color: "bg-purple-500", name: "Background Music" }
      ]
    },
    {
      id: 5,
      name: "Titles",
      type: "text",
      visible: true,
      locked: false,
      clips: [
        { id: 501, start: 1, duration: 5, color: "bg-pink-500", name: "Main Title" },
        { id: 502, start: 22, duration: 6, color: "bg-pink-600", name: "Credits" }
      ]
    }
  ]);

  const generateTimeMarkers = () => {
    const markers = [];
    const interval = zoom >= 2 ? 1 : 5;
    
    for (let i = 0; i <= ticksCount; i += interval) {
      markers.push(
        <div key={i} className="flex flex-col items-center">
          <div className="timeline-tick"></div>
          <div className="timeline-tick-label">{i}.00s</div>
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
      case 'video': return <Video className="w-3.5 h-3.5" />;
      case 'audio': return <Music className="w-3.5 h-3.5" />;
      case 'text': return <Text className="w-3.5 h-3.5" />;
      case 'effects': return <Layers className="w-3.5 h-3.5" />;
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

  const calculateClipPosition = (start: number, duration: number) => {
    const pixelsPerSecond = 40 * zoom;
    const left = start * pixelsPerSecond;
    const width = duration * pixelsPerSecond;
    
    return {
      left: `${left}px`,
      width: `${width}px`
    };
  };

  return (
    <div className="h-64 border-t border-editor-border flex flex-col bg-editor-dark">
      {/* Timeline header */}
      <div className="flex items-center justify-between px-4 py-2 bg-editor-darker border-b border-editor-border">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="h-8">
            <Play className="w-4 h-4 mr-1" />
            Play
          </Button>
          <span className="text-xs text-gray-400">
            {formatTime(currentTime)} / {formatTime(totalDuration)}
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <ToggleGroup type="single" value={zoom.toString()}>
            <ToggleGroupItem 
              value="0.5" 
              onClick={() => setZoom(0.5)} 
              className="text-xs h-7 px-2"
            >
              0.5x
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="1" 
              onClick={() => setZoom(1)} 
              className="text-xs h-7 px-2"
            >
              1x
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="2" 
              onClick={() => setZoom(2)} 
              className="text-xs h-7 px-2"
            >
              2x
            </ToggleGroupItem>
          </ToggleGroup>
          
          <Button variant="outline" size="sm" className="h-7 text-xs">
            <Plus className="w-3.5 h-3.5 mr-1" />
            Track
          </Button>
          
          <Button variant="outline" size="sm" className="h-7 text-xs">
            <Scissors className="w-3.5 h-3.5 mr-1" />
            Split
          </Button>
        </div>
      </div>
      
      {/* Timeline content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Time markers */}
        <div className="h-8 border-b border-editor-border flex items-end px-4 bg-editor-darker">
          <div className="flex space-x-[40px]">
            {generateTimeMarkers()}
          </div>
        </div>
        
        {/* Timeline tracks */}
        <div className="flex-1 overflow-hidden flex">
          {/* Track labels */}
          <div className="w-48 border-r border-editor-border flex flex-col bg-editor-darker overflow-y-auto">
            <div className="p-2 border-b border-editor-border flex items-center justify-between">
              <span className="text-xs font-medium">Tracks</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6" 
                onClick={() => setShowAllTracks(!showAllTracks)}
              >
                <ChevronDown className={`w-4 h-4 transition-transform ${showAllTracks ? '' : 'rotate-180'}`} />
              </Button>
            </div>
            
            {tracks.map((track) => (
              <div 
                key={track.id}
                className="h-10 border-b border-editor-border flex items-center px-2 group"
              >
                <div className="flex items-center space-x-1.5 w-full">
                  <div className={`w-5 h-5 rounded flex items-center justify-center ${
                    track.type === 'video' ? 'bg-blue-500/20 text-blue-500' :
                    track.type === 'audio' ? 'bg-purple-500/20 text-purple-500' :
                    track.type === 'text' ? 'bg-pink-500/20 text-pink-500' : 'bg-green-500/20 text-green-500'
                  }`}>
                    {getTrackTypeIcon(track.type)}
                  </div>
                  <span className="text-xs flex-1 truncate">{track.name}</span>
                  
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6" 
                      onClick={() => toggleTrackVisibility(track.id)}
                    >
                      {track.visible ? (
                        <Eye className="w-3.5 h-3.5" />
                      ) : (
                        <EyeOff className="w-3.5 h-3.5 text-gray-500" />
                      )}
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6" 
                      onClick={() => toggleTrackLock(track.id)}
                    >
                      <Lock className={`w-3.5 h-3.5 ${track.locked ? 'text-editor-accent' : 'text-gray-500'}`} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Timeline tracks content */}
          <div className="flex-1 overflow-auto relative">
            {/* Current time indicator */}
            <div 
              className="absolute h-full w-0.5 bg-editor-accent top-0 z-10 pointer-events-none"
              style={{ left: `${currentTime * 40 * zoom}px` }}
            ></div>
            
            {/* Track contents */}
            <div style={{ width: `${totalDuration * 40 * zoom}px` }}>
              {tracks.map((track) => (
                <div 
                  key={track.id} 
                  className="h-10 border-b border-editor-border relative flex items-center"
                >
                  {track.clips.map((clip) => (
                    <div 
                      key={clip.id}
                      className={cn(
                        "absolute h-7 top-1.5 rounded-sm flex items-center px-2 cursor-pointer",
                        clip.color,
                        track.locked ? "opacity-60" : "opacity-90 hover:opacity-100"
                      )}
                      style={calculateClipPosition(clip.start, clip.duration)}
                    >
                      <span className="text-xs text-white truncate">{clip.name}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            
            {/* Empty state message - show only if no clips */}
            {tracks.every(track => track.clips.length === 0) && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-gray-500 flex flex-col items-center">
                <Plus className="w-8 h-8 border-2 border-dashed border-gray-600 rounded-full p-1" />
                <div className="text-sm mt-2">Drag media here to create your timeline</div>
              </div>
            )}
          </div>
        </div>
        
        {/* Timeline scrubber */}
        <div className="h-6 px-48 bg-editor-darker border-t border-editor-border">
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
