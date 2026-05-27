import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../lib/queryKeys';
import { fetchSpendEntries } from './api';

export const useSpendEntries = (orgId: string) => {
  return useQuery({
    queryKey: queryKeys.spendEntries(orgId),
    queryFn: () => fetchSpendEntries(orgId),
    enabled: !!orgId,
  });
};
