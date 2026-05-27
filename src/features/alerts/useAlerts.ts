import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../lib/queryKeys';
import { fetchAlerts } from './api';

export const useAlerts = (orgId: string) => {
  return useQuery({
    queryKey: queryKeys.alerts(orgId),
    queryFn: () => fetchAlerts(orgId),
    enabled: !!orgId,
  });
};
