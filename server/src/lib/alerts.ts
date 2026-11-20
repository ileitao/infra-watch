// server/src/lib/alerts.ts
import type { Alert } from '@prisma/client';

export type AlertStatus = Alert & {
  currentPercent: number | null;
  fired: boolean;
};

export function enrichAlerts<T extends { threshold: number }>(
  alerts: T[],
  usedPercent: number | null,
): (T & { currentPercent: number | null; fired: boolean })[] {
  return alerts.map((alert) => ({
    ...alert,
    currentPercent: usedPercent !== null ? usedPercent : null,
    fired: usedPercent !== null ? usedPercent >= alert.threshold : false,
  }));
}
