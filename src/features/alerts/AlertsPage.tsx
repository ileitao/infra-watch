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
import { useAlerts } from './useAlerts';
import { cn } from '@/lib/utils';
import type { FiredAlert } from './types';
import seed from '@/data/seed';

const SEVERITY_ORDER = ['ALERT', 'WARNING', 'INFO'] as const;

const sortBySeverity = (alerts: FiredAlert[]) =>
  [...alerts].sort(
    (a, b) => SEVERITY_ORDER.indexOf(a.type) - SEVERITY_ORDER.indexOf(b.type),
  );

const typeColor: Record<string, string> = {
  ALERT: 'bg-red-100 text-red-700',
  WARNING: 'bg-orange-100 text-orange-700',
  INFO: 'bg-blue-100 text-blue-700',
};

const firedBorderColor: Record<string, string> = {
  ALERT: 'border-l-4 border-l-red-500',
  WARNING: 'border-l-4 border-l-orange-500',
  INFO: 'border-l-4 border-l-blue-500',
};

const getUserNames = (userIds: string[]) =>
  userIds
    .map((id) => seed.users.find((u) => u.id === id)?.name ?? id)
    .join(', ');

export default function AlertsPage() {
  const { currentOrgId } = useAppStore();
  const { data: alerts, isLoading } = useAlerts(currentOrgId ?? '');

  const sortedAlerts = sortBySeverity(alerts ?? []);

  if (isLoading) return <Skeleton className="h-8 w-24 mt-1" />;

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Alerts</h1>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead className="text-center">Threshold</TableHead>
              <TableHead className="text-center">Current %</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Notified To</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAlerts.map((alert) => (
              <TableRow
                key={alert.id}
                className={alert.fired ? firedBorderColor[alert.type] : ''}
              >
                <TableCell>{alert.type}</TableCell>
                <TableCell>{alert.threshold}</TableCell>
                <TableCell className="text-center">
                  {alert.currentPercent.toFixed(1)}%
                </TableCell>
                <TableCell className="text-center">
                  {' '}
                  <span
                    className={cn(
                      'px-2 py-0.5 rounded text-xs font-medium',
                      typeColor[alert.type],
                    )}
                  >
                    {alert.type}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  {getUserNames(alert?.notifiedTo ?? [])}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
