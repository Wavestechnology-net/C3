import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import TextEditor from "./TextEditor";
import MediaSelector from "./MediaSelector";
import type { ContentDto } from "../types";
import CarouselJsonManager from "./CarouselJsonManager";

interface ContentEditorProps {
  content: ContentDto;
  sectionId: number;
  onChange: (sectionId: number, contentId: number, newValue: string, field?: string) => void;
}

export default function ContentEditor ({ content, sectionId, onChange }: ContentEditorProps){
  const formatLabel = (key: string) => {
    return key
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const label = formatLabel(content.contentKey);
  const contentType = content.contentType;

  // Get appropriate icon for content type
  const getContentTypeIcon = () => {
    switch (contentType) {
      case 'text': return 'T';
      case 'html': return '</>';
      case 'json': return '{}';
      case 'image': return '🖼️';
      default: return '📄';
    }
  };

  return (
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Badge variant="secondary" className="font-mono text-xs">
                {getContentTypeIcon()} {contentType.toUpperCase()}
              </Badge>
              <span className="font-medium">{label}</span>
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              ID: {content.id}
            </Badge>
          </div>
          {content.contentKey !== content.contentType && (
            <p className="text-sm text-muted-foreground mt-1">
              Key: {content.contentKey}
            </p>
          )}
        </CardHeader>
        
        <CardContent className="pt-0">
          {contentType === "text" && (
            <div className="space-y-2">
              <Label htmlFor={`text-${content.id}`}>Text Content</Label>
              <Input
                id={`text-${content.id}`}
                value={content.value || ""}
                onChange={(e) => onChange(sectionId, content.id, e.target.value, "value")}
                placeholder="Enter text content..."
                className="text-sm"
              />
            </div>
          )}

          {contentType === "html" && (
            <div className="space-y-2">
              <Label>HTML Content</Label>
              <TextEditor
                content={content.value || ""}
                onChange={(value) => onChange(sectionId, content.id, value, "value")}
              />
            </div>
          )}


          {(contentType === "carousel" || contentType === "partner-carousel") && (
            <div className="space-y-2">
              <Label>Carousel Management</Label>
              <CarouselJsonManager
                jsonContent={content.value || "[]"}
                onChange={(newJson) => onChange(sectionId, content.id, newJson, "value")}
              />
            </div>
          )}

          {contentType === "image" && (
            <div className="space-y-2">
              <Label>Image Selection</Label>
              <MediaSelector
                selectedImageId={content.value || ""}
                onSelect={(imageId) => onChange(sectionId, content.id, imageId, "value")}
              />
            </div>
          )}

          {contentType === "textarea" && (
            <div className="space-y-2">
              <Label htmlFor={`textarea-${content.id}`}>Multi-line Text</Label>
              <Textarea
                id={`textarea-${content.id}`}
                value={content.value || ""}
                onChange={(e) => onChange(sectionId, content.id, e.target.value, "value")}
                placeholder="Enter multi-line text..."
                rows={4}
                className="text-sm"
              />
            </div>
          )}
        </CardContent>
      </Card>
  );
};