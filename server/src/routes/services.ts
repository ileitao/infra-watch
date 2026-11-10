import { FastifyInstance } from 'fastify';
import { prisma } from '../db';

export async function servicesRoutes(app: FastifyInstance) {
  app.get('/orgs/:orgId/services', async (request, reply) => {
    const { orgId } = request.params as { orgId: string };

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
  });
}
