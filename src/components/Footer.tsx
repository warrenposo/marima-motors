
import { Car, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-8 gold-gradient rounded-full flex items-center justify-center">
                <Car className="w-6 h-6 text-gray-900" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold text-gold-400">PM MOTORS LTD</h3>
                <p className="text-sm text-red-400 italic">Only the Best</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Your trusted partner in finding the perfect vehicle. We specialize in premium automobiles 
              with a commitment to excellence and customer satisfaction.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 text-gray-400 hover:text-gold-400 cursor-pointer transition-colors" />
              <Twitter className="w-6 h-6 text-gray-400 hover:text-gold-400 cursor-pointer transition-colors" />
              <Instagram className="w-6 h-6 text-gray-400 hover:text-gold-400 cursor-pointer transition-colors" />
              <Youtube className="w-6 h-6 text-gray-400 hover:text-gold-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gold-400 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="#inventory" className="text-gray-300 hover:text-white transition-colors">Inventory</a></li>
              <li><a href="#categories" className="text-gray-300 hover:text-white transition-colors">Categories</a></li>
              <li><a href="#financing" className="text-gray-300 hover:text-white transition-colors">Financing</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-gold-400 mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-gold-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-gold-400" />
                <span className="text-gray-300">info@pmmotors.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-gold-400 mt-1" />
                <span className="text-gray-300">123 Motor Street<br />Car City, CC 12345</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 PM Motors Ltd. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#warranty" className="hover:text-white transition-colors">Warranty</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
