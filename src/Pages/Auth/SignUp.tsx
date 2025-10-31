import { Link } from 'react-router-dom';
import { useState } from 'react';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign up:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Join <span className="text-gradient">TechVault</span>
          </h1>
          <p className="text-gray-400">Create your account to get started</p>
        </div>

        <div className="card p-8">
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