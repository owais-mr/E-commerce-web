import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const { signup } = useAuth();
  const { showToast } = useToast();
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const validate = () => {
    if (!form.email.trim()) return 'Email is required';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return 'Invalid email address';
    if (form.password.length < 6) return 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) return 'Passwords do not match';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    try {
      await signup(form.email, form.password);
      navigate('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message.includes('auth/email-already-in-use')) {
          showToast('This email is already registered. Please use a different email or login.');
        } else {
          showToast(err.message);
        }
      } else {
        showToast('Signup failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-8">Sign Up</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4" autoComplete="off">
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
            className="w-full border border-slate-300 rounded-lg px-4 py-2"
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1 font-medium">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
            placeholder="Enter your password"
            className="w-full border border-slate-300 rounded-lg px-4 py-2"
            autoComplete="new-password"
            aria-describedby="passwordHelp"
          />
          <div id="passwordHelp" className="text-xs text-slate-500 mt-1">At least 6 characters</div>
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block mb-1 font-medium">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            minLength={6}
            placeholder="Re-enter your password"
            className="w-full border border-slate-300 rounded-lg px-4 py-2"
            autoComplete="new-password"
          />
        </div>
        {error && <div className="text-red-500 text-sm" role="alert">{error}</div>}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold py-3 rounded-lg hover:from-amber-600 hover:to-yellow-600 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
      <div className="mt-4 text-center text-slate-600">
        Already have an account?{' '}
        <button
          type="button"
          className="text-amber-500 hover:underline bg-transparent border-none p-0 m-0 cursor-pointer"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Signup;
