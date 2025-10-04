import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

// Inspired by Shadcn/UI form patterns, customized for Cosmic Odyssey Hub
const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Debounce search input to prevent rapid submissions
  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim()) {
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [query, navigate]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length < 2) {
      alert("Search query must be at least 2 characters long");
      return;
    }
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const clearSearch = () => {
    setQuery("");
    navigate("/");
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-md relative">
      <Input
        type="text"
        placeholder="Explore NASA's cosmic archives..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-background/50 border-border focus:border-primary pr-10"
      />
      {query && (
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={clearSearch}
          className="absolute right-12 top-1/2 -translate-y-1/2"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90">
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default SearchBar;