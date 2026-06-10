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
import { LineChart, Line } from 'recharts';
import { useServiceRows } from './useServicesRows';
import { cn } from '@/lib/utils';

const providerColor: Record<string, string> = {
  AWS: 'bg-orange-100 text-orange-700',
  VERCEL: 'bg-zinc-100 text-zinc-700',
  RENDER: 'bg-green-100 text-green-700',
};

export default function ServicesPage() {
  const { currentOrgId } = useAppStore();
  const { data: rows, isLoading } = useServiceRows(currentOrgId ?? '');

  if (isLoading) return <Skeleton className="h-8 w-24 mt-1" />;

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Services</h1>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-center">Provider</TableHead>
              <TableHead className="text-center">Current Spend</TableHead>
              <TableHead className="text-center">% of Total</TableHead>
              <TableHead className="text-center">Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell className="text-center">
                  {' '}
                  <span
                    className={cn(
                      'px-2 py-0.5 rounded text-xs font-medium',
                      providerColor[row.provider],
                    )}
                  >
                    {row.provider}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  {row.currentSpend.toLocaleString()}
                </TableCell>
                <TableCell className="text-center">
                  {row.percentOfTotal.toFixed(1)}%
                </TableCell>
                <TableCell className="text-center">
                  <LineChart width={80} height={32} data={row.trend}>
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="#6366f1"
                      dot={false}
                      strokeWidth={1.5}
                    />
                  </LineChart>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
