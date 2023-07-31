import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from 'pages/Home'
import Layout from "components/Layout"
import EagerConnection from 'components/EagerConnection'
import { ToastListener } from 'contexts/ToastsContext'
import { ToastsProvider } from "contexts/ToastsContext/Provider";
import { WagmiConfig, createConfig, configureChains, mainnet, createStorage } from 'wagmi'
import { bsc, bscTestnet } from 'wagmi/chains'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
// import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { PUBLIC_NODES } from 'config/nodes'
import { ThemeProvider } from 'styled-components'
import theme from 'theme'
import './App.css';

export const noopStorage = {
  getItem: (_key: any) => '',
  setItem: (_key: any, _value: any) => null,
  removeItem: (_key: any) => null,
}

const mostNodesConfig = Object.values(PUBLIC_NODES).reduce((prev, cur) => {
  return cur.length > prev ? cur.length : prev
}, 0)

export const { publicClient, chains } = configureChains(
  [mainnet, bsc, bscTestnet],
  Array.from({ length: mostNodesConfig })
    .map((_, i) => i)
    .map((i) => {
      return jsonRpcProvider({
        rpc: (chain) => {
          if (process.env.NODE_ENV === 'test' && chain.id === mainnet.id && i === 0) {
            return { http: 'https://cloudflare-eth.com' }
          }
          return PUBLIC_NODES[chain.id]?.[i]
            ? {
                http: PUBLIC_NODES[chain.id][i],
              }
            : null
        },
      })
    }),
  {
    batch: {
      multicall: {
        batchSize: 1024 * 200,
      },
    },
  },
)

export const metaMaskConnector = new MetaMaskConnector({
  chains,
  options: {
    shimDisconnect: false,
  },
})

export const injectedConnector = new InjectedConnector({
  chains,
  options: {
    shimDisconnect: false,
  },
})

// export const walletConnectConnector = new WalletConnectConnector({
//   chains,
//   options: {
//     showQrModal: true,
//     projectId: 'e542ff314e26ff34de2d4fba98db70bb',
//   },
// })

const config = createConfig({
  storage: createStorage({
    storage: typeof window !== 'undefined' ? window.localStorage : noopStorage,
    key: 'wagmi_v1.1',
  }),
  autoConnect: false,
  connectors: [
    metaMaskConnector,
    injectedConnector
  ],
  publicClient,
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ToastsProvider>
        <WagmiConfig config={config}>
          <EagerConnection>
            <Router>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                </Route>
              </Routes>
            </Router>
          </EagerConnection>
        </WagmiConfig>
        <ToastListener />
      </ToastsProvider>
    </ThemeProvider>
  );
}


export default App;