/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import productsData from '../data/products.json';

interface ProductinfoProps {
  addToCart: (product: unknown) => void;
}

function Productinfo({ addToCart }: ProductinfoProps) {
  const { id } = useParams();
  const product = productsData.products.find(p => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if product is in favorites
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser && product) {
      const user = JSON.parse(currentUser);
      const favoritesJson = localStorage.getItem('favorites');
      const allFavorites = favoritesJson ? JSON.parse(favoritesJson) : {};
      const userFavorites = allFavorites[user.email] || [];
      setIsFavorite(userFavorites.some((p: any) => p.id === product.id));
    }
  }, [product]);

  const toggleFavorite = () => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      alert('Please sign in to add favorites');
      return;
    }

    const user = JSON.parse(currentUser);
    const favoritesJson = localStorage.getItem('favorites');
    const allFavorites = favoritesJson ? JSON.parse(favoritesJson) : {};
    const userFavorites = allFavorites[user.email] || [];

    if (isFavorite) {
      // Remove from favorites
      allFavorites[user.email] = userFavorites.filter((p: any) => p.id !== product?.id);
      setIsFavorite(false);
    } else {
      // Add to favorites
      allFavorites[user.email] = [...userFavorites, product];
      setIsFavorite(true);
    }

    localStorage.setItem('favorites', JSON.stringify(allFavorites));
  };

  // Get similar products (same category, exclude current product)
  const similarProducts = productsData.products
    .filter(p => p.category === product?.category && p.id !== id)
    .slice(0, 4);

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
    const emptyStars = 5 - totalStarsShown;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-600">★</span>
      );
    }

    return stars;
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Product Not Found</h2>
          <Link to="/products" className="btn btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link to="/" className="hover:text-purple-400">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-purple-400">Products</Link>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="card p-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`card p-2 ${selectedImage === idx ? 'ring-2 ring-purple-500' : ''}`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-20 object-cover rounded"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="text-gray-400 mb-2">{product.brand}</p>
                  <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                </div>
                <button
                  onClick={toggleFavorite}
                  className="p-3 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors"
                  title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <svg className="w-7 h-7" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" className={isFavorite ? 'text-red-500' : 'text-white'} />
                  </svg>
                </button>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex text-lg">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-gray-400">{product.rating} ({product.reviews} reviews)</span>
                </div>
                {product.sale && (
                  <span className="badge badge-warning">ON SALE</span>
                )}
              </div>

              <p className="text-gray-300 text-lg">{product.description}</p>
            </div>

            {/* Price */}
            <div className="card p-6">
              <div className="flex items-baseline gap-4 mb-4">
                {product.originalPrice && (
                  <span className="text-2xl text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="text-5xl font-bold text-gradient">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="badge badge-success">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm mb-6">
                <span
                  className={`badge ${product.stock === 0
                      ? 'badge-danger'
                      : product.stock > 10
                        ? 'badge-success'
                        : 'badge-warning'
                    }`}
                >
                  {product.stock === 0
                    ? 'Hors stock'
                    : product.stock > 10
                      ? 'In Stock'
                      : `Only ${product.stock} left`}
                </span>
              </div>


              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-gray-400">Quantity:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 btn btn-ghost"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-bold text-xl">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 btn btn-ghost"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  for (let i = 0; i < quantity; i++) {
                    addToCart(product);
                  }
                }}
                className="btn btn-primary w-full text-lg"
              >
                Add to Cart
              </button>
            </div>

            {/* Specs */}
            {product.specs && (
              <div className="card p-6">
                <h3 className="text-2xl font-bold mb-4">Specifications</h3>
                <div className="space-y-3">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-slate-700">
                      <span className="text-gray-400">{key}</span>
                      <span className="text-white font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {product.features && (
              <div className="card p-6">
                <h3 className="text-2xl font-bold mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">Similar Products</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((similarProduct) => (
                <Link
                  key={similarProduct.id}
                  to={`/product/${similarProduct.id}`}
                  className="card card-hover group"
                >
                  <div className="relative overflow-hidden rounded-t-xl">
                    <img
                      src={similarProduct.image}
                      alt={similarProduct.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {similarProduct.sale && (
                      <span className="absolute top-4 right-4 badge badge-warning">
                        SALE
                      </span>
                    )}
                  </div>

                  <div className="p-6 space-y-3">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{similarProduct.brand}</p>
                      <h3 className="font-semibold text-white line-clamp-2">{similarProduct.name}</h3>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex text-yellow-400">
                        {renderStars(similarProduct.rating)}
                      </div>
                      <span className="text-gray-400">{similarProduct.rating}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        {similarProduct.originalPrice && (
                          <span className="text-gray-500 line-through text-sm mr-2">
                            ${similarProduct.originalPrice}
                          </span>
                        )}
                        <span className="text-2xl font-bold text-gradient">
                          ${similarProduct.price}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(similarProduct);
                      }}
                      className="btn btn-primary w-full text-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Productinfo;