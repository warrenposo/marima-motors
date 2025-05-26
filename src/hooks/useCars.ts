
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';

type Car = Tables<'cars'>;
type CarInsert = TablesInsert<'cars'>;

export const useCars = () => {
  return useQuery({
    queryKey: ['cars'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Car[];
    },
  });
};

export const useCreateCar = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (carData: Omit<CarInsert, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('cars')
        .insert([carData])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
      toast({
        title: "Car added successfully",
        description: "The new car has been added to the inventory.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to add car",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useUpdateCar = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...carData }: Partial<Car> & { id: string }) => {
      const { data, error } = await supabase
        .from('cars')
        .update(carData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
      toast({
        title: "Car updated successfully",
        description: "The car information has been updated.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to update car",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useDeleteCar = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (carId: string) => {
      const { error } = await supabase
        .from('cars')
        .delete()
        .eq('id', carId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
      toast({
        title: "Car deleted successfully",
        description: "The car has been removed from the inventory.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to delete car",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
