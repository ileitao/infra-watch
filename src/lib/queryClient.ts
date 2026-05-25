import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000 * 60 * 5, // 5 minutes (in milliseconds)
    },
  },
});

export default queryClient;
