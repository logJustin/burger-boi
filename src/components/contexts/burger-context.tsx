import React, { createContext, useContext, useReducer, ReactNode } from "react";

// Define the types
export type BurgerState = {
  name: string;
  rating: number[];
  selectedToppings: string[];
  selectedSetup: string[];
  selectedCondiments: string[];
  selectedLocation: string;
  openSelect: "bun" | "patty" | null;
};

// Define action types
export type BurgerAction =
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_RATING"; payload: number[] }
  | { type: "SET_TOPPINGS"; payload: string[] }
  | { type: "ADD_TOPPING"; payload: string }
  | { type: "REMOVE_TOPPING"; payload: string }
  | { type: "SET_SETUP"; payload: string[] }
  | { type: "ADD_SETUP_ITEM"; payload: string }
  | { type: "REMOVE_SETUP_ITEM"; payload: string }
  | { type: "SET_CONDIMENTS"; payload: string[] }
  | { type: "ADD_CONDIMENT"; payload: string }
  | { type: "REMOVE_CONDIMENT"; payload: string }
  | { type: "SET_LOCATION"; payload: string }
  | { type: "SET_OPEN_SELECT"; payload: "bun" | "patty" | null }
  | { type: "RESET_FORM" };

// Define the context type
type BurgerContextType = {
  state: BurgerState;
  dispatch: React.Dispatch<BurgerAction>;
};

// Create the context with default values
const BurgerContext = createContext<BurgerContextType | undefined>(undefined);

// Default state
const defaultBurgerState: BurgerState = {
  name: "",
  rating: [5],
  selectedToppings: [],
  selectedSetup: [],
  selectedCondiments: [],
  selectedLocation: "",
  openSelect: null,
};

// Create the reducer function
const burgerReducer = (state: BurgerState, action: BurgerAction): BurgerState => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_RATING":
      return { ...state, rating: action.payload };

    case "SET_TOPPINGS":
      return { ...state, selectedToppings: action.payload };

    case "ADD_TOPPING":
      return {
        ...state,
        selectedToppings: [...state.selectedToppings, action.payload],
      };

    case "REMOVE_TOPPING":
      return {
        ...state,
        selectedToppings: state.selectedToppings.filter((t) => t !== action.payload),
      };

    case "SET_SETUP":
      return { ...state, selectedSetup: action.payload };

    case "ADD_SETUP_ITEM":
      return {
        ...state,
        selectedSetup: [...state.selectedSetup, action.payload],
      };

    case "REMOVE_SETUP_ITEM":
      return {
        ...state,
        selectedSetup: state.selectedSetup.filter((i) => i !== action.payload),
      };

    case "SET_CONDIMENTS":
      return { ...state, selectedCondiments: action.payload };

    case "ADD_CONDIMENT":
      return {
        ...state,
        selectedCondiments: [...state.selectedCondiments, action.payload],
      };

    case "REMOVE_CONDIMENT":
      return {
        ...state,
        selectedCondiments: state.selectedCondiments.filter((c) => c !== action.payload),
      };

    case "SET_LOCATION":
      return { ...state, selectedLocation: action.payload };

    case "SET_OPEN_SELECT":
      return { ...state, openSelect: action.payload };

    case "RESET_FORM":
      return defaultBurgerState;

    default:
      return state;
  }
};

// Create the provider component
export const BurgerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(burgerReducer, defaultBurgerState);

  return <BurgerContext.Provider value={{ state, dispatch }}>{children}</BurgerContext.Provider>;
};

// Create a custom hook for using the context
export const useBurger = () => {
  const context = useContext(BurgerContext);
  if (context === undefined) {
    throw new Error("useBurger must be used within a BurgerProvider");
  }
  return context;
};

// Optional: Helper functions to make dispatching actions easier
export const burgerActions = {
  setName: (name: string) => ({
    type: "SET_NAME" as const,
    payload: name,
  }),

  setRating: (rating: number[]) => ({
    type: "SET_RATING" as const,
    payload: rating,
  }),

  addTopping: (topping: string) => ({
    type: "ADD_TOPPING" as const,
    payload: topping,
  }),

  removeTopping: (topping: string) => ({
    type: "REMOVE_TOPPING" as const,
    payload: topping,
  }),

  addSetupItem: (item: string) => ({
    type: "ADD_SETUP_ITEM" as const,
    payload: item,
  }),

  removeSetupItem: (item: string) => ({
    type: "REMOVE_SETUP_ITEM" as const,
    payload: item,
  }),

  addCondiment: (condiment: string) => ({
    type: "ADD_CONDIMENT" as const,
    payload: condiment,
  }),

  removeCondiment: (condiment: string) => ({
    type: "REMOVE_CONDIMENT" as const,
    payload: condiment,
  }),

  setLocation: (location: string) => ({
    type: "SET_LOCATION" as const,
    payload: location,
  }),

  setOpenSelect: (select: "bun" | "patty" | null) => ({
    type: "SET_OPEN_SELECT" as const,
    payload: select,
  }),

  resetForm: () => ({
    type: "RESET_FORM" as const,
  }),
};
