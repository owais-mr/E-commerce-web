import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const Checkout: React.FC = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', address: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center">
        <h2 className="text-3xl font-bold mb-4 text-green-600">Thank you for your order!</h2>
        <p className="text-slate-700 mb-8">Your order has been placed successfully. We will contact you soon.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-8">Checkout</h2>
      <div className="mb-8 bg-slate-50 p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        {items.length === 0 ? (
          <p className="text-slate-600">Your cart is empty.</p>
        ) : (
          <ul className="mb-4">
            {items.map((item) => (
              <li key={item.product.id} className="flex justify-between py-2 border-b border-slate-200">
                <span>{item.product.name} x {item.quantity}</span>
                <span>${(item.product.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>${getTotalPrice().toFixed(2)}</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Enter your name"
            title="Name"
            className="w-full border border-slate-300 rounded-lg px-4 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
            title="Email"
            className="w-full border border-slate-300 rounded-lg px-4 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            placeholder="Enter your address"
            title="Address"
            className="w-full border border-slate-300 rounded-lg px-4 py-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold py-3 rounded-lg hover:from-amber-600 hover:to-yellow-600 transition-all duration-200"
          disabled={items.length === 0}
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
