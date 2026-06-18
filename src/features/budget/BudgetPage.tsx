import { useEffect } from 'react';
import useAppStore from '@/store/appStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { BudgetFormValues } from './schema';
import type { Budget } from '@/types';
import { budgetSchema } from './schema';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useBudget } from './useBudget';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function BudgetPage() {
  const { currentOrgId } = useAppStore();
  const { data: budget, isLoading } = useBudget(currentOrgId ?? '');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [localBudgets, setLocalBudgets] = useState<Budget[]>([]);

  // sync local state when query data arrives
  useEffect(() => {
    if (budget) setLocalBudgets([budget]);
  }, [budget]);

  // Wire up form
  const form = useForm<BudgetFormValues>({
    resolver: zodResolver(budgetSchema),
    defaultValues: { amount: 0, period: '2025-04' },
  });

  function onSubmit(values: BudgetFormValues) {
    if (editingId) {
      setLocalBudgets((prev) =>
        prev.map((b) =>
          b.id === editingId
            ? { ...b, amount: values.amount, period: values.period }
            : b,
        ),
      );
    } else {
      const newBudget: Budget = {
        id: `bud_${Date.now()}`,
        orgId: currentOrgId ?? '',
        amount: values.amount,
        period: values.period,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setLocalBudgets((prev) => [...prev, newBudget]);
    }
    setEditingId(null);
    form.reset({ amount: 0, period: '2025-04' });
  }

  function handleDelete(id: string) {
    setLocalBudgets((prev) => prev.filter((b) => b.id !== id));
  }

  function handleEdit(b: Budget) {
    setEditingId(b.id);
    form.reset({ amount: b.amount, period: b.period });
  }

  if (isLoading) return <Skeleton className="h-8 w-24 mt-1" />;

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Budgets</h1>

      {/* Current budgets table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Current Budgets</CardTitle>
        </CardHeader>
        <CardContent>
          {localBudgets.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Period</TableHead>
                  <TableHead className="text-center">Amount</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {localBudgets.map((b) => (
                  <TableRow>
                    <TableCell>{b.period}</TableCell>
                    <TableCell className="text-center">
                      ${b.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(b)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(b.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-sm text-muted-foreground">
              No budget configured for this organization.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            {editingId ? 'Edit Budget' : 'Add Budget'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Wrap each input in a FormField */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="5000"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="period"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Period</FormLabel>
                    <FormControl>
                      <Input placeholder="2025-04" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2">
                <Button type="submit">{editingId ? 'Update' : 'Create'}</Button>
                {editingId && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditingId(null);
                      form.reset({ amount: 0, period: '2025-04' });
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
