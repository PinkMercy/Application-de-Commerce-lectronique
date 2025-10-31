import { Link, useParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import productsData from '../data/products.json';

interface ProductsProps {
  addToCart: (product: any) => void;
}

function Products({ addToCart }: ProductsProps) {
  const { category } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = useMemo(() => {
    let filtered = productsData.products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by price
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(p => p.price >= min && (max ? p.price <= max : true));
    }

    // Sort
    if (sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [selectedCategory, priceRange, sortBy]);

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
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === 'all' ? 'bg-purple-500 text-white' : 'hover:bg-white/10'
                  }`}
                >
                  All Products
                </button>
                {productsData.categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                      selectedCategory === cat.id ? 'bg-purple-500 text-white' : 'hover:bg-white/10'
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
                {['all', '0-200', '200-500', '500-1000', '1000'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setPriceRange(range)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      priceRange === range ? 'bg-purple-500 text-white' : 'hover:bg-white/10'
                    }`}
                  >
                    {range === 'all' ? 'All Prices' : range === '1000' ? '1 TND000+' : `$${range.replace('-', ' - $')}`}
                  </button>
                ))}
              </div>
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
                    {product.sale && (
                      <span className="absolute top-4 right-4 badge badge-warning sale-pulse">
                        SALE
                      </span>
                    )}
                    {product.stock < 20 && (
                      <span className="absolute top-4 left-4 badge badge-danger">
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
                        {'★'.repeat(Math.floor(product.rating))}
                      </div>
                      <span className="text-gray-400">({product.reviews})</span>
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