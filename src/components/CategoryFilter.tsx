import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter = ({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "secondary"}
          onClick={() => onCategoryChange(category)}
          className={`
            rounded-full px-6 py-2.5 font-semibold
            transition-all duration-300 
            hover:scale-105 hover:shadow-lg
            ${activeCategory === category 
              ? "shadow-[0_0_20px_rgba(0,255,255,0.3)] animate-fade-in" 
              : "hover:bg-secondary/60 backdrop-blur-sm border border-border/50"
            }
          `}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};
