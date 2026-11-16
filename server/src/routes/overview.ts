import { FastifyInstance } from 'fastify';
import { prisma } from '../db';
import { enrichAlerts } from '../lib/alerts';
import { round2 } from '../lib/round2';

interface OverviewResponse {
  period: string | null;
  totalSpend: number;
  budgetAmount: number | null;
  budgetUsedPercent: number | null;
  activeAlerts: number;
  monthlySpend: {
    period: string;
    total: number;
  }[];
}

export async function overviewRoutes(app: FastifyInstance) {
  app.get<{
    Params: { orgId: string };
    Querystring: { period?: string };
    Reply: OverviewResponse;
  }>(
    '/orgs/:orgId/overview',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            period: { type: 'string', pattern: '^\\d{4}-(0[1-9]|1[0-2])$' },
          },
        },
      },
    },
    async (request) => {
      const { orgId } = request.params;
      const { period } = request.query;

      // Getting the serviceIds first so I can use it in monthly spend and effectivePeriod aggregate's
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

      // max billingPeriod not found
      if (!effectivePeriod) {
        return {
          period: null,
          totalSpend: 0,
          budgetAmount: null,
          budgetUsedPercent: null,
          activeAlerts: 0,
          monthlySpend: [],
        };
      }

      const monthlySpend = await prisma.spendEntry.groupBy({
        by: ['billingPeriod'],
        where: { serviceId: { in: serviceIds } },
        _sum: { amount: true },
        orderBy: { billingPeriod: 'asc' },
      });

      const totalSpend =
        monthlySpend.find((m) => m.billingPeriod === effectivePeriod)?._sum
          .amount ?? 0;

      let budgetUsedPercent: number | null = null;
      let activeAlerts = 0;

      const budget = await prisma.budget.findUnique({
        where: { orgId_period: { orgId, period: effectivePeriod } },
      });

      if (budget && budget.amount > 0) {
        const rawPercent = (totalSpend * 100) / budget.amount;

        const alerts = await prisma.alert.findMany({ where: { orgId } });
        activeAlerts = enrichAlerts(alerts, rawPercent).filter(
          (a) => a.fired,
        ).length;

        budgetUsedPercent = round2(rawPercent);
      }

      return {
        period: effectivePeriod,
        totalSpend: round2(totalSpend),
        budgetAmount: budget?.amount ?? null,
        budgetUsedPercent,
        activeAlerts,
        monthlySpend: monthlySpend.map((m) => ({
          period: m.billingPeriod,
          total: round2(m._sum.amount ?? 0),
        })),
      };
    },
  );
}
