import { FastifyInstance } from 'fastify';
import { prisma } from '../db';
import { servicesRoutes } from '../routes/services';
import { overviewRoutes } from '../routes/overview';

export async function orgScope(app: FastifyInstance) {
  app.addHook('preHandler', async (request, reply) => {
    const { orgId } = request.params as { orgId: string };

    const organization = await prisma.organization.findUnique({
      where: { id: orgId },
      select: { id: true },
    });

    if (!organization) {
      return reply.code(404).send({ error: 'Organization not found' });
    }
  });

  app.register(servicesRoutes);
  app.register(overviewRoutes);
}
