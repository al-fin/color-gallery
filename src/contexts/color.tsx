import * as React from "react";
import { Color } from "dto/color";
import { generateUUID } from "utils/uuid";
import { hexToHSL, hexToRGB } from "utils/color";

type Action = { type: "ADD"; color: Color } | { type: "REMOVE"; id: string };
type Dispatch = (action: Action) => void;
type State = Color[];
type ColorProviderProps = { children: React.ReactNode };

const ColorStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function colorReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD": {
      return [...state, action.color];
    }
    case "REMOVE": {
      return [...state.filter((color) => color.id !== action.id)];
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
}

// - - - - - - - - - - - - - - - - - - -  //

const defaultValue = [
  "#1ABC9C",
  "#2ECC71",
  "#3498DB",
  "#9B59B6",
  "#34495E",
  "#16A085",
  "#27AE60",
  "#2980B9",
  "#8E44AD",
  "#2C3E50",
  "#F1C40F",
  "#E67E22",
  "#E74C3C",
  "#ECF0F1",
  "#95A5A6",
  "#F39C12",
  "#D35400",
  "#C0392B",
  "#BDC3C7",
  "#7F8C8D",
].map((hex) => ({
  id: generateUUID(),
  hex: hex,
  rgb: hexToRGB(hex),
  hsl: hexToHSL(hex),
  removeable: false,
}));

function ColorProvider({ children }: ColorProviderProps) {
  const savedColors: Color[] = JSON.parse(
    localStorage.getItem("colors") || "[]"
  );

  // if savedValue exist, then use savedValue, otherwise use defaultValue
  const [state, dispatch] = React.useReducer(
    colorReducer,
    savedColors.length > 0 ? savedColors : defaultValue
  );
  const value = { state, dispatch };

  React.useEffect(() => {
    // Save Colors
    localStorage.setItem("colors", JSON.stringify(state));
  }, [state]);

  return (
    <ColorStateContext.Provider value={value}>
      {children}
    </ColorStateContext.Provider>
  );
}

function useColor() {
  const context = React.useContext(ColorStateContext);
  if (context === undefined) {
    throw new Error("useColor must be used within a ColorProvider");
  }
  return context;
}

export { ColorProvider, useColor };
