// fake data for now...
import seed from '../../data/seed';
import type { Service } from '../../types';

export const fetchServices = async (orgId: string): Promise<Service[]> => {
  // simulate network latency
  await new Promise((r) => setTimeout(r, 300));
  return seed.services.filter((s) => s.orgId === orgId);
};
