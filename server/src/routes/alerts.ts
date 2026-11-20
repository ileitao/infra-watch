import { FastifyInstance } from 'fastify';
import { prisma } from '../db';
import { round2 } from '../lib/round2';
import { enrichAlerts } from '../lib/alerts';
import { getSpendStatus } from '../lib/spendStatus';
import { periodQuerystringSchema } from '../lib/schemas';
import type { AlertType } from '@prisma/client';

interface AlertResponse {
  id: string;
  orgId: string;
  threshold: number;
  type: AlertType;
  notifiedTo: Array<string>;
  currentPercent: number | null;
  fired: boolean;
}

export async function alertsRoutes(app: FastifyInstance) {
  app.get<{
    Params: { orgId: string };
    Querystring: { period?: string };
    Reply: AlertResponse[];
  }>(
    '/alerts',
    {
      schema: {
        querystring: periodQuerystringSchema,
      },
    },
    async (request) => {
      const { orgId } = request.params;
      const { period } = request.query;

      const { usedPercent } = await getSpendStatus(orgId, period);

      const alerts = await prisma.alert.findMany({
        where: { orgId },
        select: {
          id: true,
          orgId: true,
          threshold: true,
          type: true,
          notifiedTo: true,
        },
        orderBy: { threshold: 'asc' },
      });
      const enriched = enrichAlerts(alerts, usedPercent);

      return enriched.map((a) => ({
        ...a,
        currentPercent:
          a.currentPercent === null ? null : round2(a.currentPercent),
      }));
    },
  );
}
