import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Shop',
      links: [
        { label: 'All Products', href: '/' },
        { label: 'Electronics', href: '/?category=Electronics' },
        { label: 'Fashion', href: '/?category=Fashion' },
        { label: 'Home & Garden', href: '/?category=Home%20%26%20Garden' },
        { label: 'Sports', href: '/?category=Sports' },
        { label: 'Beauty', href: '/?category=Beauty' },
      ]
    },
    {
      title: 'Customer Service',
      links: [
        { label: 'Contact Us', href: '#contact' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Shipping Info', href: '/shipping' },
        { label: 'Returns', href: '/returns' },
        { label: 'Size Guide', href: '/size-guide' },
        { label: 'Track Order', href: '/track-order' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Press', href: '/press' },
        { label: 'Blog', href: '/blog' },
        { label: 'Sustainability', href: '/sustainability' },
        { label: 'Privacy Policy', href: '/privacy' },
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  const handleFooterLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    if (href === '#contact') {
      e.preventDefault();
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-white" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">
              Store<span className="text-amber-500">X</span>
            </h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Your trusted partner for premium products and exceptional shopping experience. 
              Quality guaranteed, always.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center text-slate-300">
                <MapPin className="w-4 h-4 mr-3 text-amber-500" />
                <span className="text-sm">123 Commerce St, City, State 12345</span>
              </div>
              <div className="flex items-center text-slate-300">
                <Phone className="w-4 h-4 mr-3 text-amber-500" />
                <span className="text-sm">03316078214</span>
              </div>
              <div className="flex items-center text-slate-300">
                <Mail className="w-4 h-4 mr-3 text-amber-500" />
                <span className="text-sm">vsowaiscoder@gmail.com</span>
              </div>
            </div>
          </div>
               
          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.href.startsWith('/') ? (
                      <Link
                        to={link.href}
                        className="text-slate-300 hover:text-amber-400 transition-colors duration-200 text-sm"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-slate-300 hover:text-amber-400 transition-colors duration-200 text-sm"
                        onClick={link.href === '#contact' ? (e) => handleFooterLinkClick(e, link.href) : undefined}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="max-w-md mx-auto text-center lg:text-left lg:max-w-none lg:flex lg:items-center lg:justify-between">
            <div className="lg:flex-1">
              <h4 className="text-lg font-semibold mb-2">Stay Updated</h4>
              <p className="text-slate-300 text-sm mb-4 lg:mb-0">
                Subscribe to our newsletter for the latest products and exclusive offers.
              </p>
            </div>
            
            <div className="lg:ml-8 lg:flex-shrink-0">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <button className="bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 px-6 py-2 rounded-lg font-semibold hover:from-amber-600 hover:to-yellow-600 transition-all duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm mb-4 sm:mb-0">
            © 2025 StoreX. All rights reserved.
          </p>
          
          <div className="flex space-x-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="text-slate-400 hover:text-amber-400 transition-colors duration-200"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;