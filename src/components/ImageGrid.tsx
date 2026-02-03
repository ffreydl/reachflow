import { useState } from "react";
import { ThumbsUp, ThumbsDown, MoreHorizontal, Download, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ImageGridProps {
  images: string[];
  isLoading?: boolean;
}

const ImageGrid = ({ images, isLoading = false }: ImageGridProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Loading state with single skeleton placeholder
  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col gap-4 animate-fade-in">
        <div className="flex justify-center">
          <div className="image-card aspect-square bg-card relative overflow-hidden w-full max-w-md">
            <Skeleton className="w-full h-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <span className="text-xs text-muted-foreground animate-pulse">
                  Generiere Creative...
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center py-20 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
          <div className="w-8 h-8 rounded-lg bg-muted" />
        </div>
        <p className="text-muted-foreground text-sm">
          Deine Ad Creatives erscheinen hier
        </p>
        <p className="text-muted-foreground/60 text-xs mt-1">
          Beschreibe dein Creative und klicke auf Generieren
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-4 animate-fade-in">
      {/* Single centered image */}
      <div className="flex justify-center">
        {images.slice(0, 1).map((src, index) => (
          <div
            key={index}
            className="image-card aspect-square bg-card relative group cursor-pointer w-full max-w-md"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={src}
              alt={`Ad Creative ${index + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Hover overlay */}
            <div 
              className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-200 ${
                hoveredIndex === index ? 'opacity-100' : 'opacity-0'
              }`}
            />
            
            {/* Download button on hover */}
            <button
              className={`absolute bottom-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white transition-all duration-200 hover:bg-white/30 ${
                hoveredIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Action icons */}
      <div className="flex items-center gap-4 pt-2">
        <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-150 btn-press">
          <ThumbsUp className="w-4 h-4" />
        </button>
        <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-150 btn-press">
          <ThumbsDown className="w-4 h-4" />
        </button>
        <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-150 btn-press">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ImageGrid;
