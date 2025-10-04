import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, Camera, Cloud, Brain } from "lucide-react";
import spaceHero from "@/assets/space-hero.jpg"; // Sourced from NASA's public image gallery[](https://images.nasa.gov)
import SearchBar from "@/components/SearchBar";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Search Bar */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-center">
          <SearchBar />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${spaceHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-pulse">
            Cosmic Odyssey Hub
          </h1>
          <p className="text-xl md:text-2xl text-foreground/90 mb-8 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">
            Journey through NASA's universe of discoveries
          </p>
          <div className="flex gap-4 justify-center animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
            <Link to="/apod">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-[var(--glow-primary)] transition-all">
                Start Your Journey
              </Button>
            </Link>
            <Link to="/quiz">
              <Button size="lg" variant="outline" className="border-primary/50 text-foreground hover:bg-primary/10">
                Challenge Your Cosmic IQ
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
          Discover Cosmic Features
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/apod" className="group">
            <Card className="h-full bg-card border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/20">
              <CardHeader>
                <Camera className="w-12 h-12 mb-4 text-primary group-hover:scale-110 transition-transform" />
                <CardTitle className="text-foreground">Daily Cosmic View</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Marvel at NASA's daily astronomy image with in-depth insights
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/mars-weather" className="group">
            <Card className="h-full bg-card border-border hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/20">
              <CardHeader>
                <Cloud className="w-12 h-12 mb-4 text-accent group-hover:scale-110 transition-transform" />
                <CardTitle className="text-foreground">Martian Climate</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Dive into real-time Martian weather patterns with dynamic visuals
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/rovers" className="group">
            <Card className="h-full bg-card border-border hover:border-secondary/50 transition-all hover:shadow-lg hover:shadow-secondary/20">
              <CardHeader>
                <Rocket className="w-12 h-12 mb-4 text-secondary group-hover:scale-110 transition-transform" />
                <CardTitle className="text-foreground">Rover Chronicles</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Explore the Red Planet through NASA's rover imagery
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/quiz" className="group">
            <Card className="h-full bg-card border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/20">
              <CardHeader>
                <Brain className="w-12 h-12 mb-4 text-primary group-hover:scale-110 transition-transform" />
                <CardTitle className="text-foreground">Cosmic Challenge</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Test your knowledge of the cosmos with engaging quizzes
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-muted-foreground">
          <p>
            Powered by <a href="https://api.nasa.gov/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">NASA's Open APIs</a> 
            • Created for Hackathon 2025
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;