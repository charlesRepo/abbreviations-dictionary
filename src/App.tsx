import './App.css';
import React, { useState, useCallback, useEffect } from "react";
import Input from './Components/Input';
import MatchesContainer, { MatchItem } from "./Components/MatchesContainer";
import Definition from "./Components/Definition";

// Add this type to handle the dictionary data structure
type Dictionary = Record<string, string>;

function App() {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedMatch, setSelectedMatch] = useState<MatchItem | null>(null);
  const [matches, setMatches] = useState<MatchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMatchSelect = useCallback((term: string, definition: string) => {
    setQuery(term);
    setSelectedMatch({ term, definition });
  }, []);

  const onKeyUpHandler = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!matches.length) return;
    
    if (e.code === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(0, prev - 1));
    } else if (e.code === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(matches.length - 1, prev + 1));
    } else if (e.code === 'Enter' && matches[selectedIndex]) {
      e.preventDefault();
      const { term, definition } = matches[selectedIndex];
      handleMatchSelect(term, definition);
    }
  }, [matches, selectedIndex, handleMatchSelect]);

  const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setSelectedIndex(0);
    setSelectedMatch(null);
  }, []);

  const handleMatchesUpdate = useCallback((newMatches: MatchItem[]) => {
    setMatches(newMatches);
    // Reset selection when matches change
    setSelectedIndex(0);
  }, []);

  // Update selected match when index changes
  useEffect(() => {
    if (matches.length > 0 && selectedIndex >= 0 && selectedIndex < matches.length) {
      setSelectedMatch(matches[selectedIndex]);
    } else {
      setSelectedMatch(null);
    }
  }, [selectedIndex, matches]);

  return (
    <div className="App w-[500px] bg-slate-800 min-h-[600px] m-auto p-6 overflow-y-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-100 mb-1">Abbreviation Dictionary</h1>
        <p className="text-slate-400 text-sm">Search for abbreviations and their meanings</p>
      </header>
      
      <main>
        <div className="mb-4">
          <Input 
            onKeyUp={onKeyUpHandler} 
            onChange={onChangeHandler} 
            value={query} 
            autoFocus={true}
          />
        </div>
        
        <div className="mb-4">
          <MatchesContainer 
            query={query}
            selectedIndex={selectedIndex}
            onMatchSelect={handleMatchSelect}
            onMatchesUpdate={handleMatchesUpdate}
          />
        </div>
        
        <Definition 
          def={selectedMatch?.definition || ''} 
          isLoading={isLoading}
          error={error}
        />
      </main>
      
      <footer className="mt-8 text-center text-slate-500 text-xs">
        <p>Use ↑ ↓ arrows to navigate, Enter to select</p>
      </footer>
    </div>
  );
}

export default App;
