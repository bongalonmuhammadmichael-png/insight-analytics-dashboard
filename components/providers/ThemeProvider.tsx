"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";
import { DashboardFilterProvider } from "./DashboardFilterProvider";

export default function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <DashboardFilterProvider>
        {children}
      </DashboardFilterProvider>
    </NextThemesProvider>
  );
}
