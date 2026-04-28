import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Search, Image as ImageIcon } from "lucide-react";
import { useGetAllMediaQuery } from "../services/apis/mediaApi";
import { Input } from "./ui/input";

interface ImageSelectorProps {
  selectedImageId: string;
  onSelect: (imageId: string) => void;
}

export default function ImageSelector({ selectedImageId, onSelect }: ImageSelectorProps){
  const { data: mediaResponse, isLoading, isError } = useGetAllMediaQuery();
  const media = mediaResponse?.data || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const selectedMedia = media.find(m => m.id === Number(selectedImageId));

  const filteredMedia = media.filter(m => 
    m.fileName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.altText?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        <span className="ml-2 text-sm text-muted-foreground">Loading images...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 bg-destructive/10 text-destructive rounded-md">
        <p className="text-sm">Failed to load images</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Selected Image Preview */}
      {selectedMedia && (
        <Card className="overflow-hidden">
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={import.meta.env.VITE_STATIC_FILE_SERVER + selectedMedia?.mediaUrl}
                  alt={selectedMedia?.altText || `Image ${selectedMedia.id}`}
                  className="w-16 h-16 object-cover rounded-md border"
                />
                {selectedMedia?.mediaType !== "image" && (
                  <div className="absolute inset-0 bg-black/50 rounded-md flex items-center justify-center">
                    <span className="text-white text-xs">
                      {selectedMedia?.mediaType?.substring(0, 3)}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">
                  {selectedMedia?.altText || selectedMedia?.fileName || `Image ${selectedMedia?.id}`}
                </p>
                <p className="text-xs text-muted-foreground">
                  ID: {selectedMedia?.id}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Image Selection */}
      <div className="space-y-2">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              <ImageIcon className="mr-2 h-4 w-4" />
              {selectedMedia 
                ? (selectedMedia?.altText || selectedMedia?.fileName) 
                : "Select an image..."}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] min-w-3xl flex flex-col">
            <DialogHeader>
              <DialogTitle>Select an Image</DialogTitle>
            </DialogHeader>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search images..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Image Grid */}
            <ScrollArea className="flex-grow overflow-y-auto">
              {filteredMedia?.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <ImageIcon className="mx-auto h-12 w-12" />
                  <p className="mt-2">No images found</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 p-1">
                  {filteredMedia?.map((m) => (
                    <Card
                      key={m.id}
                      onClick={() => {
                        onSelect(m.id.toString());
                        setIsOpen(false);
                      }}
                      className={`relative group rounded-lg border-2 overflow-hidden transition-all hover:scale-105 p-0 gap-2 ${
                        selectedImageId === m.id.toString()
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      <CardContent className="p-0">
                        <div className="aspect-square">
                          <img
                            src={import.meta.env.VITE_STATIC_FILE_SERVER + m.mediaUrl}
                            alt={m.altText || `Image ${m.id}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      </CardContent>
                      <CardFooter className="px-2 pb-2 flex flex-col items-start gap-1">
                        {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity"> */}
                          <p className="text-xs text-gray-600">
                            <span className="font-semibold">Name</span>: {m.fileName} 
                          </p>
                          <p className="text-xs text-gray-600">
                            <span className="font-semibold">AltText</span>: {m.altText}
                          </p>
                        {/* </div> */}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </ScrollArea>
          </DialogContent>
        </Dialog>

        {/* Traditional Select as Fallback */}
        {/* <div className="hidden">
          <Select value={selectedImageId} onValueChange={onSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Select an image..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">-- Select an image --</SelectItem>
              {media.map((m) => (
                <SelectItem key={m.id} value={m.id.toString()}>
                  {m.altText || m.fileName || `Image ${m.id}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div> */}
      </div>
    </div>
  );
};