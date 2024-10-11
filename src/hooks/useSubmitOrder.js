"use client";

import { useRouter } from "next/navigation";

export const useSubmitOrder = () => {
  const router = useRouter();

  const navigateToCheckout = (items) => {
    router.push("/checkout", { scroll: true });
    router.refresh();
  };

  return navigateToCheckout;
};
