/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('info');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    adress: '',
    password: ''
  });
  const [orders, setOrders] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Load current user
    const savedUser = localStorage.getItem('currentUser');
    if (!savedUser) {
      navigate('/signin');
      return;
    }
    
    const user = JSON.parse(savedUser);
    setCurrentUser(user);

    // Load full user data
    const usersJson = localStorage.getItem('users');
    const users = usersJson ? JSON.parse(usersJson) : [];
    const fullUser = users.find((u: any) => u.email === user.email);
    
    if (fullUser) {
      setFormData({
        name: fullUser.name,
        email: fullUser.email,
        adress: fullUser.adress || '',
        password: ''
      });
    }

    // Load orders
    const ordersJson = localStorage.getItem('orders');
    const allOrders = ordersJson ? JSON.parse(ordersJson) : [];
    const userOrders = allOrders.filter((o: any) => o.userEmail === user.email);
    setOrders(userOrders);

    // Load favorites
    const favoritesJson = localStorage.getItem('favorites');
    const allFavorites = favoritesJson ? JSON.parse(favoritesJson) : {};
    setFavorites(allFavorites[user.email] || []);
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Update user in localStorage
    const usersJson = localStorage.getItem('users');
    const users = usersJson ? JSON.parse(usersJson) : [];
    const userIndex = users.findIndex((u: any) => u.email === currentUser.email);
    
    if (userIndex !== -1) {
      users[userIndex] = {
        ...users[userIndex],
        name: formData.name,
        adress: formData.adress,
        ...(formData.password && { password: formData.password })
      };
      localStorage.setItem('users', JSON.stringify(users));
      
      // Update current user
      localStorage.setItem('currentUser', JSON.stringify({ 
        name: formData.name, 
        email: formData.email 
      }));
      
      setMessage('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const removeFavorite = (productId: string) => {
    const favoritesJson = localStorage.getItem('favorites');
    const allFavorites = favoritesJson ? JSON.parse(favoritesJson) : {};
    const userFavorites = (allFavorites[currentUser.email] || []).filter((p: any) => p.id !== productId);
    allFavorites[currentUser.email] = userFavorites;
    localStorage.setItem('favorites', JSON.stringify(allFavorites));
    setFavorites(userFavorites);
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">
          My <span className="text-gradient">Profile</span>
        </h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-700">
          <button
            onClick={() => setActiveTab('info')}
            className={`pb-4 px-4 font-semibold transition-colors ${
              activeTab === 'info'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Personal Info
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-4 px-4 font-semibold transition-colors ${
              activeTab === 'orders'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Order History ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`pb-4 px-4 font-semibold transition-colors ${
              activeTab === 'favorites'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Favorites ({favorites.length})
          </button>
        </div>

        {/* Personal Info Tab */}
        {activeTab === 'info' && (
          <div className="card p-8 max-w-2xl">
            {message && (
              <div className="mb-4 p-3 bg-green-500/10 border border-green-500 rounded-lg text-green-400 text-sm">
                {message}
              </div>
            )}
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="input w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="input w-full bg-slate-800 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <input
                  type="text"
                  name="adress"
                  value={formData.adress}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="input w-full"
                />
              </div>

              {isEditing && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    New Password (leave blank to keep current)
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input w-full"
                    placeholder="••••••••"
                  />
                </div>
              )}

              <div className="flex gap-4">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn btn-primary"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button onClick={handleSave} className="btn btn-primary">
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          name: currentUser.name,
                          email: currentUser.email,
                          adress: formData.adress,
                          password: ''
                        });
                      }}
                      className="btn btn-outline"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Order History Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="card p-12 text-center">
                <svg className="w-24 h-24 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p className="text-gray-400 text-lg mb-4">No orders yet</p>
                <Link to="/products" className="btn btn-primary">
                  Start Shopping
                </Link>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="card p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-400">Order #{order.id}</p>
                      <p className="text-sm text-gray-400">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <span className="badge badge-success">Completed</span>
                  </div>

                  <div className="space-y-3 mb-4">
                    {order.items.map((item: any) => (
                      <div key={item.id} className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-white">{item.name}</p>
                          <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-purple-400 font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-700 pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-gradient">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <div>
            {favorites.length === 0 ? (
              <div className="card p-12 text-center">
                <svg className="w-24 h-24 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <p className="text-gray-400 text-lg mb-4">No favorite products yet</p>
                <Link to="/products" className="btn btn-primary">
                  Browse Products
                </Link>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((product) => (
                  <div key={product.id} className="card card-hover group">
                    <div className="relative overflow-hidden rounded-t-xl">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <button
                        onClick={() => removeFavorite(product.id)}
                        className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
                      >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>

                    <div className="p-6 space-y-3">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">{product.brand}</p>
                        <h3 className="font-semibold text-white line-clamp-2">{product.name}</h3>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-2xl font-bold text-gradient">${product.price}</span>
                      </div>

                      <Link
                        to={`/product/${product.id}`}
                        className="btn btn-primary w-full text-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;