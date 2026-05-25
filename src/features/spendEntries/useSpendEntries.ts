import { useQuery } from '@tanstack/react-query';
import { fetchSpendEntries } from './api';

export const useSpendEntries = (orgId: string) => {
  return useQuery({
    queryKey: ['budgets', orgId],
    queryFn: () => fetchSpendEntries(orgId),
    enabled: !!orgId,
  });
};
