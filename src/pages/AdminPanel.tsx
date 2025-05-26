
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useCars, useCreateCar, useUpdateCar, useDeleteCar } from '@/hooks/useCars';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { ImageUpload } from '@/components/ImageUpload';

const AdminPanel = () => {
  const { user, userRole } = useAuth();
  const { data: cars, isLoading } = useCars();
  const createCar = useCreateCar();
  const updateCar = useUpdateCar();
  const deleteCar = useDeleteCar();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    year: '',
    mileage: '',
    fuel_type: '',
    transmission: '',
    seats: '',
    category: '',
    description: '',
    features: '',
    image_urls: [],
    in_stock: true
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
            <p className="text-gray-600 mb-4">Please log in to access the admin panel.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (userRole !== 'admin' && userRole !== 'manager') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
            <p className="text-gray-600 mb-4">You don't have permission to access the admin panel.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const resetForm = () => {
    setFormData({
      name: '',
      brand: '',
      price: '',
      year: '',
      mileage: '',
      fuel_type: '',
      transmission: '',
      seats: '',
      category: '',
      description: '',
      features: '',
      image_urls: [],
      in_stock: true
    });
    setEditingCar(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const carData = {
      ...formData,
      price: parseFloat(formData.price),
      year: parseInt(formData.year),
      seats: formData.seats ? parseInt(formData.seats) : null,
      features: formData.features ? formData.features.split(',').map(f => f.trim()) : [],
      main_image_url: formData.image_urls[0] || null
    };

    try {
      if (editingCar) {
        await updateCar.mutateAsync({ id: editingCar.id, ...carData });
      } else {
        await createCar.mutateAsync(carData);
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving car:', error);
    }
  };

  const handleEdit = (car) => {
    setEditingCar(car);
    setFormData({
      name: car.name,
      brand: car.brand,
      price: car.price.toString(),
      year: car.year.toString(),
      mileage: car.mileage || '',
      fuel_type: car.fuel_type || '',
      transmission: car.transmission || '',
      seats: car.seats?.toString() || '',
      category: car.category,
      description: car.description || '',
      features: car.features?.join(', ') || '',
      image_urls: car.image_urls || [],
      in_stock: car.in_stock
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (carId) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await deleteCar.mutateAsync(carId);
      } catch (error) {
        console.error('Error deleting car:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => window.location.href = '/'}
              variant="outline"
              className="hover:bg-gray-100"
            >
              Back to Home
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Add New Car
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingCar ? 'Edit Car' : 'Add New Car'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Car Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="brand">Brand</Label>
                    <Input
                      id="brand"
                      value={formData.brand}
                      onChange={(e) => setFormData({...formData, brand: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price (KSh)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      placeholder="e.g., 2500000"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData({...formData, year: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="mileage">Mileage (km)</Label>
                    <Input
                      id="mileage"
                      value={formData.mileage}
                      onChange={(e) => setFormData({...formData, mileage: e.target.value})}
                      placeholder="e.g., 50,000 km"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fuel_type">Fuel Type</Label>
                    <Select value={formData.fuel_type} onValueChange={(value) => setFormData({...formData, fuel_type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select fuel type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Gasoline">Gasoline</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                        <SelectItem value="Electric">Electric</SelectItem>
                        <SelectItem value="Diesel">Diesel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="seats">Seats</Label>
                    <Input
                      id="seats"
                      type="number"
                      value={formData.seats}
                      onChange={(e) => setFormData({...formData, seats: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="transmission">Transmission</Label>
                    <Select value={formData.transmission} onValueChange={(value) => setFormData({...formData, transmission: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select transmission" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Automatic">Automatic</SelectItem>
                        <SelectItem value="Manual">Manual</SelectItem>
                        <SelectItem value="CVT">CVT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Luxury">Luxury</SelectItem>
                        <SelectItem value="Sedan">Sedan</SelectItem>
                        <SelectItem value="SUV">SUV</SelectItem>
                        <SelectItem value="Sports">Sports</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <ImageUpload
                  images={formData.image_urls}
                  onImagesChange={(images) => setFormData({...formData, image_urls: images})}
                />

                <div>
                  <Label htmlFor="features">Features (comma separated)</Label>
                  <Input
                    id="features"
                    value={formData.features}
                    onChange={(e) => setFormData({...formData, features: e.target.value})}
                    placeholder="Navigation, Sunroof, Leather Interior"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="in_stock"
                    checked={formData.in_stock}
                    onChange={(e) => setFormData({...formData, in_stock: e.target.checked})}
                    className="rounded"
                  />
                  <Label htmlFor="in_stock">In Stock</Label>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    {editingCar ? 'Update Car' : 'Add Car'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="text-center py-8">Loading cars...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars?.map((car) => (
              <Card key={car.id} className="overflow-hidden">
                <div className="relative">
                  <img
                    src={car.main_image_url || car.image_urls?.[0] || "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop"}
                    alt={car.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant={car.in_stock ? "default" : "destructive"}>
                      {car.in_stock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2">{car.brand} {car.name}</h3>
                  <p className="text-2xl font-bold text-blue-600 mb-2">
                    KSh {car.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">{car.description}</p>
                  <div className="flex justify-between items-center">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => window.open(`tel:+254713093898`, '_blank')}
                    >
                      Contact Seller
                    </Button>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(car)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(car.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
