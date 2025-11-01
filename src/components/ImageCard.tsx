import { useState } from "react";
import { User } from "lucide-react";

interface ImageCardProps {
  image: {
    id: string;
    urls: {
      regular: string;
      small: string;
    };
    alt_description: string | null;
    user: {
      name: string;
      username: string;
    };
    likes: number;
  };
}

export const ImageCard = ({ image }: ImageCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="masonry-item group relative overflow-hidden rounded-lg cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img
          src={image.urls.regular}
          alt={image.alt_description || "Gallery image"}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-auto transition-all duration-500 ${
            isLoaded ? "opacity-100 animate-fade-in" : "opacity-0"
          } ${isHovered ? "scale-110 blur-sm" : "scale-100"}`}
        />

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 image-card-overlay flex flex-col justify-end p-6 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="transform transition-transform duration-300 translate-y-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{image.user.name}</p>
                <p className="text-sm text-muted-foreground">@{image.user.username}</p>
              </div>
            </div>
            {image.alt_description && (
              <p className="text-sm text-foreground/90 line-clamp-2">
                {image.alt_description}
              </p>
            )}
            <p className="text-xs text-primary mt-2">♥ {image.likes} likes</p>
          </div>
        </div>

        {/* Loading skeleton */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
      </div>
    </div>
  );
};
