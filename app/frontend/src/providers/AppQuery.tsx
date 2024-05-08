"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";

const AppQuery: React.FC = (props) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
};

export default AppQuery;
