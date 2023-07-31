import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from 'pages/Home'
import Layout from "components/Layout"
import { ToastListener } from 'contexts/ToastsContext'
import { ToastsProvider } from "contexts/ToastsContext/Provider";
import { WagmiConfig, createConfig, configureChains, mainnet, createStorage } from 'wagmi'
import { bsc, bscTestnet } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { createPublicClient, http } from 'viem'
import { ThemeProvider } from 'styled-components'
import theme from 'theme'
import './App.css';

export const noopStorage = {
  getItem: (_key: any) => '',
  setItem: (_key: any, _value: any) => null,
  removeItem: (_key: any) => null,
}

const { chains, publicClient } = configureChains([mainnet, bsc, bscTestnet], [publicProvider()])

const config = createConfig({
  storage: createStorage({
    storage: typeof window !== 'undefined' ? window.localStorage : noopStorage,
    key: 'wagmi_v1.1',
  }),
  connectors: [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: '...',
      },
    }),
  ],
  publicClient,
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