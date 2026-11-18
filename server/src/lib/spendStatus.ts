import { prisma } from '../db';

interface SpendStatus {
  period: string | null;
  totalSpend: number;
  budgetAmount: number | null;
  usedPercent: number | null;
}

export async function getSpendStatus(
  orgId: string,
  period?: string,
): Promise<SpendStatus> {
  const services = await prisma.service.findMany({
    where: { orgId },
    select: { id: true },
  });
  const serviceIds = services.map((s) => s.id);

  let effectivePeriod = period;
  if (!effectivePeriod) {
    const latest = await prisma.spendEntry.aggregate({
      _max: { billingPeriod: true },
      where: { serviceId: { in: serviceIds } },
    });
    effectivePeriod = latest._max.billingPeriod ?? undefined;
  }

  if (!effectivePeriod) {
    return {
      period: null,
      totalSpend: 0,
      budgetAmount: null,
      usedPercent: null,
    };
  }

  const spendAggregate = await prisma.spendEntry.aggregate({
    _sum: { amount: true },
    where: { serviceId: { in: serviceIds }, billingPeriod: effectivePeriod },
  });

  const spent = spendAggregate._sum.amount ?? 0;
  let usedPercent: number | null = null;

  const budget = await prisma.budget.findUnique({
    where: { orgId_period: { orgId, period: effectivePeriod } },
  });

  if (budget && budget.amount > 0) {
    usedPercent = (spent * 100) / budget.amount;
  }

  return {
    period: effectivePeriod,
    totalSpend: spent,
    budgetAmount: budget?.amount ?? null,
    usedPercent,
  };
}
