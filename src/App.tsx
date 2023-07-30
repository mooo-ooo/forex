import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from 'pages/Home'
import Layout from "components/Layout"
import { ToastListener } from 'contexts/ToastsContext'
import { ToastsProvider } from "contexts/ToastsContext/Provider";
import { WagmiConfig, createConfig, mainnet } from 'wagmi'
import { createPublicClient, http } from 'viem'
import { ThemeProvider } from 'styled-components'
import theme from 'theme'
import './App.css';

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ToastsProvider>
        <WagmiConfig config={config}>
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
              </Route>
            </Routes>
          </Router>
          {/* <ToastListener /> */}
        </WagmiConfig>
        <ToastListener />
      </ToastsProvider>
    </ThemeProvider>
  );
}


export default App;