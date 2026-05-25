import { useQuery } from '@tanstack/react-query';
import { fetchBudget } from './api';

export const useBudget = (orgId: string) => {
  return useQuery({
    queryKey: ['budgets', orgId],
    queryFn: () => fetchBudget(orgId),
    enabled: !!orgId,
  });
};
