import { useQuery } from '@tanstack/react-query';
import { getMovies } from './api';

export const useGetMovies = (filters?:object) => {
  return useQuery({
    queryKey: ['movies', filters],
    queryFn: ()=>getMovies(filters),
  });
};
