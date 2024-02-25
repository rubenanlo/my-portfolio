import { useRouter } from "next/router";
import { useState } from "react";

export const useGoBack = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleBack = () => {
    setIsLoading(true);
    router.back();
  };
  return { isLoading, handleBack };
};
