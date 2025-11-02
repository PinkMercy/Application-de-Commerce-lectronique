/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Products from './Pages/Products';
import Categories from './Pages/Categories';
import Productinfo from './Pages/Productinfo';
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        />
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/products" element={<Products addToCart={addToCart} />} />
          <Route path="/products/:category" element={<Products addToCart={addToCart} />} />
          <Route path="/product/:id" element={<Productinfo addToCart={addToCart} />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App