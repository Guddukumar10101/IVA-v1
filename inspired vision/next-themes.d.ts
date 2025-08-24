declare module "next-themes" {
  import * as React from "react";

  export interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: "light" | "dark" | "system";
    enableSystem?: boolean;
    attribute?: string;
    themes?: string[];
    forcedTheme?: string;
    disableTransitionOnChange?: boolean;
    storageKey?: string;
    enableColorScheme?: boolean;
  }

  export const ThemeProvider: React.FC<ThemeProviderProps>;
  export const useTheme: () => {
    theme: string | undefined;
    setTheme: (theme: string) => void;
    forcedTheme: string | undefined;
  };
}
