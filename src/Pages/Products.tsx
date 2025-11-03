/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import productsData from '../data/products.json';

interface ProductsProps {
  addToCart: (product: unknown) => void;
}

function Products({ addToCart }: ProductsProps) {
  const { category } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [priceRange, setPriceRange] = useState('all');
  const [customMinPrice, setCustomMinPrice] = useState('');
  const [customMaxPrice, setCustomMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites
  useState(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      const favoritesJson = localStorage.getItem('favorites');
      const allFavorites = favoritesJson ? JSON.parse(favoritesJson) : {};
      const userFavorites = allFavorites[user.email] || [];
      setFavorites(userFavorites.map((p: any) => p.id));
    }
  });

  const toggleFavorite = (product: any) => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      alert('Please sign in to add favorites');
      return;
    }

    const user = JSON.parse(currentUser);
    const favoritesJson = localStorage.getItem('favorites');
    const allFavorites = favoritesJson ? JSON.parse(favoritesJson) : {};
    const userFavorites = allFavorites[user.email] || [];

    const isFavorite = userFavorites.some((p: any) => p.id === product.id);

    if (isFavorite) {
      // Remove from favorites
      allFavorites[user.email] = userFavorites.filter((p: any) => p.id !== product.id);
      setFavorites(favorites.filter(id => id !== product.id));
    } else {
      // Add to favorites
      allFavorites[user.email] = [...userFavorites, product];
      setFavorites([...favorites, product.id]);
    }

    localStorage.setItem('favorites', JSON.stringify(allFavorites));
  };

  // Helper function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const decimal = rating % 1;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="text-yellow-400">★</span>
      );
    }

    // Partial star based on decimal value
    if (decimal > 0) {
      let fillPercentage = 0;

      if (decimal <= 0.25) {
        fillPercentage = 25;
      } else if (decimal <= 0.5) {
        fillPercentage = 50;
      } else if (decimal <= 0.75) {
        fillPercentage = 75;
      } else {
        fillPercentage = 100;
      }

      stars.push(
        <span key="partial" className="relative inline-block">
          <span className="text-gray-600">★</span>
          <span
            className="absolute left-0 top-0 overflow-hidden text-yellow-400"
            style={{ width: `${fillPercentage}%` }}
          >
            ★
          </span>
        </span>
      );
    }

    // Empty stars to complete 5 stars
    const totalStarsShown = fullStars + (decimal > 0 ? 1 : 0);
    const emptyStars = 4 - totalStarsShown;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-600">★</span>
      );
    }

    return stars;
  };

  const filteredProducts = useMemo(() => {
    let filtered = productsData.products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by price range (preset)
    if (priceRange !== 'all' && priceRange !== 'custom') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(p => p.price >= min && (max ? p.price <= max : true));
    }

    // Filter by custom price range
    if (priceRange === 'custom') {
      const min = customMinPrice ? parseFloat(customMinPrice) : 0;
      const max = customMaxPrice ? parseFloat(customMaxPrice) : Infinity;
      filtered = filtered.filter(p => p.price >= min && p.price <= max);
    }

    // Sort
    if (sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      filtered = [...filtered].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });
    }

    return filtered;
  }, [selectedCategory, priceRange, customMinPrice, customMaxPrice, sortBy]);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            {selectedCategory === 'all' ? 'All Products' : productsData.categories.find(c => c.id === selectedCategory)?.name}
          </h1>
          <p className="text-gray-400">{filteredProducts.length} products found</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="card">
              <h3 className="font-bold text-lg mb-4">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${selectedCategory === 'all' ? 'bg-purple-500 text-white' : 'hover:bg-white/10'
                    }`}
                >
                  All Products
                </button>
                {productsData.categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${selectedCategory === cat.id ? 'bg-purple-500 text-white' : 'hover:bg-white/10'
                      }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="font-bold text-lg mb-4">Price Range</h3>
              <div className="space-y-2">
                {['all', '0-200', '200-500', '500-1000', '1000', 'custom'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setPriceRange(range)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${priceRange === range ? 'bg-purple-500 text-white' : 'hover:bg-white/10'
                      }`}
                  >
                    {range === 'all' ? 'All Prices' : range === '1000' ? '$1000+' : range === 'custom' ? 'Custom Range' : `$${range.replace('-', ' - $')}`}
                  </button>
                ))}
              </div>

              {/* Custom Price Range Inputs */}
              {priceRange === 'custom' && (
                <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Min Price ($)</label>
                    <input
                      type="number"
                      value={customMinPrice}
                      onChange={(e) => setCustomMinPrice(e.target.value)}
                      placeholder="0"
                      className="input w-full"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Max Price ($)</label>
                    <input
                      type="number"
                      value={customMaxPrice}
                      onChange={(e) => setCustomMaxPrice(e.target.value)}
                      placeholder="No limit"
                      className="input w-full"
                      min="0"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Sort */}
            <div className="flex items-center justify-between mb-6">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {/* Products */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="card card-hover group">
                  <div className="relative overflow-hidden rounded-t-xl">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(product);
                      }}
                      className="absolute top-4 right-4 p-2 bg-slate-900/80 hover:bg-slate-800 rounded-full transition-colors z-10"
                    >
                      <svg className="w-5 h-5" fill={favorites.includes(product.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" className={favorites.includes(product.id) ? 'text-red-500' : 'text-white'} />
                      </svg>
                    </button>
                    {product.sale && (
                      <span className="absolute top-4 left-4 badge badge-warning sale-pulse">
                        SALE
                      </span>
                    )}
                    {product.stock < 20 && product.stock > 0 && (
                      <span className="absolute top-16 left-4 badge badge-danger">
                        Only {product.stock} left
                      </span>
                    )}
                  </div>

                  <div className="p-6 space-y-3">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{product.brand}</p>
                      <h3 className="font-semibold text-white line-clamp-2">{product.name}</h3>
                    </div>

                    <p className="text-sm text-gray-400 line-clamp-2">{product.description}</p>

                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex text-yellow-400">
                        {renderStars(product.rating)}
                      </div>
                      <span className="text-gray-400">{product.rating} ({product.reviews})</span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        {product.originalPrice && (
                          <span className="text-gray-500 line-through text-sm mr-2">
                            ${product.originalPrice}
                          </span>
                        )}
                        <span className="text-2xl font-bold text-gradient">
                          ${product.price}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Link
                        to={`/product/${product.id}`}
                        className="btn btn-outline flex-1 text-sm"
                      >
                        Details
                      </Link>
                      <button
                        onClick={() => addToCart(product)}
                        className="btn btn-primary flex-1 text-sm"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;