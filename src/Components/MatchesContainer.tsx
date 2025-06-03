import { useEffect, useState, useCallback } from "react";
import axios from 'axios';

export interface MatchItem {
  term: string;
  definition: string;
}

interface Props {
  query: string;
  selectedIndex: number;
  onMatchSelect: (term: string, definition: string) => void;
  onMatchesUpdate: (matches: MatchItem[]) => void;
}

export default function MatchesContainer({ 
  query, 
  selectedIndex, 
  onMatchSelect,
  onMatchesUpdate 
}: Props) {
  const [dictionary, setDictionary] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Clean the query by escaping special regex characters
  const cleanQuery = useCallback((query: string) => {
    return query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }, []);

  // Fetch dictionary data
  const fetchDictionary = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<Record<string, string>>(
        'https://raw.githubusercontent.com/charlesRepo/abbreviations-dictionary/main/src/dictionary.json'
      );
      setDictionary(response.data);
      return response.data;
    } catch (err) {
      console.error('Failed to fetch dictionary:', err);
      setError('Failed to load dictionary. Using local copy as fallback.');
      try {
        const localData = await import('../dictionary.json');
        // Handle the default export from JSON module
        const dictionaryData = localData.default || localData;
        setDictionary(dictionaryData);
        return dictionaryData;
      } catch (localErr) {
        console.error('Failed to load local dictionary:', localErr);
        setError('Failed to load dictionary. Please try again later.');
        return {};
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Find matches based on query
  const findMatches = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      onMatchesUpdate([]);
      return;
    }

    try {
      const data = dictionary;
      const regex = new RegExp(cleanQuery(searchQuery), 'i');
      
      const matches: MatchItem[] = Object.entries(data)
        .filter(([term]) => regex.test(term))
        .map(([term, definition]) => ({
          term,
          definition
        }))
        .sort((a, b) => a.term.localeCompare(b.term));
      
      onMatchesUpdate(matches);
    } catch (err) {
      console.error('Error finding matches:', err);
      setError('Error searching for matches');
    }
  }, [dictionary, cleanQuery, onMatchesUpdate]);

  // Handle match selection
  const handleMatchClick = useCallback((match: MatchItem) => {
    onMatchSelect(match.term, match.definition);
  }, [onMatchSelect]);

  // Load dictionary on mount
  useEffect(() => {
    fetchDictionary();
  }, [fetchDictionary]);

  // Update matches when query changes
  useEffect(() => {
    const timer = setTimeout(() => {
      findMatches(query);
    }, 300); // Debounce search

    return () => clearTimeout(timer);
  }, [query, findMatches]);

  // Update selected match when matches or selectedIndex changes
  useEffect(() => {
    if (dictionary) {
      findMatches(query);
    }
  }, [dictionary, query, findMatches]);

  if (isLoading && !Object.keys(dictionary).length) {
    return <div className="text-slate-400 text-sm mt-2">Loading dictionary...</div>;
  }

  if (error) {
    return <div className="text-red-400 text-sm mt-2">{error}</div>;
  }

  return (
    <div className="mt-2">
      {query && (
        <ul className="border-slate-600 border-2 rounded max-h-60 overflow-y-auto">
          {dictionary ? (
            Object.entries(dictionary)
              .filter(([term]) => new RegExp(cleanQuery(query), 'i').test(term))
              .sort(([termA], [termB]) => termA.localeCompare(termB))
              .map(([term, definition], index) => (
                <li
                  key={term}
                  onClick={() => handleMatchClick({ term, definition })}
                  className={`${
                    selectedIndex === index
                      ? 'bg-slate-700 text-slate-200'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                  } text-sm break-words cursor-pointer p-2 transition-colors`}
                >
                  <span className="font-medium">{term.toUpperCase()}</span>
                </li>
              ))
          ) : (
            <li className="text-slate-400 p-2">No dictionary data available</li>
          )}
        </ul>
      )}
    </div>
  );
}

