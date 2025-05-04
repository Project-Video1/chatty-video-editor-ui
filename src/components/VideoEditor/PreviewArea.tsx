
import React, { useState } from 'react';
import { Play, SkipBack, SkipForward, Settings, Volume2, Volume1, VolumeX, Pause } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const PreviewArea: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(75);
  const [currentTime, setCurrentTime] = useState(0);
  const totalDuration = 16; // in seconds
  
  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const VolumeIcon = volume === 0 ? VolumeX : volume < 50 ? Volume1 : Volume2;

  return (
    <div className="flex-1 flex flex-col bg-editor-dark">
      {/* Preview header */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-editor-border bg-editor-darker">
        <div className="flex items-center space-x-2">
          <span className="text-xs">Preview</span>
          <ToggleGroup type="single" defaultValue="video" size="sm">
            <ToggleGroupItem value="video" className="text-xs h-6 px-2">Video</ToggleGroupItem>
            <ToggleGroupItem value="audio" className="text-xs h-6 px-2">Audio</ToggleGroupItem>
          </ToggleGroup>
        </div>
        <Toggle size="sm" className="h-6 w-6">
          <Settings className="w-3.5 h-3.5" />
        </Toggle>
      </div>
      
      {/* Preview content */}
      <div className="flex-1 flex items-center justify-center bg-editor-darker/30 relative">
        <div className="relative max-h-[80%] max-w-[90%] aspect-video rounded-md overflow-hidden border border-editor-border bg-black shadow-lg">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-editor-darker to-black">
            <div className="text-white/70 text-lg">Preview Area</div>
          </div>
          
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity">
              <Button 
                className="rounded-full w-12 h-12 bg-primary/30 hover:bg-primary/50 backdrop-blur-sm"
                onClick={togglePlay}
              >
                <Play className="w-5 h-5 text-white ml-1" />
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Preview controls */}
      <div className="px-3 py-2 flex flex-col border-t border-editor-border bg-editor-darker">
        {/* Progress bar */}
        <div>
          <Slider 
            defaultValue={[0]} 
            max={totalDuration}
            step={0.1}
            value={[currentTime]}
            onValueChange={(val) => setCurrentTime(val[0])}
            className="mb-1.5"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-400">{formatTime(currentTime)}</div>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" className="rounded-full w-7 h-7 p-0 hover:bg-primary/10">
              <SkipBack className="w-3.5 h-3.5" />
            </Button>
            <Button 
              variant="ghost"
              className="rounded-full w-8 h-8 bg-editor-dark hover:bg-primary/20"
              onClick={togglePlay}
            >
              {isPlaying ? 
                <Pause className="w-4 h-4" /> : 
                <Play className="w-4 h-4" />
              }
            </Button>
            <Button variant="ghost" className="rounded-full w-7 h-7 p-0 hover:bg-primary/10">
              <SkipForward className="w-3.5 h-3.5" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-1.5">
            <VolumeIcon className="w-3.5 h-3.5 text-gray-400" />
            <Slider
              defaultValue={[75]}
              max={100}
              value={[volume]}
              onValueChange={(val) => setVolume(val[0])}
              className="w-20"
            />
            <div className="text-xs text-gray-400">{formatTime(totalDuration)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
