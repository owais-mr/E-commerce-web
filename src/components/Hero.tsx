import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const goShop = () => {
    navigate('/');
    setTimeout(() => {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };
  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full"
             style={{
               backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`
                 <svg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'>
                   <g fill='none' fill-rule='evenodd'>
                     <g fill='%23ffffff' fill-opacity='0.1'>
                       <circle cx='30' cy='30' r='2'/>
                     </g>
                   </g>
                 </svg>
               `)}")`,
               backgroundSize: '60px 60px'
             }}>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 items-center gap-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-amber-400 font-medium">Over 50,000+ Happy Customers</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Discover Amazing
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400">
                Products
              </span>
              That Matter
            </h1>
            
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Curated collection of premium products from trusted brands. 
              Quality guaranteed, fast shipping, and exceptional customer service.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={goShop} className="bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg hover:from-amber-400 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center group">
                Shop Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => navigate('/about')} className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-slate-900 transition-all duration-300">
                Learn More
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-slate-700">
              <div>
                <div className="text-2xl font-bold text-amber-400">50K+</div>
                <div className="text-slate-400">Products</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-400">99%</div>
                <div className="text-slate-400">Satisfaction</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-400">24/7</div>
                <div className="text-slate-400">Support</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute top-4 right-4 bg-emerald-500 text-white px-4 py-2 rounded-lg font-semibold shadow-lg">
              Free Shipping
            </div>
            <img
              src="https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Shopping Experience"
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
};

export default Hero;