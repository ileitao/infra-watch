import { FastifyInstance } from 'fastify';
import { prisma } from '../db';
import { round2 } from '../lib/round2';
import { enrichAlerts } from '../lib/alerts';
import { getSpendStatus } from '../lib/spendStatus';

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
    '/overview',
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

      const {
        period: effectivePeriod,
        totalSpend,
        budgetAmount,
        usedPercent,
      } = await getSpendStatus(orgId, period);

      if (effectivePeriod === null) {
        return {
          period: null,
          totalSpend, // already calc'ed in getSpendStatus
          budgetAmount, // already calc'ed in getSpendStatus
          budgetUsedPercent: usedPercent, // already calc'ed in getSpendStatus
          activeAlerts: 0,
          monthlySpend: [],
        };
      }

      const services = await prisma.service.findMany({
        where: { orgId },
        select: { id: true },
      });
      const serviceIds = services.map((s) => s.id);

      const monthlySpend = await prisma.spendEntry.groupBy({
        by: ['billingPeriod'],
        where: { serviceId: { in: serviceIds } },
        _sum: { amount: true },
        orderBy: { billingPeriod: 'asc' },
      });
      let activeAlerts = 0;

      if (usedPercent !== null) {
        const alerts = await prisma.alert.findMany({ where: { orgId } });
        activeAlerts = enrichAlerts(alerts, usedPercent).filter(
          (a) => a.fired,
        ).length;
      }

      return {
        period: effectivePeriod, // already calc'ed in getSpendStatus
        totalSpend: round2(totalSpend), // already calc'ed in getSpendStatus (now rounded)
        budgetAmount, // already calc'ed in getSpendStatus
        budgetUsedPercent: usedPercent === null ? null : round2(usedPercent), // already calc'ed in getSpendStatus (now rounded)
        activeAlerts,
        monthlySpend: monthlySpend.map((m) => ({
          period: m.billingPeriod,
          total: round2(m._sum.amount ?? 0),
        })),
      };
    },
  );
}
