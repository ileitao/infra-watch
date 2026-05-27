import useAppStore from '@/store/appStore';
import { useBudget } from '../budget/useBudget';
import { useSpendEntries } from '../spendEntries/useSpendEntries';
import { useAlerts } from '../alerts/useAlerts';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

// Hardcoded period
const CURRENT_PERIOD = '2025-04';

interface StatCardProps {
  label: string;
  value: string;
  isLoading: boolean;
  valueClassName?: string;
}

function StatCard({ label, value, isLoading, valueClassName }: StatCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground">{label}</p>
        {isLoading ? (
          <Skeleton className="h-8 w-24 mt-1" />
        ) : (
          <p className={cn('text-2xl font-semibold mt-1', valueClassName)}>
            {value}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

const getBudgetColor = (percent: number) => {
  if (percent > 100) return 'text-red-500';
  if (percent > 90) return 'text-orange-500';
  if (percent > 75) return 'text-yellow-500';
  return 'text-foreground';
};

export default function OverviewCards() {
  const { currentOrgId } = useAppStore();
  const { data: budget, isLoading: isLoadingBudget } = useBudget(
    currentOrgId ?? '',
  );
  const { data: spendEntries, isLoading: isLoadingSpendEntries } =
    useSpendEntries(currentOrgId ?? '');

  const { data: alerts, isLoading: isLoadingAlerts } = useAlerts(
    currentOrgId ?? '',
  );

  const totalSpend =
    spendEntries
      ?.filter((e) => e.billingPeriod === CURRENT_PERIOD)
      .reduce((sum, e) => sum + e.amount, 0) ?? 0;

  const budgetPercent = budget ? (totalSpend / budget.amount) * 100 : 0;

  const activeAlertCount = alerts?.filter((a) => a.fired).length ?? 0;

  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard
        label="Total Spend"
        value={`$${totalSpend.toLocaleString()}`}
        isLoading={isLoadingSpendEntries}
      />
      <StatCard
        label="Budget Limit"
        value={`$${budget?.amount.toLocaleString() ?? '—'}`}
        isLoading={isLoadingBudget}
      />
      <StatCard
        label="Budget Used"
        value={`${budgetPercent.toFixed(1)}%`}
        isLoading={isLoadingBudget || isLoadingSpendEntries}
        valueClassName={getBudgetColor(budgetPercent)}
      />
      <StatCard
        label="Active Alerts"
        value={String(activeAlertCount)}
        isLoading={isLoadingAlerts}
      />
    </div>
  );
}
