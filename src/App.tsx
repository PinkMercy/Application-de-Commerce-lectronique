/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Products from './Pages/Products';
import Categories from './Pages/Categories';
import Productinfo from './Pages/Productinfo';
import Profile from './Pages/Profile';
import SignIn from './Pages/Auth/SignIn';
import SignUp from './Pages/Auth/SignUp';
import Navbar from './Components/Navbar';
import Cart from './Components/Cart';
import ScrollToTop from './Components/ScrollToTop';
import { useState, useEffect } from 'react';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>(() => {
    // Load cart from localStorage on initial render
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [currentUser, setCurrentUser] = useState<any>(() => {
    // Load current user from localStorage on initial render
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Check for user changes in localStorage (for sign in/sign up/sign out)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedUser = localStorage.getItem('currentUser');
      setCurrentUser(savedUser ? JSON.parse(savedUser) : null);
    };

    window.addEventListener('storage', handleStorageChange);
    // Also check on component mount and when page becomes visible
    const interval = setInterval(() => {
      const savedUser = localStorage.getItem('currentUser');
      const currentUserString = JSON.stringify(currentUser);
      const savedUserString = savedUser || 'null';
      if (currentUserString !== savedUserString) {
        setCurrentUser(savedUser ? JSON.parse(savedUser) : null);
      }
    }, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [currentUser]);

  const handleSignOut = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  const handleCheckout = () => {
    if (!currentUser) {
      alert('Please sign in to checkout');
      return;
    }

    if (cartItems.length === 0) {
      return;
    }

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryPrice = 10;
    const total = subtotal + deliveryPrice;

    // Create order
    const order = {
      id: Date.now().toString(),
      userEmail: currentUser.email,
      items: cartItems,
      subtotal,
      deliveryPrice,
      total,
      date: new Date().toISOString()
    };

    // Save order to localStorage
    const ordersJson = localStorage.getItem('orders');
    const orders = ordersJson ? JSON.parse(ordersJson) : [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart
    setCartItems([]);
    setIsCartOpen(false);

    // Show success popup
    setShowCheckoutSuccess(true);
    setTimeout(() => setShowCheckoutSuccess(false), 3000);
  };

  const addToCart = (product: any) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev => 
      prev.map(item => item.id === productId ? { ...item, quantity } : item)
    );
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-gray-950">
        <Navbar 
          cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          onCartClick={() => setIsCartOpen(true)}
          currentUser={currentUser}
          onSignOut={handleSignOut}
        />
        <Cart 
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          onCheckout={handleCheckout}
        />
        
        {/* Checkout Success Popup */}
        {showCheckoutSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div className="relative card p-8 max-w-md w-full text-center animate-scale-in">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
              <p className="text-gray-400 mb-6">Your order has been confirmed and saved to your order history.</p>
              <button
                onClick={() => setShowCheckoutSuccess(false)}
                className="btn btn-primary"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/products" element={<Products addToCart={addToCart} />} />
          <Route path="/products/:category" element={<Products addToCart={addToCart} />} />
          <Route path="/product/:id" element={<Productinfo addToCart={addToCart} />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App