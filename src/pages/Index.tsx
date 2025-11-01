import { useState, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ImageCard } from "@/components/ImageCard";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const UNSPLASH_ACCESS_KEY = "YOUR_ACCESS_KEY_HERE";
const CATEGORIES = ["All", "Nature", "Architecture", "People", "Animals", "Technology"];

interface UnsplashImage {
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
}

const Index = () => {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchImages = async (query: string = "", pageNum: number = 1) => {
    setLoading(true);
    try {
      const endpoint = query
        ? `https://api.unsplash.com/search/photos?query=${query}&page=${pageNum}&per_page=20`
        : `https://api.unsplash.com/photos?page=${pageNum}&per_page=20`;

      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }

      const data = await response.json();
      const newImages = query ? data.results : data;

      if (pageNum === 1) {
        setImages(newImages);
      } else {
        setImages((prev) => [...prev, ...newImages]);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      toast.error("Failed to load images. Using demo mode with limited access.");
      
      // Fallback to random photos endpoint which works without API key
      fetchDemoImages(pageNum);
    } finally {
      setLoading(false);
    }
  };

  const fetchDemoImages = async (pageNum: number = 1) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?count=20`,
        {
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (pageNum === 1) {
          setImages(data);
        } else {
          setImages((prev) => [...prev, ...data]);
        }
      }
    } catch (error) {
      console.error("Demo mode error:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setPage(1);
      fetchImages(searchQuery, 1);
    }
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setPage(1);
    const query = category === "All" ? "" : category.toLowerCase();
    fetchImages(query, 1);
    if (query) {
      setSearchQuery(query);
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    const query = activeCategory === "All" ? searchQuery : activeCategory.toLowerCase();
    fetchImages(query, nextPage);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Aesthetic Gallery
          </h1>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
          />
        </div>
      </header>

      {/* Category Filter */}
      <div className="container mx-auto px-4 py-8">
        <CategoryFilter
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* Gallery */}
      <main className="container mx-auto px-4 pb-16">
        {loading && images.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="masonry-grid">
              {images.map((image) => (
                <ImageCard key={image.id} image={image} />
              ))}
            </div>

            {/* Load More */}
            {images.length > 0 && (
              <div className="flex justify-center mt-12">
                <Button
                  onClick={loadMore}
                  disabled={loading}
                  size="lg"
                  className="rounded-full px-8"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Load More"
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
