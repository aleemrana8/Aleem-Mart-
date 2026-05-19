'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, Clock, ArrowRight, Star } from 'lucide-react';

interface SearchSuggestion {
  type: 'query' | 'product' | 'category';
  text?: string;
  name?: string;
  price?: number;
  rating?: number;
  slug?: string;
}

const trendingSearches = [
  'wireless earbuds', 'smart watch', 'phone case', 'laptop stand',
  'bluetooth speaker', 'usb c hub', 'gaming mouse', 'ring light',
];

const recentSearches = ['earbuds pro', 'laptop bag', 'usb cable'];

export function SmartSearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Debounced search suggestions
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      // Production: Call /api/search/autocomplete?q=${query}
      // Simulated response:
      setSuggestions([
        { type: 'query', text: `${query}` },
        { type: 'query', text: `${query} wireless` },
        { type: 'query', text: `${query} premium` },
        { type: 'product', name: `${query.charAt(0).toUpperCase() + query.slice(1)} Pro X100`, price: 5499, rating: 4.8 },
        { type: 'product', name: `${query.charAt(0).toUpperCase() + query.slice(1)} Max Ultra`, price: 8999, rating: 4.6 },
        { type: 'category', name: 'Electronics', slug: 'electronics' },
      ]);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  function handleSearch(searchQuery?: string) {
    const q = searchQuery || query;
    if (!q.trim()) return;
    window.location.href = `/shop?q=${encodeURIComponent(q)}`;
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl">
      {/* Search Input */}
      <div className="relative flex items-center">
        <Search size={18} className="absolute left-4 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search products, brands, categories..."
          className="w-full pl-11 pr-20 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm outline-none"
        />
        {query && (
          <button onClick={() => { setQuery(''); inputRef.current?.focus(); }} className="absolute right-14 text-gray-400 hover:text-gray-600">
            <X size={16} />
          </button>
        )}
        <button
          onClick={() => handleSearch()}
          className="absolute right-2 px-3 py-1.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Search
        </button>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border shadow-xl z-50 overflow-hidden max-h-[70vh] overflow-y-auto">
          {query.length < 2 ? (
            // Show trending & recent when no query
            <div className="p-4">
              {recentSearches.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-500 uppercase mb-2">Recent Searches</p>
                  <div className="space-y-1">
                    {recentSearches.map((s) => (
                      <button key={s} onClick={() => handleSearch(s)} className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700">
                        <Clock size={14} className="text-gray-400" />
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase mb-2">Trending Now</p>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((s) => (
                    <button key={s} onClick={() => handleSearch(s)} className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-amber-50 hover:text-amber-700 rounded-full text-xs text-gray-600 transition-colors">
                      <TrendingUp size={10} />
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // Show suggestions
            <div>
              {loading && <div className="p-4 text-center text-sm text-gray-400">Searching...</div>}
              {!loading && suggestions.length > 0 && (
                <>
                  {/* Query suggestions */}
                  <div className="p-2 border-b">
                    {suggestions.filter((s) => s.type === 'query').map((s, i) => (
                      <button key={i} onClick={() => handleSearch(s.text)} className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700">
                        <span className="flex items-center gap-2">
                          <Search size={14} className="text-gray-400" />
                          <span dangerouslySetInnerHTML={{ __html: (s.text || '').replace(query, `<strong>${query}</strong>`) }} />
                        </span>
                        <ArrowRight size={14} className="text-gray-300" />
                      </button>
                    ))}
                  </div>
                  {/* Product suggestions */}
                  <div className="p-2">
                    <p className="text-[10px] font-medium text-gray-400 uppercase px-3 mb-1">Products</p>
                    {suggestions.filter((s) => s.type === 'product').map((s, i) => (
                      <button key={i} onClick={() => handleSearch(s.name)} className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-50 text-sm">
                        <span className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg" />
                          <div className="text-left">
                            <p className="text-gray-900 text-xs font-medium">{s.name}</p>
                            <p className="text-[10px] text-gray-500 flex items-center gap-1">
                              <Star size={8} className="text-yellow-400 fill-yellow-400" /> {s.rating}
                            </p>
                          </div>
                        </span>
                        <span className="text-xs font-bold text-gray-900">Rs. {s.price?.toLocaleString()}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
