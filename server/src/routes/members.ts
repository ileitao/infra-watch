import { FastifyInstance } from 'fastify';
import { prisma } from '../db';
import type { Role, User } from '@prisma/client';

interface MembersResponse {
  id: string;
  role: Role;
  joinedAt: string;
  user: Pick<User, 'id' | 'name' | 'email'>;
}

export async function membersRoutes(app: FastifyInstance) {
  app.get<{
    Params: { orgId: string };
    Reply: MembersResponse[];
  }>('/members', async (request) => {
    const { orgId } = request.params;
    const members = await prisma.orgMembership.findMany({
      where: { orgId },
      select: {
        id: true,
        userId: true,
        role: true,
        joinedAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: [{ joinedAt: 'asc' }, { user: { name: 'asc' } }],
    });

    return members.map((member) => ({
      id: member.id,
      role: member.role,
      joinedAt: member.joinedAt.toISOString(),
      user: member.user,
    }));
  });
}
