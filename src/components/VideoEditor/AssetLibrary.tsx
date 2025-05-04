import React, { useState } from 'react';
import { Search, Grid, List, SlidersHorizontal, Upload, Clock, X, CheckCircle } from 'lucide-react';
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
    <div className="w-80 bg-editor-darker border-r border-editor-border flex flex-col">
      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <div className="px-3 pt-3 pb-1 border-b border-editor-border">
          <TabsList className="w-full bg-editor-dark h-9 p-0.5">
            <TabsTrigger value="all" className="text-xs flex-1">All Assets</TabsTrigger>
            <TabsTrigger value="videos" className="text-xs flex-1">Videos</TabsTrigger>
            <TabsTrigger value="images" className="text-xs flex-1">Images</TabsTrigger>
            <TabsTrigger value="audio" className="text-xs flex-1">Audio</TabsTrigger>
          </TabsList>
        </div>
        
        {/* Search */}
        <div className="p-3 border-b border-editor-border">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search by name, tag or description..." 
              className="pl-9 bg-editor-dark border-editor-border text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Filter/Sort */}
        <div className="flex justify-between items-center px-3 py-2 border-b border-editor-border">
          <Button variant="outline" className="h-8 text-xs gap-1.5 bg-editor-dark hover:bg-editor-border">
            <Upload className="w-3.5 h-3.5" />
            Import
          </Button>
          
          <div className="flex items-center space-x-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn("h-8 w-8", viewMode === 'grid' ? "bg-editor-dark" : "")}
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn("h-8 w-8", viewMode === 'list' ? "bg-editor-dark" : "")}
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <SlidersHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Media Items */}
        <TabsContent value="all" className="p-0 mt-0">
          <div className="p-3 flex-1 overflow-y-auto max-h-[calc(100vh-24rem)]">
            <div className="text-xs text-gray-400 mb-2 flex items-center justify-between">
              <span>Recently Added</span>
              <Clock className="w-3.5 h-3.5" />
            </div>
            
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 gap-3">
                {filteredItems.map((item) => (
                  <div 
                    key={item.id}
                    className={cn(
                      "relative group cursor-pointer hover:opacity-95 transition-all",
                      item.selected ? "ring-2 ring-editor-accent ring-offset-1 ring-offset-editor-darker" : ""
                    )}
                    onClick={() => handleItemSelection(item.id)}
                  >
                    {item.duration && (
                      <div className="absolute top-1 right-1 text-xs bg-black/70 px-1 rounded">
                        {item.duration}
                      </div>
                    )}
                    <div className="relative">
                      <img 
                        src={`https://via.placeholder.com/150?text=${item.type}`}
                        alt={item.name}
                        className="w-full aspect-video object-cover rounded border border-editor-border"
                      />
                      {item.selected && (
                        <div className="absolute top-1 left-1">
                          <CheckCircle className="w-4 h-4 text-editor-accent" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all"></div>
                    </div>
                    <div className="text-xs mt-1.5 flex items-center justify-between">
                      <span className="truncate">{item.name}</span>
                      <span className="text-[10px] text-gray-400 capitalize">{item.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredItems.map((item) => (
                  <div 
                    key={item.id}
                    className={cn(
                      "flex items-center p-2 rounded hover:bg-editor-dark cursor-pointer",
                      item.selected ? "bg-editor-dark/80" : ""
                    )}
                    onClick={() => handleItemSelection(item.id)}
                  >
                    <div className="w-10 h-10 mr-3 flex-shrink-0 rounded overflow-hidden border border-editor-border">
                      <img 
                        src={`https://via.placeholder.com/40?text=${item.type}`}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm truncate">{item.name}</div>
                      <div className="flex items-center text-xs text-gray-400">
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
                      <CheckCircle className="w-4 h-4 text-editor-accent ml-2" />
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {filteredItems.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No items matching your search</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* Other tab contents would follow the same pattern */}
        <TabsContent value="videos" className="p-3 mt-0">
          <div className="text-center py-8 text-gray-400">
            <span>Video assets will appear here</span>
          </div>
        </TabsContent>
        
        <TabsContent value="images" className="p-3 mt-0">
          <div className="text-center py-8 text-gray-400">
            <span>Image assets will appear here</span>
          </div>
        </TabsContent>
        
        <TabsContent value="audio" className="p-3 mt-0">
          <div className="text-center py-8 text-gray-400">
            <span>Audio assets will appear here</span>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
