import { Link } from 'react-router-dom';
import { useState } from 'react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

function Navbar({ cartCount, onCartClick }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Filled center */}
                <circle cx="12" cy="12" r="3.5" fill="currentColor" stroke="currentColor" strokeWidth={0.5} />
                {/* Filled rays (sharp triangles) */}
                <path d="M12 1.6 L13.6 6 L10.4 6 Z" fill="currentColor" />
                <path d="M19 3.6 L15.2 7.4 L14.1 6.2 Z" fill="currentColor" />
                <path d="M22.4 12 L17.6 13.6 L17.6 10.4 Z" fill="currentColor" />
                <path d="M19 20.4 L15.2 16.6 L14.1 17.8 Z" fill="currentColor" />
                <path d="M12 22.4 L10.4 18 L13.6 18 Z" fill="currentColor" />
                <path d="M5 20.4 L8.8 16.6 L9.9 17.8 Z" fill="currentColor" />
                <path d="M1.6 12 L6.4 10.4 L6.4 13.6 Z" fill="currentColor" />
                <path d="M5 3.6 L8.8 7.4 L9.9 6.2 Z" fill="currentColor" />
              </svg>


            </div>
            <span className="text-xl font-bold text-gradient hidden sm:block">SunTech</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input w-full pl-10"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">
              Home
            </Link>
            <Link to="/products" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">
              Products
            </Link>
            <Link to="/categories" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">
              Categories
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-300 hover:text-purple-400 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center text-xs font-bold text-white animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Menu */}
            <Link
              to="/signin"
              className="hidden sm:block btn btn-primary text-sm"
            >
              Sign In
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-purple-400 transition-colors"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-white/10">
            {/* Mobile Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input w-full pl-10"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Mobile Navigation Links */}
            <Link to="/" className="block text-gray-300 hover:text-purple-400 transition-colors font-medium py-2">
              Home
            </Link>
            <Link to="/products" className="block text-gray-300 hover:text-purple-400 transition-colors font-medium py-2">
              Products
            </Link>
            <Link to="/categories" className="block text-gray-300 hover:text-purple-400 transition-colors font-medium py-2">
              Categories
            </Link>
            <Link to="/signin" className="block btn btn-primary text-sm">
              Sign In
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;