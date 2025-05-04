import React, { useState } from 'react';
import { Search, Grid, List, SlidersHorizontal, Upload, Clock, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Mock media items for demonstration
const mediaItems = [
  { id: 1, name: "intro.mp4", duration: "00:16", type: "video", selected: false },
  { id: 2, name: "interview.mp4", duration: "02:34", type: "video", selected: false },
  { id: 3, name: "background.jpg", type: "image", selected: false },
  { id: 4, name: "outro.mp4", duration: "00:28", type: "video", selected: false },
  { id: 5, name: "logo.png", type: "image", selected: false },
  { id: 6, name: "music.mp3", duration: "03:45", type: "audio", selected: false }
];

export const AssetLibrary: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [items, setItems] = useState(mediaItems);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleItemSelection = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };
  
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
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
        <TabsContent value="all" className="p-0 mt-0">
          <div className="p-2 flex-1 overflow-y-auto max-h-[calc(100vh-22rem)]">
            <div className="text-xs text-gray-400 mb-2 flex items-center justify-between">
              <span>Recently Added</span>
              <Clock className="w-3 h-3" />
            </div>
            
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 gap-2">
                {filteredItems.map((item) => (
                  <div 
                    key={item.id}
                    className={cn(
                      "relative group cursor-pointer hover:opacity-95 transition-all",
                      item.selected ? "ring-1 ring-editor-accent" : ""
                    )}
                    onClick={() => handleItemSelection(item.id)}
                  >
                    {item.duration && (
                      <div className="absolute top-1 right-1 text-[10px] bg-black/70 px-1 rounded">
                        {item.duration}
                      </div>
                    )}
                    <div className="relative">
                      <img 
                        src={`https://via.placeholder.com/150?text=${item.type}`}
                        alt={item.name}
                        className="w-full aspect-video object-cover rounded-sm border border-editor-border"
                      />
                      {item.selected && (
                        <div className="absolute top-1 left-1">
                          <CheckCircle className="w-3 h-3 text-editor-accent" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all"></div>
                    </div>
                    <div className="text-[10px] mt-1 flex items-center justify-between">
                      <span className="truncate">{item.name}</span>
                      <span className="text-[8px] text-gray-400 capitalize">{item.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-1">
                {filteredItems.map((item) => (
                  <div 
                    key={item.id}
                    className={cn(
                      "flex items-center p-1.5 rounded-sm hover:bg-editor-dark/50 cursor-pointer",
                      item.selected ? "bg-editor-dark/80" : ""
                    )}
                    onClick={() => handleItemSelection(item.id)}
                  >
                    <div className="w-8 h-8 mr-2 flex-shrink-0 rounded overflow-hidden border border-editor-border">
                      <img 
                        src={`https://via.placeholder.com/40?text=${item.type}`}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs truncate">{item.name}</div>
                      <div className="flex items-center text-[10px] text-gray-400">
                        <span className="capitalize">{item.type}</span>
                        {item.duration && (
                          <>
                            <span className="mx-1">•</span>
                            <span>{item.duration}</span>
                          </>
                        )}
                      </div>
                    </div>
                    {item.selected && (
                      <CheckCircle className="w-3 h-3 text-editor-accent ml-1" />
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {filteredItems.length === 0 && (
              <div className="text-center py-6 text-gray-400">
                <Search className="w-6 h-6 mx-auto mb-1 opacity-50" />
                <p className="text-xs">No matching assets found</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* Other tab contents */}
        <TabsContent value="videos" className="p-2 mt-0">
          <div className="text-center py-6 text-gray-400">
            <span className="text-xs">Video assets will appear here</span>
          </div>
        </TabsContent>
        
        <TabsContent value="images" className="p-2 mt-0">
          <div className="text-center py-6 text-gray-400">
            <span className="text-xs">Image assets will appear here</span>
          </div>
        </TabsContent>
        
        <TabsContent value="audio" className="p-2 mt-0">
          <div className="text-center py-6 text-gray-400">
            <span className="text-xs">Audio assets will appear here</span>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
