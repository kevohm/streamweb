import { axiosClient } from '../../lib/axios';

export const getMovies = async (filters?: object) => {
  const { data } = await axiosClient.get('/video/trending-movies', {
    params: filters,
  });
  return data;
};
