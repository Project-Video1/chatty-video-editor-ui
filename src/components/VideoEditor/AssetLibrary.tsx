import React, { useState } from 'react';
import { Search, Grid, List, SlidersHorizontal, Upload, Clock, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

export const AssetLibrary: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleItemSelection = (id: number) => {
    // This would update the selected items in a real app
    console.log(`Asset ${id} selected`);
  };
  
  return (
    <div className="w-64 bg-editor-darker border-r border-editor-border flex flex-col">
      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <div className="px-2 pt-2 pb-1 border-b border-editor-border">
          <TabsList className="w-full bg-editor-dark h-8 p-0.5 grid grid-cols-4">
            <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
            <TabsTrigger value="videos" className="text-xs">Videos</TabsTrigger>
            <TabsTrigger value="images" className="text-xs">Images</TabsTrigger>
            <TabsTrigger value="audio" className="text-xs">Audio</TabsTrigger>
          </TabsList>
        </div>
        
        {/* Search */}
        <div className="p-2 border-b border-editor-border">
          <div className="relative">
            <Search className="absolute left-2 top-2 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search assets..." 
              className="pl-8 h-8 bg-editor-dark border-editor-border text-xs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Filter/Sort */}
        <div className="flex justify-between items-center px-2 py-1.5 border-b border-editor-border">
          <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 bg-editor-dark hover:bg-editor-border px-2">
            <Upload className="w-3 h-3" />
            Import
          </Button>
          
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn("h-7 w-7", viewMode === 'grid' ? "bg-editor-dark/70" : "")}
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-3.5 h-3.5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn("h-7 w-7", viewMode === 'list' ? "bg-editor-dark/70" : "")}
              onClick={() => setViewMode('list')}
            >
              <List className="w-3.5 h-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
        
        {/* Media Items */}
        <TabsContent value="all" className="p-0 mt-0 flex-1">
          <ScrollArea className="h-[calc(100vh-22rem)]">
            <div className="p-2">
              <div className="text-xs text-gray-400 mb-2 flex items-center justify-between">
                <span>Recent Uploads</span>
                <Clock className="w-3 h-3" />
              </div>
              
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 gap-2">
                  <MediaItem id={1} type="video" viewMode="grid" onSelect={handleItemSelection} />
                  <MediaItem id={2} type="image" viewMode="grid" onSelect={handleItemSelection} />
                  <MediaItem id={3} type="video" viewMode="grid" onSelect={handleItemSelection} />
                  <MediaItem id={4} type="audio" viewMode="grid" onSelect={handleItemSelection} />
                </div>
              ) : (
                <div className="space-y-1">
                  <MediaItem id={1} type="video" viewMode="list" onSelect={handleItemSelection} />
                  <MediaItem id={2} type="image" viewMode="list" onSelect={handleItemSelection} />
                  <MediaItem id={3} type="video" viewMode="list" onSelect={handleItemSelection} />
                  <MediaItem id={4} type="audio" viewMode="list" onSelect={handleItemSelection} />
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
        
        {/* Other tab contents */}
        <TabsContent value="videos" className="p-0 mt-0 flex-1">
          <ScrollArea className="h-[calc(100vh-22rem)]">
            <div className="p-2">
              <MediaItem id={1} type="video" viewMode={viewMode} onSelect={handleItemSelection} />
              <MediaItem id={3} type="video" viewMode={viewMode} onSelect={handleItemSelection} />
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="images" className="p-0 mt-0 flex-1">
          <ScrollArea className="h-[calc(100vh-22rem)]">
            <div className="p-2">
              <MediaItem id={2} type="image" viewMode={viewMode} onSelect={handleItemSelection} />
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="audio" className="p-0 mt-0 flex-1">
          <ScrollArea className="h-[calc(100vh-22rem)]">
            <div className="p-2">
              <MediaItem id={4} type="audio" viewMode={viewMode} onSelect={handleItemSelection} />
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface MediaItemProps {
  id: number;
  type: 'video' | 'image' | 'audio';
  viewMode: 'grid' | 'list';
  onSelect: (id: number) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ id, type, viewMode, onSelect }) => {
  const [selected, setSelected] = useState(false);
  
  const handleClick = () => {
    setSelected(!selected);
    onSelect(id);
  };
  
  const getMediaName = () => {
    switch (type) {
      case 'video':
        return `Video ${id}.mp4`;
      case 'image':
        return `Image ${id}.jpg`;
      case 'audio':
        return `Audio ${id}.mp3`;
      default:
        return `File ${id}`;
    }
  };
  
  const getDuration = () => {
    if (type === 'audio') return '03:24';
    if (type === 'video') return '00:32';
    return null;
  };
  
  const getIcon = () => {
    switch (type) {
      case 'video':
        return '🎬';
      case 'image':
        return '🖼️';
      case 'audio':
        return '🎵';
      default:
        return '📄';
    }
  };
  
  if (viewMode === 'grid') {
    return (
      <div 
        className={cn(
          "relative group cursor-pointer hover:opacity-95 transition-all",
          selected ? "ring-1 ring-primary" : ""
        )}
        onClick={handleClick}
      >
        {getDuration() && (
          <div className="absolute top-1 right-1 text-[10px] bg-black/70 px-1 rounded">
            {getDuration()}
          </div>
        )}
        <div className="relative">
          <div 
            className="w-full aspect-video rounded-sm border border-editor-border flex items-center justify-center bg-editor-dark overflow-hidden"
          >
            <span className="text-2xl">{getIcon()}</span>
          </div>
          {selected && (
            <div className="absolute top-1 left-1">
              <CheckCircle className="w-3 h-3 text-primary" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all"></div>
        </div>
        <div className="text-[10px] mt-1 flex items-center justify-between">
          <span className="truncate">{getMediaName()}</span>
          <span className="text-[8px] text-gray-400 capitalize">{type}</span>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      className={cn(
        "flex items-center p-1.5 rounded-sm hover:bg-editor-dark/50 cursor-pointer",
        selected ? "bg-editor-dark/80" : ""
      )}
      onClick={handleClick}
    >
      <div className="w-8 h-8 mr-2 flex-shrink-0 rounded overflow-hidden border border-editor-border bg-editor-dark flex items-center justify-center">
        <span>{getIcon()}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs truncate">{getMediaName()}</div>
        <div className="flex items-center text-[10px] text-gray-400">
          <span className="capitalize">{type}</span>
          {getDuration() && (
            <>
              <span className="mx-1">•</span>
              <span>{getDuration()}</span>
            </>
          )}
        </div>
      </div>
      {selected && (
        <CheckCircle className="w-3 h-3 text-primary ml-1" />
      )}
    </div>
  );
};
