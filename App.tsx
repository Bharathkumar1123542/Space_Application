import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "./pages/Home";
import APOD from "./pages/APOD";
import MarsWeather from "./pages/MarsWeather";
import MarsRovers from "./pages/MarsRovers";
import Quiz from "./pages/Quiz";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";

// Application setup with react-router-dom, react-query, and Shadcn/UI components
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apod" element={<APOD />} />
          <Route path="/mars-weather" element={<MarsWeather />} />
          <Route path="/rovers" element={<MarsRovers />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;