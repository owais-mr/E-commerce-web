import React from 'react';

const AboutPage: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-amber-100 to-yellow-200 animate-gradient-move">
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-10 animate-fade-in text-center">
      <h2 className="text-4xl font-extrabold text-amber-500 mb-6 drop-shadow">About StoreX</h2>
      <p className="text-lg text-slate-700 mb-6">
        Welcome to <span className="font-bold text-amber-500">StoreX</span>!<br />
        We are dedicated to providing you with the best online shopping experience. Our platform offers a wide range of premium products, fast shipping, and exceptional customer service.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-8 mt-8">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-amber-400 mb-2">Our Mission</h3>
          <p className="text-slate-600">To deliver quality products and a seamless shopping journey for everyone, everywhere.</p>
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-amber-400 mb-2">Why Choose Us?</h3>
          <ul className="text-slate-600 list-disc list-inside text-left mx-auto max-w-xs">
            <li>Premium, curated products</li>
            <li>Fast & reliable shipping</li>
            <li>Secure checkout</li>
            <li>24/7 customer support</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default AboutPage;
