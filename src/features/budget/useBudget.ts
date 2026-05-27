import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../lib/queryKeys';
import { fetchBudget } from './api';

export const useBudget = (orgId: string) => {
  return useQuery({
    queryKey: queryKeys.budget(orgId),
    queryFn: () => fetchBudget(orgId),
    enabled: !!orgId,
  });
};
