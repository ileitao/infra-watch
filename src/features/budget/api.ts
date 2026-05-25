// fake data for now...
import seed from '../../data/seed';
import type { Budget } from '../../types';

export const fetchBudget = async (
  orgId: string,
): Promise<Budget | undefined> => {
  // simulate network latency
  await new Promise((r) => setTimeout(r, 300));
  return seed.budgets.find((s) => s.orgId === orgId);
};
