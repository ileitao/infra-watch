import OverviewCards from './OverviewCards';
import SpendChart from './SpendChart';

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Overview</h1>
      <OverviewCards />
      <SpendChart />
    </div>
  );
}
