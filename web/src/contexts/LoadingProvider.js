import { Box, LinearProgress } from "@mui/material";
import { createContext, useState } from "react";

export const LoadingContext = createContext();

export default function LoadingProvider({ children }) {
  const [isLoading, setLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {isLoading && (
        <Box sx={{ position: "sticky", top: 0, left: 0, zIndex: 4 }}>
          <LinearProgress color="secondary" />
        </Box>
      )}
      {children}
    </LoadingContext.Provider>
  );
}
