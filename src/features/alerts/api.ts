// fake data for now...
import seed from '../../data/seed';
import type { FiredAlert } from './types';

export const fetchAlerts = async (orgId: string): Promise<FiredAlert[]> => {
  // simulate network latency
  await new Promise((r) => setTimeout(r, 300));

  const budget = seed.budgets.find((b) => b.orgId === orgId);
  if (!budget) return [];

  const serviceIds = seed.services
    .filter((s) => s.orgId === orgId)
    .map((s) => s.id);

  const currentPeriod = '2025-04';

  const currentSpend = seed.spendEntries
    .filter(
      (e) =>
        serviceIds.includes(e.serviceId) && e.billingPeriod === currentPeriod,
    )
    .reduce((sum, e) => sum + e.amount, 0);

  const currentPercent = (currentSpend / budget.amount) * 100;

  return seed.alerts
    .filter((a) => a.orgId === orgId)
    .map((a) => ({
      ...a,
      fired: currentPercent >= a.threshold,
      currentPercent,
    }));
};
