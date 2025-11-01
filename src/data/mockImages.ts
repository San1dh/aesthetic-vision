import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

export interface GalleryImage {
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
  category: string;
}

const baseImages: GalleryImage[] = [
  {
    id: "1",
    urls: { regular: gallery1, small: gallery1 },
    alt_description: "Stunning mountain range at golden hour with misty valleys",
    user: { name: "Alex Rivers", username: "alexrivers" },
    likes: 234,
    category: "nature",
  },
  {
    id: "2",
    urls: { regular: gallery2, small: gallery2 },
    alt_description: "Modern glass architecture with geometric reflections",
    user: { name: "Maya Chen", username: "mayachen" },
    likes: 187,
    category: "architecture",
  },
  {
    id: "3",
    urls: { regular: gallery3, small: gallery3 },
    alt_description: "Portrait in natural lighting with beautiful bokeh",
    user: { name: "David Park", username: "davidpark" },
    likes: 412,
    category: "people",
  },
  {
    id: "4",
    urls: { regular: gallery4, small: gallery4 },
    alt_description: "Majestic lion in golden savanna grass at sunset",
    user: { name: "Sarah Wildlife", username: "sarahwild" },
    likes: 567,
    category: "animals",
  },
  {
    id: "5",
    urls: { regular: gallery5, small: gallery5 },
    alt_description: "Futuristic circuit board with glowing blue technology",
    user: { name: "Tech Vision", username: "techvision" },
    likes: 289,
    category: "technology",
  },
  {
    id: "6",
    urls: { regular: gallery6, small: gallery6 },
    alt_description: "Misty forest with morning light through pine trees",
    user: { name: "Nature Soul", username: "naturesoul" },
    likes: 345,
    category: "nature",
  },
];

// Generate additional Lorem Picsum images
const generateLoremImages = (count: number, category: string): GalleryImage[] => {
  return Array.from({ length: count }, (_, i) => {
    const seed = Math.random().toString(36).substring(7);
    const width = [800, 1000, 1200][Math.floor(Math.random() * 3)];
    const height = [800, 1000, 1200, 1400][Math.floor(Math.random() * 4)];
    
    return {
      id: `${category}-${i}-${seed}`,
      urls: {
        regular: `https://picsum.photos/seed/${seed}/${width}/${height}`,
        small: `https://picsum.photos/seed/${seed}/${width / 2}/${height / 2}`,
      },
      alt_description: `Beautiful ${category} photography`,
      user: {
        name: ["Emma", "John", "Sophia", "Michael", "Olivia"][Math.floor(Math.random() * 5)] + " " + 
              ["Smith", "Johnson", "Brown", "Davis", "Wilson"][Math.floor(Math.random() * 5)],
        username: `user${seed}`,
      },
      likes: Math.floor(Math.random() * 500) + 50,
      category,
    };
  });
};

export const getMockImages = (category: string = "all", page: number = 1, perPage: number = 20): GalleryImage[] => {
  let images: GalleryImage[] = [];
  
  if (category === "all") {
    // Mix base images with Lorem Picsum
    images = [
      ...baseImages,
      ...generateLoremImages(perPage - baseImages.length, "nature"),
    ];
  } else {
    // Get relevant base images and add Lorem Picsum
    const categoryImages = baseImages.filter(img => img.category === category.toLowerCase());
    images = [
      ...categoryImages,
      ...generateLoremImages(perPage - categoryImages.length, category),
    ];
  }
  
  // Simulate pagination
  const start = (page - 1) * perPage;
  return images.slice(start, start + perPage);
};

export const searchMockImages = (query: string, page: number = 1, perPage: number = 20): GalleryImage[] => {
  return getMockImages(query, page, perPage);
};
