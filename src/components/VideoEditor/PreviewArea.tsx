
import React, { useState } from 'react';
import { Play, SkipBack, SkipForward, Settings, Volume2, RotateCcw, Volume1, VolumeX } from 'lucide-react';
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
      <div className="flex items-center justify-between px-4 py-3 border-b border-editor-border bg-editor-darker">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">Preview</span>
          <ToggleGroup type="single" defaultValue="video">
            <ToggleGroupItem value="video" size="sm">Video</ToggleGroupItem>
            <ToggleGroupItem value="audio" size="sm">Audio</ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="h-8 bg-transparent">
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            Undo
          </Button>
          <Toggle size="sm">
            <Settings className="w-3.5 h-3.5" />
          </Toggle>
        </div>
      </div>
      
      {/* Preview content */}
      <div className="flex-1 flex items-center justify-center bg-editor-darker relative">
        <div className="relative max-h-[80%] max-w-[90%] aspect-video rounded overflow-hidden shadow-xl border border-editor-border">
          <img 
            src="https://via.placeholder.com/1280x720?text=Video+Preview" 
            alt="Video preview" 
            className="w-full h-full object-contain"
          />
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <Button 
                className="rounded-full w-16 h-16 bg-white/20 hover:bg-white/30 backdrop-blur"
                onClick={togglePlay}
              >
                <Play className="w-7 h-7 text-white" />
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Preview controls */}
      <div className="px-5 py-4 flex flex-col border-t border-editor-border bg-editor-darker">
        {/* Progress bar */}
        <div className="px-2">
          <Slider 
            defaultValue={[0]} 
            max={totalDuration}
            step={0.1}
            value={[currentTime]}
            onValueChange={(val) => setCurrentTime(val[0])}
            className="mb-2"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-400">{formatTime(currentTime)}</div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="rounded-full w-8 h-8 p-0">
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost"
              className="rounded-full w-10 h-10 bg-editor-dark hover:bg-editor-border"
              onClick={togglePlay}
            >
              <Play className="w-5 h-5" />
            </Button>
            <Button variant="ghost" className="rounded-full w-8 h-8 p-0">
              <SkipForward className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <VolumeIcon className="w-4 h-4 text-gray-400" />
            <Slider
              defaultValue={[75]}
              max={100}
              value={[volume]}
              onValueChange={(val) => setVolume(val[0])}
              className="w-24"
            />
            <div className="text-xs text-gray-400">{formatTime(totalDuration)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
