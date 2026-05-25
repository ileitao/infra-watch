import { useQuery } from '@tanstack/react-query';
import { fetchAlerts } from './api';

export const useAlerts = (orgId: string) => {
  return useQuery({
    queryKey: ['alerts', orgId],
    queryFn: () => fetchAlerts(orgId),
    enabled: !!orgId,
  });
};
