import { useState, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ImageCard } from "@/components/ImageCard";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { getMockImages, searchMockImages, type GalleryImage } from "@/data/mockImages";

const CATEGORIES = ["All", "Nature", "Architecture", "People", "Animals", "Technology"];

const Index = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadImages = (query: string = "", category: string = "All", pageNum: number = 1) => {
    setLoading(true);
    
    // Simulate API delay for smooth UX
    setTimeout(() => {
      let newImages: GalleryImage[];
      
      if (query) {
        newImages = searchMockImages(query, pageNum);
      } else if (category === "All") {
        newImages = getMockImages("all", pageNum);
      } else {
        newImages = getMockImages(category, pageNum);
      }

      if (pageNum === 1) {
        setImages(newImages);
      } else {
        setImages((prev) => [...prev, ...newImages]);
      }
      
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setPage(1);
      setActiveCategory("All");
      loadImages(searchQuery, "All", 1);
    }
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSearchQuery("");
    setPage(1);
    loadImages("", category, 1);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadImages(searchQuery, activeCategory, nextPage);
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
