import { useState, useEffect } from "react";
import { 
  DragDropContext, 
  Droppable, 
  Draggable 
} from "@hello-pangea/dnd";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { 
  Plus, 
  GripVertical, 
  Trash2, 
  Edit3, 
  Save,
  X,
  Calendar
} from "lucide-react";
import MediaSelector from "./MediaSelector";
import { useMedia } from "../hooks/useMedia";

interface CarouselSlide {
  id?: string; // Temporary ID for new slides
  imageId: number;
  title?: string;
  text?: string;
  date?: string;
  ctaText?: string;
  ctaLink?: string;
}

interface CarouselJsonManagerProps {
  jsonContent: string;
  onChange: (content: string) => void;
}

export default function CarouselJsonManager({ jsonContent, onChange }: CarouselJsonManagerProps){
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [editingSlide, setEditingSlide] = useState<string | null>(null);
  const [editData, setEditData] = useState<CarouselSlide | null>(null);
  const { media, loading, error } = useMedia();

  // Parse JSON on mount and when content changes
  useEffect(() => {
    try {
      const parsed = JSON.parse(jsonContent || '[]');
      // Add temporary IDs for new slides
      const slidesWithIds = parsed.map((slide: any, index: number) => ({
        ...slide,
        id: slide.id || `temp-${index}-${Date.now()}`
      }));
      setSlides(slidesWithIds);
    } catch (e) {
      setSlides([]);
    }
  }, [jsonContent]);

  const getMediaById = (id: number) => {
    return media?.find(m => m.id === id) || null;
  }

  // Save changes back to JSON
  const saveChanges = (newSlides: CarouselSlide[]) => {
    try {
      // Remove temporary IDs before saving
      const slidesToSave = newSlides.map(slide => {
        const { id, ...rest } = slide;
        return rest;
      });
      
      const jsonString = JSON.stringify(slidesToSave, null, 2);
      onChange(jsonString);
    } catch (e) {
      console.error("Failed to save carousel JSON:", e);
    }
  };

  const handleAddSlide = () => {
    const newSlide: CarouselSlide = {
      id: `new-${Date.now()}`,
      imageId: 0,
      title: "New Slide Title",
      text: "Slide description text",
      ctaText: "LEARN MORE"
    };
    
    const newSlides = [...slides, newSlide];
    setSlides(newSlides);
    saveChanges(newSlides);
    setEditingSlide(newSlide.id!);
    setEditData({ ...newSlide });
  };

  const handleDeleteSlide = (slideId: string) => {
    if (window.confirm("Are you sure you want to delete this slide?")) {
      const newSlides = slides.filter(slide => slide.id !== slideId);
      setSlides(newSlides);
      saveChanges(newSlides);
      if (editingSlide === slideId) {
        setEditingSlide(null);
        setEditData(null);
      }
    }
  };

  const handleEditSlide = (slide: CarouselSlide) => {
    setEditingSlide(slide.id!);
    setEditData({ ...slide });
  };

  const handleSaveEdit = () => {
    if (!editData || !editingSlide) return;
    
    const newSlides = slides.map(slide => 
      slide.id === editingSlide ? editData : slide
    );
    
    setSlides(newSlides);
    saveChanges(newSlides);
    setEditingSlide(null);
    setEditData(null);
  };

  const handleCancelEdit = () => {
    setEditingSlide(null);
    setEditData(null);
  };

  const handleReorder = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(slides);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setSlides(items);
    saveChanges(items);
  };

  const handleEditChange = (field: keyof CarouselSlide, value: any) => {
    if (editData) {
      setEditData({ ...editData, [field]: value });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        <span className="ml-2 text-sm text-muted-foreground">Loading carousel slides...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-destructive/10 text-destructive rounded-md">
        <p className="text-sm">Failed to load media: {error}</p>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Carousel Slides</CardTitle>
        <Button onClick={handleAddSlide} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Slide
        </Button>
      </CardHeader>
      
      <CardContent>
        {slides.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No slides yet. Add your first slide to get started.</p>
          </div>
        ) : (
          <DragDropContext onDragEnd={handleReorder}>
            <Droppable droppableId="slides">
              {(provided) => (
                <div 
                  {...provided.droppableProps} 
                  ref={provided.innerRef}
                  className="space-y-3"
                >
                  {slides.map((slide, index) => {
                    const currentSlideMedia = getMediaById(slide.imageId)

                    return (
                    <Draggable key={slide.id} draggableId={slide.id!} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`border rounded-lg ${
                            snapshot.isDragging ? "shadow-lg" : "shadow-sm"
                          }`}
                        >
                          {editingSlide === slide.id ? (
                            // Edit Mode
                            <div className="p-4 space-y-4">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium">Edit Slide #{index + 1}</h3>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={handleCancelEdit}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={handleSaveEdit}
                                  >
                                    <Save className="h-4 w-4 mr-2" />
                                    Save
                                  </Button>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Title</Label>
                                  <Input
                                    value={editData?.title || ""}
                                    onChange={(e) => handleEditChange("title", e.target.value)}
                                    placeholder="Slide title"
                                  />
                                </div>
                                
                                {slide.date && (
                                  <div className="space-y-2">
                                    <Label>Date</Label>
                                    <div className="relative">
                                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                      <Input
                                        type="date"
                                        value={editData?.date || ""}
                                        onChange={(e) => handleEditChange("date", e.target.value)}
                                        className="pl-10"
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                              
                              <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea
                                  value={editData?.text || ""}
                                  onChange={(e) => handleEditChange("text", e.target.value)}
                                  placeholder="Slide description"
                                  rows={3}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label>Image</Label>
                                <MediaSelector
                                  selectedImageId={editData?.imageId.toString() || ""}
                                  onSelect={(imageId) => handleEditChange("imageId", parseInt(imageId))}
                                />
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>CTA Text</Label>
                                  <Input
                                    value={editData?.ctaText || ""}
                                    onChange={(e) => handleEditChange("ctaText", e.target.value)}
                                    placeholder="Button text"
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <Label>CTA Link</Label>
                                  <Input
                                    value={editData?.ctaLink || ""}
                                    onChange={(e) => handleEditChange("ctaLink", e.target.value)}
                                    placeholder="/page-link"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            // View Mode
                            <div className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div 
                                    {...provided.dragHandleProps}
                                    className="cursor-grab active:cursor-grabbing"
                                  >
                                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                                  </div>
                                  <div>
                                    <h3 className="font-medium">
                                      {slide.title || `Slide ${index + 1}`}
                                    </h3>
                                    {slide.date && (
                                      <p className="text-sm text-muted-foreground">
                                        {new Date(slide.date).toLocaleDateString()}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="flex gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleEditSlide(slide)}
                                  >
                                    <Edit3 className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDeleteSlide(slide.id!)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              
                              <div className="mt-3 flex items-center gap-3">
                                <div className="w-16 h-16 rounded border overflow-hidden">
                                  <img
                                    src={currentSlideMedia?.mediaUrl} // You'll need to implement this endpoint
                                    alt={currentSlideMedia?.altText || currentSlideMedia?.fileName}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.src = '/placeholder-image.jpg';
                                    }}
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  {slide.text && (
                                    <p className="text-sm text-muted-foreground truncate">
                                      {slide.text}
                                    </p>
                                  )}
                                  {slide.ctaText && (
                                    <p className="text-xs text-blue-600 mt-1">
                                      Button: {slide.ctaText}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </Draggable>
                  )})}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </CardContent>
    </Card>
  );
};