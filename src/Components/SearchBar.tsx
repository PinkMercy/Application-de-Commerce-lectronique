import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import productsData from '../data/products.json';

interface SearchBarProps {
  isMobile?: boolean;
}

function SearchBar({ isMobile = false }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search products
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      const results = productsData.products.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      ).slice(0, 6); // Limit to 6 results

      setSearchResults(results);
      setIsOpen(true);
    } else {
      setSearchResults([]);
      setIsOpen(false);
    }
  }, [searchQuery]);

  const handleResultClick = () => {
    setSearchQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="input w-full pl-10"
      />
      <svg 
        className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>

      {/* Search Results Dropdown */}
      {isOpen && searchResults.length > 0 && (
        <div className={`absolute ${isMobile ? 'top-full' : 'top-12'} left-0 right-0 glass border border-white/10 rounded-lg shadow-2xl max-h-96 overflow-y-auto z-50 mt-2`}>
          {searchResults.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              onClick={handleResultClick}
              className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-b-0"
            >
              {/* Product Image */}
              <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-white/5">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 mb-0.5">{product.brand}</p>
                    <h4 className="text-sm font-semibold text-white truncate">{product.name}</h4>
                    <p className="text-xs text-gray-400 truncate mt-1">{product.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="text-lg font-bold text-gradient">${product.price}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* View All Results */}
          <Link
            to="/products"
            onClick={handleResultClick}
            className="block p-4 text-center text-sm text-purple-400 hover:text-purple-300 hover:bg-white/5 transition-colors font-medium"
          >
            View All Products →
          </Link>
        </div>
      )}

      {/* No Results */}
      {isOpen && searchQuery.trim().length > 0 && searchResults.length === 0 && (
        <div className={`absolute ${isMobile ? 'top-full' : 'top-12'} left-0 right-0 glass border border-white/10 rounded-lg shadow-2xl z-50 mt-2 p-8 text-center`}>
          <svg className="w-12 h-12 text-gray-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-400">No products found for "{searchQuery}"</p>
          <p className="text-sm text-gray-500 mt-1">Try a different search term</p>
        </div>
      )}
    </div>
  );
}

export default SearchBar;