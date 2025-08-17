import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      // Show more specific Firebase error messages
      if (err && typeof err === 'object' && 'code' in err) {
        const code = (err as { code: string }).code;
        if (code === 'auth/user-not-found') {
          showToast('No account found with this email.');
        } else if (code === 'auth/wrong-password') {
          showToast('Incorrect password.');
        } else if (code === 'auth/invalid-email') {
          showToast('Invalid email address.');
        } else {
          showToast('Invalid email or password');
        }
      } else {
        showToast('Invalid email or password');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-amber-100 to-yellow-200 animate-gradient-move">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-fade-in">
        <h2 className="text-4xl font-extrabold text-center text-amber-500 mb-8 drop-shadow">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
          <div>
            <label htmlFor="email" className="block mb-1 font-semibold text-slate-700">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full border-2 border-amber-200 focus:border-amber-500 rounded-lg px-4 py-2 text-lg transition-all duration-200 focus:ring-2 focus:ring-amber-200 outline-none bg-amber-50"
              autoComplete="username"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-semibold text-slate-700">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full border-2 border-amber-200 focus:border-amber-500 rounded-lg px-4 py-2 text-lg transition-all duration-200 focus:ring-2 focus:ring-amber-200 outline-none bg-amber-50"
              autoComplete="current-password"
            />
          </div>
          {error && <div className="text-red-500 text-sm text-center font-medium" role="alert">{error}</div>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold py-3 rounded-lg shadow-lg hover:from-amber-600 hover:to-yellow-600 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed text-lg tracking-wide"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="mt-6 text-center text-slate-600 space-y-2">
          <button
            type="button"
            className="text-amber-500 hover:underline bg-transparent border-none p-0 m-0 cursor-pointer font-semibold"
            onClick={() => navigate('/forgot-password')}
          >
            Forgot password?
          </button>
          <div>
            Don't have an account?{' '}
            <button
              type="button"
              className="text-amber-500 hover:underline bg-transparent border-none p-0 m-0 cursor-pointer font-semibold"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
