import { SetStateType } from "@/interface";
import React, { createContext, useContext } from "react";

const DarkModeContext = createContext<DarkModeContextType | null>(null);

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context)
    throw new Error("useDarkMode must be used within a DarkModeProvider");

  return context;
};

export const DarkModeProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: DarkModeContextType;
}) => {
  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
};

interface DarkModeContextType {
  isDark: boolean;
  setIsDark: SetStateType<boolean>;
}
