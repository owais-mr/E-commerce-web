import React from 'react';
import { Star } from 'lucide-react';

const AboutPage: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
    {/* Hero-style Section */}
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 animate-fade-in">
      <div className="grid lg:grid-cols-2 items-center gap-12">
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-amber-400 font-medium">Trusted by thousands of happy customers</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400">StoreX</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Welcome to StoreX! We are dedicated to providing you with the best online shopping experience. Our platform offers a wide range of premium products, fast shipping, and exceptional customer service.
          </p>
          <div className="grid grid-cols-2 gap-8 mt-8 pt-8 border-t border-slate-700">
            <div>
              <div className="text-2xl font-bold text-amber-400">Our Mission</div>
              <div className="text-slate-400 mt-2">To deliver quality products and a seamless shopping journey for everyone, everywhere.</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-400">Why Choose Us?</div>
              <ul className="text-slate-400 list-disc list-inside text-left mt-2">
                <li>Premium, curated products</li>
                <li>Fast & reliable shipping</li>
                <li>Secure checkout</li>
                <li>24/7 customer support</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute top-4 right-4 bg-emerald-500 text-white px-4 py-2 rounded-lg font-semibold shadow-lg">
            100% Satisfaction
          </div>
          <img
            src="https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="About StoreX"
            className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute -bottom-6 -left-6 bg-white text-slate-900 p-6 rounded-xl shadow-2xl">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold">Premium Quality</div>
                <div className="text-slate-600 text-sm">Verified Products</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AboutPage;
