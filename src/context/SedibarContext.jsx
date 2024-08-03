/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [openMode, setOpenMode] = useState(false);

  const toggleOpenMode = () => {
    setOpenMode((prevMode) => !prevMode);
  };

  return (
    <SidebarContext.Provider value={{ openMode, toggleOpenMode }}>
      {children}
    </SidebarContext.Provider>
  );
};
