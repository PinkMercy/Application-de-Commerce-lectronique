import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import productsData from '../data/products.json';

interface ProductinfoProps {
  addToCart: (product: any) => void;
}

function Productinfo({ addToCart }: ProductinfoProps) {
  const { id } = useParams();
  const product = productsData.products.find(p => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

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
              <p className="text-gray-400 mb-2">{product.brand}</p>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400 text-lg">
                    {'★'.repeat(Math.floor(product.rating))}
                  </div>
                  <span className="text-gray-400">({product.reviews} reviews)</span>
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
                <span className={`badge ${product.stock > 10 ? 'badge-success' : 'badge-warning'}`}>
                  {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
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
      </div>
    </div>
  );
}

export default Productinfo;