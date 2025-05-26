
import { Car, Truck, Zap, Crown } from 'lucide-react';
import { useState } from 'react';
import { useCars } from '@/hooks/useCars';
import { CarDetailModal } from '@/components/CarDetailModal';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const CategoriesSection = () => {
  const { data: cars } = useCars();
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingCategory, setViewingCategory] = useState(null);

  const categories = [
    {
      icon: Crown,
      name: "Luxury Cars",
      description: "Premium vehicles from Mercedes, BMW, Audi",
      count: "45+ vehicles",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
      filter: "Luxury"
    },
    {
      icon: Car,
      name: "Toyota Collection",
      description: "Reliable and efficient Toyota vehicles",
      count: "38+ vehicles",
      image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=400&h=300&fit=crop",
      filter: "Toyota"
    },
    {
      icon: Zap,
      name: "Sports Cars",
      description: "High-performance sports and racing cars",
      count: "22+ vehicles",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop",
      filter: "Sports"
    },
    {
      icon: Truck,
      name: "SUVs & Trucks",
      description: "Family-friendly SUVs and work trucks",
      count: "31+ vehicles",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop",
      filter: "SUV"
    }
  ];

  const handleViewCollection = (category) => {
    setViewingCategory(category);
  };

  const handleCarClick = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const getFilteredCars = (filter) => {
    if (!cars) return [];
    if (filter === "Toyota") {
      return cars.filter(car => car.brand.toLowerCase().includes('toyota'));
    }
    return cars.filter(car => car.category === filter);
  };

  if (viewingCategory) {
    const filteredCars = getFilteredCars(viewingCategory.filter);
    
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
                {viewingCategory.name}
              </h2>
              <p className="text-xl text-gray-600">
                {viewingCategory.description}
              </p>
            </div>
            <button
              onClick={() => setViewingCategory(null)}
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              ← Back to Categories
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <Card 
                key={car.id} 
                className="overflow-hidden car-card-hover bg-white border-0 shadow-lg cursor-pointer"
                onClick={() => handleCarClick(car)}
              >
                <div className="relative">
                  <img
                    src={car.main_image_url || "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop"}
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
                </div>

                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{car.brand} {car.name}</h3>
                    <p className="text-3xl font-bold text-blue-600">
                      KSh {car.price.toLocaleString()}
                    </p>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {car.description}
                  </p>

                  {car.features && car.features.length > 0 && (
                    <div className="mb-4">
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
                </CardContent>
              </Card>
            ))}
          </div>

          <CarDetailModal 
            car={selectedCar}
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Vehicle Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our diverse collection of premium vehicles across different categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 car-card-hover cursor-pointer"
              onClick={() => handleViewCollection(category)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-4">
                  <div className="bg-gold-500 p-3 rounded-full">
                    <category.icon className="w-6 h-6 text-black" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                  <p className="text-gold-400 font-semibold">{category.count}</p>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4">{category.description}</p>
                <button className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                  View Collection →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
