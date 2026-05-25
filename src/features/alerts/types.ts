// co-located types for alerts
import type { Alert } from '../../types';

export interface FiredAlert extends Alert {
  fired: boolean;
  currentPercent: number;
}
