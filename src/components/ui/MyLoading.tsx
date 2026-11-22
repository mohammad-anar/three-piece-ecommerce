"use client";

import { useEffect, useState } from "react";

const MyLoading = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="h-full w-full min-h-[300px] flex flex-col justify-center items-center gap-4">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      <span className="text-sm font-medium text-content-muted uppercase tracking-wider">
        Loading...
      </span>
    </div>
  );
};

export default MyLoading;
