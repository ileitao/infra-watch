import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useAppStore from '@/store/appStore';
import { useSpendEntries } from '../spendEntries/useSpendEntries';
import { useBudget } from '../budget/useBudget';
import { Skeleton } from '@/components/ui/skeleton';

const SpendChart = () => {
  const { currentOrgId } = useAppStore();
  const { data: spendEntries, isLoading: isLoadingSpendEntries } =
    useSpendEntries(currentOrgId ?? '');
  const { data: budget, isLoading: isLoadingBudget } = useBudget(
    currentOrgId ?? '',
  );

  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

  const chartData = spendEntries
    ? Object.entries(
        spendEntries.reduce(
          (acc, entry) => {
            acc[entry.billingPeriod] =
              (acc[entry.billingPeriod] ?? 0) + entry.amount;
            return acc;
          },
          {} as Record<string, number>,
        ),
      )
        .map(([key, value]) => ({ period: key, total: value }))
        .sort((a, b) => a.period.localeCompare(b.period))
    : [];

  if (isLoadingSpendEntries || isLoadingBudget)
    return <Skeleton className="h-[300px] w-full" />;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Monthly Spend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="period" />
            <YAxis
              domain={[
                0,
                Math.ceil(
                  (Math.max(
                    budget?.amount ?? 0,
                    ...chartData.map((d) => d.total),
                  ) *
                    1.1) /
                    1000,
                ) * 1000,
              ]}
            />
            <Tooltip
              formatter={(value: number) => [formatCurrency(value), 'Spend']}
            />
            <Line type="monotone" dataKey="total" stroke="#6366f1" />
            <ReferenceLine
              y={budget?.amount}
              stroke="#ef4444"
              strokeDasharray="3 3"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SpendChart;
