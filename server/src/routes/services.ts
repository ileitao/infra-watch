import { FastifyInstance } from 'fastify';
import { prisma } from '../db';

export async function servicesRoutes(app: FastifyInstance) {
  app.get<{ Params: { orgId: string } }>(
    '/orgs/:orgId/services',
    async (request) => {
      const { orgId } = request.params;

      const services = await prisma.service.findMany({
        where: { orgId },
        select: {
          id: true,
          name: true,
          provider: true,
          orgId: true,
        },
      });

      return services;
    },
  );
}
