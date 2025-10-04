import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Image as ImageIcon, Calendar } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import SearchBar from "@/components/SearchBar";

// Uses NASA's Open APIs: https://api.nasa.gov/
const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  interface SearchResult {
    type: "apod" | "rover";
    title: string;
    description: string;
    image: string;
    date: string;
    url?: string;
  }

  useEffect(() => {
    if (query) {
      searchNASAData();
    }
  }, [query, page]);

  const searchNASAData = async () => {
    setLoading(true);
    const searchResults: SearchResult[] = [];

    try {
      // Search APOD
      const apodResponse = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_NASA_API_KEY}&count=10`
      );
      if (!apodResponse.ok) throw new Error("Failed to fetch APOD data");
      const apodData = await apodResponse.json();
      
      const apodResults = apodData
        .filter((item: any) =>
          item.title?.toLowerCase().includes(query.toLowerCase()) ||
          item.explanation?.toLowerCase().includes(query.toLowerCase())
        )
        .map((item: any) => ({
          type: "apod" as const,
          title: item.title,
          description: item.explanation?.substring(0, 150) + "...",
          image: item.url,
          date: item.date,
          url: item.hdurl || item.url,
        }));

      searchResults.push(...apodResults);

      // Search Mars Rover photos (filter by camera name or earth date)
      const roverResponse = await fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2023-01-01&api_key=${
          import.meta.env.VITE_NASA_API_KEY
        }&page=${page}`
      );
      if (!roverResponse.ok) throw new Error("Failed to fetch rover data");
      const roverData = await roverResponse.json();
      
      if (roverData.photos) {
        const roverResults = roverData.photos
          .filter((photo: any) =>
            photo.camera.full_name.toLowerCase().includes(query.toLowerCase()) ||
            photo.earth_date.includes(query)
          )
          .slice(0, 5)
          .map((photo: any) => ({
            type: "rover" as const,
            title: `${photo.rover.name} - ${photo.camera.full_name}`,
            description: `Captured on Sol ${photo.sol} by ${photo.rover.name}`,
            image: photo.img_src,
            date: photo.earth_date,
          }));
        
        searchResults.push(...roverResults);
      }

      setResults(searchResults);
      if (searchResults.length === 0) {
        toast({
          title: "No Results",
          description: `No matches found for "${query}". Try a different term.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search Error",
        description: "Failed to fetch NASA data. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Explore Cosmic Data</h1>
          </div>
          <SearchBar />
        </div>
      </header>

      {/* Results */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-muted-foreground">
                {results.length > 0 
                  ? `Found ${results.length} cosmic discoveries for "${query}"` 
                  : query 
                  ? `No cosmic discoveries found for "${query}"`
                  : "Search the cosmos to uncover NASA's treasures"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((result, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg hover:shadow-primary/20 transition-all border-border">
                  <div className="aspect-video relative overflow-hidden bg-muted">
                    <img 
                      src={result.image} 
                      alt={result.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        result.type === 'apod' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary text-secondary-foreground'
                      }`}>
                        {result.type === 'apod' ? 'Daily Cosmic View' : 'Rover Snapshot'}
                      </span>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-foreground line-clamp-2">{result.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {result.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {result.description}
                    </p>
                    {result.url && (
                      <a 
                        href={result.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:underline"
                      >
                        <ImageIcon className="h-4 w-4" />
                        View High-Resolution Image
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            {results.length > 0 && (
              <Button onClick={() => setPage(page + 1)} className="mt-6">
                Load More Discoveries
              </Button>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Search;