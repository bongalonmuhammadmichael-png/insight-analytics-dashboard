"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type DateRange = "7days" | "30days" | "90days" | "all";

type DashboardFilterContextType = {
  selectedRange: DateRange;
  setSelectedRange: (range: DateRange) => void;
  rangeLabel: string;
  startDate: Date | null;
  endDate: Date;
  includesDate: (date: string) => boolean;
};

const DashboardFilterContext =
  createContext<DashboardFilterContextType | undefined>(undefined);

// Our fictional dashboard data covers November 2026.
const DEMO_END_DATE = new Date(2026, 10, 30);

const rangeOptions: Record<
  DateRange,
  { label: string; days: number | null }
> = {
  "7days": { label: "Last 7 days", days: 7 },
  "30days": { label: "Last 30 days", days: 30 },
  "90days": { label: "Last 90 days", days: 90 },
  all: { label: "All time", days: null },
};

export function DashboardFilterProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedRange, setSelectedRange] =
    useState<DateRange>("30days");

  const value = useMemo(() => {
    const option = rangeOptions[selectedRange];

    const endDate = new Date(DEMO_END_DATE);
    const startDate =
      option.days === null
        ? null
        : new Date(
            2026,
            10,
            30 - option.days + 1
          );

    const includesDate = (dateString: string) => {
      const [year, month, day] = dateString.split("-").map(Number);
      const date = new Date(year, month - 1, day);

      if (Number.isNaN(date.getTime())) {
        return false;
      }

      return (
        (startDate === null || date >= startDate) &&
        date <= endDate
      );
    };

    return {
      selectedRange,
      setSelectedRange,
      rangeLabel: option.label,
      startDate,
      endDate,
      includesDate,
    };
  }, [selectedRange]);

  return (
    <DashboardFilterContext.Provider value={value}>
      {children}
    </DashboardFilterContext.Provider>
  );
}

export function useDashboardFilter() {
  const context = useContext(DashboardFilterContext);

  if (!context) {
    throw new Error(
      "useDashboardFilter must be used inside DashboardFilterProvider"
    );
  }

  return context;
}
