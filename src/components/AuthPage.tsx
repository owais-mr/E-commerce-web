import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useErrorHandler } from '../hooks/useErrorHandler';

const AuthPage: React.FC = () => {
  const { login, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const { error, clearError, handleError } = useErrorHandler();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) clearError();
  };

  const validate = () => {
    if (!form.email.trim()) return 'Email is required';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return 'Invalid email address';
    if (form.password.length < 6) return 'Password must be at least 6 characters';
    if (!isLogin && form.password !== form.confirmPassword) return 'Passwords do not match';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    const validationError = validate();
    if (validationError) {
      handleError(validationError);
      return;
    }
    setLoading(true);
    try {
      if (isLogin) {
        await login(form.email, form.password);
        navigate('/');
      } else {
        await signup(form.email, form.password);
        navigate('/');
      }
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-8">{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
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
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
            placeholder="Enter your password"
            className="w-full border border-slate-300 rounded-lg px-4 py-2"
            autoComplete="new-password"
          />
        </div>
        {!isLogin && (
          <div>
            <label className="block mb-1 font-medium">Confirm Password</label>
            <input
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
        )}
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold py-3 rounded-lg hover:from-amber-600 hover:to-yellow-600 transition-all duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
        </button>
      </form>
      <div className="mt-4 text-center text-slate-600">
        {isLogin ? (
          <>
            Don't have an account?{' '}
            <button className="text-amber-500 hover:underline" onClick={() => { setIsLogin(false); clearError(); }}>Sign up</button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button className="text-amber-500 hover:underline" onClick={() => { setIsLogin(true); clearError(); }}>Login</button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
