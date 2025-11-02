"use client";

import { usePathname } from "next/navigation";
import ConditionalLoanStatus from "./ConditionalLoanStatus";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ConditionalContentWrapper({ children, activeLoan }: any) {
  const pathname = usePathname();
  const isChatPage = pathname?.includes("/chat");

  return (
    <div
      className={`flex-1 min-w-0 space-y-4 sm:space-y-6 ${
        isChatPage ? "" : "-mt-16 sm:-mt-20 md:-mt-24 lg:-mt-32"
      }`}
    >
      <ConditionalLoanStatus activeLoan={activeLoan} />
      {children}
    </div>
  );
}
