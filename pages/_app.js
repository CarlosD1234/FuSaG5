// CSS para toda la aplicación
import { ChakraProvider } from "@chakra-ui/react";

// Código aquí estará presente en todas las páginas.
const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
