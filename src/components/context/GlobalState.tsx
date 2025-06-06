// GlobalProvider.tsx
import React, { createContext, useReducer, useContext } from "react";
import AppReducer, { initialState, type Action } from "./AppReducer";

// Define the context value type
interface GlobalContextType {
  basket: [];
  user: string | null;
  dispatch: React.Dispatch<Action>;
}

// Create context with proper type
const GlobalContext = createContext<GlobalContextType | null>(null);

function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <GlobalContext.Provider
      value={{ basket: state.basket, user: state.user, dispatch: dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;

const useAuth = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useAuth must be used within a GlobalProvider");
  }
  return context;
};

export { useAuth, GlobalContext };
