// fake data for now...
import seed from '../../data/seed';
import type { SpendEntry } from '../../types';

export const fetchSpendEntries = async (
  orgId: string,
): Promise<SpendEntry[] | undefined> => {
  // simulate network latency
  await new Promise((r) => setTimeout(r, 300));

  const servicesIds = seed.services
    .filter((s) => s.orgId === orgId)
    .map((s) => s.id);
  await new Promise((r) => setTimeout(r, 300));
  return seed.spendEntries.filter((e) => servicesIds.includes(e.serviceId));
};
