import { FastifyInstance } from 'fastify';
import { prisma } from '../db';
import { alertsRoutes } from '../routes/alerts';
import { overviewRoutes } from '../routes/overview';
import { servicesRoutes } from '../routes/services';

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

  app.register(alertsRoutes);
  app.register(overviewRoutes);
  app.register(servicesRoutes);
}
