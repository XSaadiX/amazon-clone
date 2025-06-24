// GlobalProvider.tsx
import React, { createContext, useReducer, useContext } from "react";
import AppReducer, {
  initialState,
  type Action,
  type State,
  type BasketItem,
} from "./AppReducer";

// Define the context value type

// Create context with proper type
const GlobalContext = createContext<{
  state: State;
  basket: BasketItem[]; // Change from Product[] to BasketItem[]
  dispatch: React.Dispatch<Action>;
} | null>(null);

function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <GlobalContext.Provider
      value={{
        state: state,
        basket: state.basket, // Extract basket from state
        dispatch: dispatch,
      }}>
      {" "}
      {children}
    </GlobalContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useAuth must be used within a GlobalProvider");
  }
  return context;
};

// Fix: Only one default export, others as named exports
export default GlobalProvider;
export { useAuth, GlobalContext };
