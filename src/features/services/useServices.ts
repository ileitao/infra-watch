import { useQuery } from '@tanstack/react-query';
import { fetchServices } from './api';

export const useServices = (orgId: string) => {
  return useQuery({
    queryKey: ['services', orgId],
    queryFn: () => fetchServices(orgId),
    enabled: !!orgId,
  });
};
