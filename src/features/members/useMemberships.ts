import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../lib/queryKeys';
import { fetchMemberships } from './api';

export const useMemberships = (orgId: string) => {
  return useQuery({
    queryKey: queryKeys.memberships(orgId),
    queryFn: () => fetchMemberships(orgId),
    enabled: !!orgId,
  });
};
