// server/src/lib/alerts.ts
import type { Alert } from '@prisma/client';

export type AlertStatus = Alert & {
  currentPercent: number;
  fired: boolean;
};

export function enrichAlerts(
  alerts: Alert[],
  usedPercent: number,
): AlertStatus[] {
  return alerts.map((alert) => ({
    ...alert,
    currentPercent: usedPercent,
    fired: usedPercent >= alert.threshold,
  }));
}
