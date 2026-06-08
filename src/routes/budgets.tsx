import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/budgets')({
  component: () => <div>Budgets</div>,
});
