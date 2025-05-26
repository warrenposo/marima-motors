
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Gauge, Fuel, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface CarDetailModalProps {
  car: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CarDetailModal = ({ car, open, onOpenChange }: CarDetailModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!car) return null;

  const images = car.image_urls && car.image_urls.length > 0 
    ? car.image_urls 
    : car.main_image_url 
    ? [car.main_image_url] 
    : ["https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop"];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold">
            {car.brand} {car.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Image Section with Carousel */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={images[currentImageIndex]}
                alt={car.name}
                className="w-full h-48 sm:h-64 lg:h-80 object-cover rounded-lg"
              />
              
              {/* Navigation arrows for multiple images */}
              {images.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </>
              )}

              <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                <Badge 
                  variant={car.in_stock ? "default" : "destructive"}
                  className={`text-xs sm:text-sm ${car.in_stock ? "bg-green-500 hover:bg-green-600" : ""}`}
                >
                  {car.in_stock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>
              <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                <Badge variant="secondary" className="bg-gold-500 text-black hover:bg-gold-600 text-xs sm:text-sm">
                  {car.category}
                </Badge>
              </div>

              {/* Image counter */}
              {images.length > 1 && (
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                  <Badge variant="secondary" className="bg-black/50 text-white text-xs">
                    {currentImageIndex + 1} / {images.length}
                  </Badge>
                </div>
              )}
            </div>

            {/* Thumbnail strip for multiple images */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden ${
                      index === currentImageIndex ? 'border-blue-500' : 'border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="space-y-4 lg:space-y-6">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">
                KSh {car.price.toLocaleString()}
              </div>
              <p className="text-sm sm:text-base text-gray-600">{car.description}</p>
            </div>

            {/* Specifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Year</p>
                  <p className="text-sm sm:text-base font-semibold">{car.year}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Gauge className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Mileage</p>
                  <p className="text-sm sm:text-base font-semibold">{car.mileage || 'N/A'}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Fuel className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Fuel Type</p>
                  <p className="text-sm sm:text-base font-semibold">{car.fuel_type || 'N/A'}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Seats</p>
                  <p className="text-sm sm:text-base font-semibold">{car.seats || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Transmission */}
            {car.transmission && (
              <div>
                <p className="text-xs sm:text-sm text-gray-500 mb-1">Transmission</p>
                <Badge variant="outline" className="text-xs sm:text-sm">{car.transmission}</Badge>
              </div>
            )}

            {/* Features */}
            {car.features && car.features.length > 0 && (
              <div>
                <p className="text-xs sm:text-sm text-gray-500 mb-2">Features</p>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {car.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button 
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-sm sm:text-base" 
                disabled={!car.in_stock}
              >
                {car.in_stock ? "Contact Dealer" : "Notify When Available"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
