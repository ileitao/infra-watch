// fake data for now...
import seed from '../../data/seed';
import type { OrgMembership } from '../../types';

export const fetchMemberships = async (
  orgId: string,
): Promise<OrgMembership[] | undefined> => {
  // simulate network latency
  await new Promise((r) => setTimeout(r, 300));
  return seed.memberships.filter((membership) => membership.orgId === orgId);
};
