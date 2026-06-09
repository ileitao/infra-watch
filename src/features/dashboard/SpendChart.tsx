import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import useAppStore from '@/store/appStore';
import { useSpendEntries } from '../spendEntries/useSpendEntries';
import { Skeleton } from '@/components/ui/skeleton';

const SpendChart = () => {
  const { currentOrgId } = useAppStore();
  const { data: spendEntries, isLoading: isLoadingSpendEntries } =
    useSpendEntries(currentOrgId ?? '');

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

  if (isLoadingSpendEntries) return <Skeleton className="h-[300px] w-full" />;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <XAxis dataKey="period" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="total" stroke="#6366f1" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SpendChart;
