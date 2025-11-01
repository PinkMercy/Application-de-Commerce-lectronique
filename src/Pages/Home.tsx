import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import productsData from '../data/products.json';

interface HomeProps {
  addToCart: (product: unknown) => void;
}

function Home({ addToCart }: HomeProps) {
  const featuredProducts = productsData.products.filter(p => p.featured);
  const categories = productsData.categories;
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slider images - using featured products
  const sliderProducts = featuredProducts.slice(0, 4);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderProducts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [sliderProducts.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderProducts.length) % sliderProducts.length);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Slider Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-slate-950 to-cyan-900/20" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDEzOSw5MiwyNDYsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="badge badge-primary text-sm px-4 py-2">
                  🎮 Premium Gaming Hardware
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold">
                Build Your
                <span className="block text-gradient animate-pulse-slow">Dream Setup</span>
              </h1>
              
              <p className="text-xl text-gray-400 max-w-xl">
                Discover the latest gaming hardware and PC components. Premium quality, competitive prices, and lightning-fast delivery.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/products" className="btn btn-primary text-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Shop Now
                </Link>
                <Link to="/categories" className="btn btn-outline text-lg">
                  Browse Categories
                </Link>
              </div>

             
            </div>

            {/* Product Slider */}
            <div className="relative lg:h-[600px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse-slow" />
              
              {/* Slider Container */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Main Slide */}
                <div className="relative w-full max-w-lg h-96 lg:h-[500px]">
                  {sliderProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className={`absolute inset-0 transition-all duration-700 ${
                        index === currentSlide
                          ? 'opacity-100 scale-100 z-10'
                          : 'opacity-0 scale-95 z-0'
                      }`}
                    >
                      <div className="card card-hover h-full flex flex-col p-6">
                        <div className="relative flex-1 rounded-xl overflow-hidden mb-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                          {product.sale && (
                            <span className="absolute top-4 right-4 badge badge-warning sale-pulse">
                              SALE
                            </span>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-400">{product.brand}</p>
                            <h3 className="text-xl font-bold text-white line-clamp-2">{product.name}</h3>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <div className="flex text-yellow-400">
                              {'★'.repeat(Math.floor(product.rating))}
                            </div>
                            <span className="text-gray-400 text-sm">({product.reviews})</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              {product.originalPrice && (
                                <span className="text-gray-500 line-through text-sm mr-2">
                                  ${product.originalPrice}
                                </span>
                              )}
                              <span className="text-3xl font-bold text-gradient">
                                ${product.price}
                              </span>
                            </div>
                            <Link
                              to={`/product/${product.id}`}
                              className="btn btn-primary text-sm"
                            >
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 btn btn-ghost w-12 h-12 p-0 glass hover:bg-purple-500/20"
                  aria-label="Previous slide"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 btn btn-ghost w-12 h-12 p-0 glass hover:bg-purple-500/20"
                  aria-label="Next slide"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Slide Indicators */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {sliderProducts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? 'bg-purple-500 w-8'
                          : 'bg-slate-700 hover:bg-slate-600'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-gray-400 text-lg">Find exactly what you need</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products/${category.id}`}
                className="card card-hover p-6 text-center group"
              >
                <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-white mb-1">{category.name}</h3>
                <p className="text-sm text-gray-400 line-clamp-2">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-gradient">Featured</span> Products
            </h2>
            <p className="text-gray-400 text-lg">Handpicked by our experts</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
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
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{product.brand}</p>
                      <h3 className="font-semibold text-white line-clamp-2">{product.name}</h3>
                    </div>
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
                      View Details
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

          <div className="text-center mt-12">
            <Link to="/products" className="btn btn-primary text-lg">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Shipping</h3>
              <p className="text-gray-400">Free delivery on orders over 1 TND00</p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
              <p className="text-gray-400">100% secure payment processing</p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p className="text-gray-400">Dedicated customer service team</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;