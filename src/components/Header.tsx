
import { Car, Phone, Mail, MapPin, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthButton } from '@/components/AuthButton';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { userRole } = useAuth();

  const scrollToInventory = () => {
    const element = document.getElementById('inventory');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-gray-900 text-white">
      {/* Top Bar */}
      <div className="bg-black py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-2 md:mb-0">
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4 text-gold-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="w-4 h-4 text-gold-400" />
                <span>info@pmmotors.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4 text-gold-400" />
              <span className="text-center sm:text-left">123 Motor Street, Car City, CC 12345</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-9 md:w-16 md:h-12 gold-gradient rounded-full flex items-center justify-center">
                  <Car className="w-6 h-6 md:w-8 md:h-8 text-gray-900" />
                </div>
              </div>
              <div>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-gold-400">
                  PM MOTORS LTD
                </h1>
                <p className="text-xs md:text-sm text-red-400 font-medium italic">Only the Best</p>
              </div>
            </Link>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <a href="#home" className="hover:text-gold-400 transition-colors font-medium">Home</a>
              <a href="#inventory" className="hover:text-gold-400 transition-colors font-medium">Inventory</a>
              <a href="#categories" className="hover:text-gold-400 transition-colors font-medium">Categories</a>
              <a href="#about" className="hover:text-gold-400 transition-colors font-medium">About</a>
              <a href="#contact" className="hover:text-gold-400 transition-colors font-medium">Contact</a>
              {(userRole === 'admin' || userRole === 'manager') && (
                <Link to="/admin" className="hover:text-gold-400 transition-colors font-medium bg-blue-600 px-3 py-1 rounded">Admin</Link>
              )}
            </nav>

            {/* Desktop Auth Button and CTA */}
            <div className="hidden md:flex items-center gap-4">
              <AuthButton />
              <Button 
                className="bg-gold-500 hover:bg-gold-600 text-black font-semibold"
                onClick={scrollToInventory}
              >
                View Inventory
              </Button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden mt-4 pb-4 border-t border-gray-700">
                <nav className="flex flex-col space-y-4 mt-4">
                  <a href="#home" className="hover:text-gold-400 transition-colors font-medium">Home</a>
                  <a href="#inventory" className="hover:text-gold-400 transition-colors font-medium">Inventory</a>
                  <a href="#categories" className="hover:text-gold-400 transition-colors font-medium">Categories</a>
                  <a href="#about" className="hover:text-gold-400 transition-colors font-medium">About</a>
                  <a href="#contact" className="hover:text-gold-400 transition-colors font-medium">Contact</a>
                  {(userRole === 'admin' || userRole === 'manager') && (
                    <Link to="/admin" className="hover:text-gold-400 transition-colors font-medium bg-blue-600 px-3 py-1 rounded text-center">Admin Panel</Link>
                  )}
                  <div className="flex flex-col space-y-3 pt-4">
                    <AuthButton />
                    <Button 
                      className="bg-gold-500 hover:bg-gold-600 text-black font-semibold w-full"
                      onClick={scrollToInventory}
                    >
                      View Inventory
                    </Button>
                  </div>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
