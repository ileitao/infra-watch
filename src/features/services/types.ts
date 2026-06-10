import type { Provider } from '@/types';

export interface ServiceRow {
  id: string;
  name: string;
  provider: Provider;
  currentSpend: number;
  percentOfTotal: number;
  trend: { period: string; amount: number }[];
}
