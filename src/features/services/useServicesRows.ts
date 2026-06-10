import { useServices } from './useServices';
import { useSpendEntries } from '@/features/spendEntries/useSpendEntries';
import type { ServiceRow } from './types';

// Hardcoded period
const CURRENT_PERIOD = '2025-04';

export const useServiceRows = (
  orgId: string,
  // period as param, replaces CURRENT_PERIOD
): {
  data: ServiceRow[];
  isLoading: boolean;
} => {
  const { data: services, isLoading: isServicesLoading } = useServices(
    orgId ?? '',
  );
  const { data: spendEntries, isLoading: isSpendEntriesLoading } =
    useSpendEntries(orgId ?? '');

  if (isSpendEntriesLoading || isServicesLoading)
    return {
      data: [],
      isLoading: true,
    };

  const totalOrgSpend =
    spendEntries
      ?.filter((se) => se.billingPeriod === CURRENT_PERIOD)
      .reduce((acc, se) => acc + se.amount, 0) ?? 0;

  const serviceRowData = services?.map((service) => {
    const serviceEntries = spendEntries?.filter(
      (se) =>
        se.serviceId === service.id && se.billingPeriod === CURRENT_PERIOD, // it should use period arg
    );

    const currentSpendAmountByPeriod =
      serviceEntries?.reduce((acc, current) => acc + current.amount, 0) ?? 0;

    return {
      id: service.id,
      name: service.name,
      provider: service.provider,
      currentSpend: currentSpendAmountByPeriod,
      percentOfTotal: (currentSpendAmountByPeriod / totalOrgSpend) * 100,
      trend:
        spendEntries
          ?.filter((se) => se.serviceId === service.id)
          ?.map((se) => ({
            period: se.billingPeriod,
            amount: se.amount,
          }))
          .sort((a, b) => a.period.localeCompare(b.period)) ?? [],
    };
  });
  return { data: serviceRowData ?? [], isLoading: false };
};
