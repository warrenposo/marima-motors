
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Fuel, Gauge, Users, Calendar } from 'lucide-react';
import { useCars } from '@/hooks/useCars';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import { CarDetailModal } from '@/components/CarDetailModal';

const CarListings = () => {
  const { data: cars, isLoading, error } = useCars();
  const { user } = useAuth();
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCarClick = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-white" id="inventory">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Our Premium Inventory
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Loading our handpicked selection of premium vehicles...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-300"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded mb-4"></div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="h-4 bg-gray-300 rounded"></div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 h-10 bg-gray-300 rounded"></div>
                    <div className="flex-1 h-10 bg-gray-300 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white" id="inventory">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Our Premium Inventory
            </h2>
            <p className="text-xl text-red-600">
              Unable to load inventory. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white" id="inventory">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Our Premium Inventory
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium vehicles, each thoroughly inspected and certified
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars?.map((car) => (
            <Card 
              key={car.id} 
              className="overflow-hidden car-card-hover bg-white border-0 shadow-lg cursor-pointer"
              onClick={() => handleCarClick(car)}
            >
              <div className="relative">
                <img
                  src={car.main_image_url || car.image_urls?.[0] || "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop"}
                  alt={car.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge 
                    variant={car.in_stock ? "default" : "destructive"}
                    className={car.in_stock ? "bg-green-500 hover:bg-green-600" : ""}
                  >
                    {car.in_stock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-gold-500 text-black hover:bg-gold-600">
                    {car.category}
                  </Badge>
                </div>
                {/* Show image count if multiple images */}
                {car.image_urls && car.image_urls.length > 1 && (
                  <div className="absolute bottom-2 right-2">
                    <Badge variant="secondary" className="bg-black/50 text-white text-xs">
                      {car.image_urls.length} photos
                    </Badge>
                  </div>
                )}
              </div>

              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{car.brand} {car.name}</h3>
                  <p className="text-3xl font-bold text-blue-600">
                    KSh {car.price.toLocaleString()}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{car.year}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Gauge className="w-4 h-4" />
                    <span>{car.mileage || 'N/A'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Fuel className="w-4 h-4" />
                    <span>{car.fuel_type || 'N/A'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{car.seats || 'N/A'} seats</span>
                  </div>
                </div>

                {car.features && car.features.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Key Features:</p>
                    <div className="flex flex-wrap gap-1">
                      {car.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {car.features.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{car.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <Button 
                    className="flex-1 bg-blue-600 hover:bg-blue-700" 
                    disabled={!car.in_stock}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCarClick(car);
                    }}
                  >
                    {car.in_stock ? "View Details" : "Notify When Available"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-black font-semibold px-8">
            View All Inventory
          </Button>
        </div>

        <CarDetailModal 
          car={selectedCar}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      </div>
    </section>
  );
};

export default CarListings;
