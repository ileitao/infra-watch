import useAppStore from '@/store/appStore';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { useMemberships } from './useMemberships';
import seed from '@/data/seed';
import { cn } from '@/lib/utils';

const roleColor: Record<string, string> = {
  ADMIN: 'bg-purple-100 text-purple-700',
  MEMBER: 'bg-zinc-100 text-zinc-700',
  VIEWER: 'bg-green-100 text-green-700',
};

const getUser = (userId: string) => seed.users.find((u) => u.id === userId);

export default function MembersPage() {
  const { currentOrgId } = useAppStore();
  const { data: memberships, isLoading } = useMemberships(currentOrgId ?? '');

  if (isLoading) return <Skeleton className="h-8 w-24 mt-1" />;

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Members</h1>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Role</TableHead>
              <TableHead className="text-center">Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {memberships?.map((membership) => (
              <TableRow key={membership.id}>
                <TableCell className="text-center">
                  {getUser(membership?.userId ?? '')?.name}
                </TableCell>
                <TableCell>
                  {getUser(membership?.userId ?? '')?.email}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={cn(
                      'px-2 py-0.5 rounded text-xs font-medium',
                      roleColor[membership.role],
                    )}
                  >
                    {membership.role}
                  </span>
                </TableCell>
                <TableCell>{membership.joinedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
