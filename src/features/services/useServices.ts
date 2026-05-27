import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../lib/queryKeys';
import { fetchServices } from './api';

export const useServices = (orgId: string) => {
  return useQuery({
    queryKey: queryKeys.services(orgId),
    queryFn: () => fetchServices(orgId),
    enabled: !!orgId,
  });
};
