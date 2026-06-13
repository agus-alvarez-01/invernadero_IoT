"use client";

import { ChakraProvider, extendTheme, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const theme = extendTheme({
    config: {
        initialColorMode: "dark",
        useSystemColorMode: false,
    },
  
    fonts: {
    heading: "Inter, Sans-serif",
    body: "Inter, Sans-serif",
  },
  styles: {
    global: {
      html: {
        height: "100%",
      },      
      body: {
        height: "100%",
        bg: "black",
        color: "gray.50",
        margin: 0,
        padding: 0,
      },
    },
  },
});


export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "black" }} />
    );
  }

  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" bg="black" color="gray.50">
        {children}
      </Box>
    </ChakraProvider>
  );
}