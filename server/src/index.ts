import Fastify from 'fastify';
import { prisma } from './db';
import { orgScope } from './plugins/orgScope';

const isDev = process.env.NODE_ENV !== 'production';

const app = Fastify({
  logger: isDev ? { transport: { target: 'pino-pretty' } } : true,
});

app.register(orgScope, { prefix: '/orgs/:orgId' });

app.get('/health', async () => {
  return { status: 'ok' };
});

const start = async () => {
  try {
    await prisma.$connect();
    await app.listen({ port: 3000 });
    console.log('Server running on http://localhost:3000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
