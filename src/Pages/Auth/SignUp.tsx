/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    adress: ""
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate passwords length
    // if (formData.password.length <= 6) {
    //   setError('Passwords must be at least 6 letters long');
    //   return;
    // }

    // Validate password strength using regex
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/;

    if (!strongPasswordRegex.test(formData.password)) {
      setError(
        'Password must be at least 8 characters long and include uppercase, lowercase, number, and special symbol.'
      );
      return;
    }

    // Get existing users from localStorage
    const usersJson = localStorage.getItem('users');
    const users = usersJson ? JSON.parse(usersJson) : [];

    // Check if email already exists
    if (users.some((user: any) => user.email === formData.email)) {
      setError('Email already registered');
      return;
    }

    // Add new user
    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      adress: formData.adress
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Auto sign in after sign up
    localStorage.setItem('currentUser', JSON.stringify({ name: newUser.name, email: newUser.email }));

    // Redirect to home
    navigate('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Join <span className="text-gradient">SunTech</span>
          </h1>
          <p className="text-gray-400">Create your account to get started</p>
        </div>

        <div className="card p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input w-full"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input w-full"
                placeholder="you@example.com"
                required
              />
            </div>


            <div>
              <label className="block text-sm font-medium mb-2">Adress</label>
              <input
                type="text"
                name="adress"
                value={formData.adress}
                onChange={handleChange}
                className="input w-full"
                placeholder="San diego 3535"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input w-full"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input w-full"
                placeholder="••••••••"
                required
              />
            </div>


            <div className="text-sm">
              <label className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-700 text-purple-500 focus:ring-purple-500" required />
                <span className="text-gray-400">
                  I agree to the{' '}
                  <a href="#" className="text-purple-400 hover:text-purple-300">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-purple-400 hover:text-purple-300">Privacy Policy</a>
                </span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Create Account
            </button>

            <div className="text-center text-sm text-gray-400">
              Already have an account?{' '}
              <Link to="/signin" className="text-purple-400 hover:text-purple-300 font-semibold">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;