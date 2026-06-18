import { z } from 'zod';

// 1. Define schema
export const budgetSchema = z.object({
  amount: z.number().min(1, 'Amount must be greater than 0'),
  period: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Format must be YYYY-MM'),
});

// 2. Infer TypeScript type from schema
export type BudgetFormValues = z.infer<typeof budgetSchema>;
