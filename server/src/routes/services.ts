import { FastifyInstance } from 'fastify';
import { prisma } from '../db';

export async function servicesRoutes(app: FastifyInstance) {
  app.get<{ Params: { orgId: string } }>('/services', async (request) => {
    const { orgId } = request.params;

    return await prisma.service.findMany({
      where: { orgId },
      select: {
        id: true,
        name: true,
        provider: true,
        orgId: true,
      },
    });
  });
}
