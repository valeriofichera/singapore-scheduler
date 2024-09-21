import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { createAppKit } from "@reown/appkit/react";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { baseSepolia, mainnet, sepolia, anvil } from "viem/chains";
// import { arbitrum, mainnet } from "@reown/appkit/networks";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

import { BitcoinWalletConnectors } from "@dynamic-labs/bitcoin";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { FlowWalletConnectors } from "@dynamic-labs/flow";
// import { SolanaWalletConnectors } from "@dynamic-labs/solana";
import { StarknetWalletConnectors } from "@dynamic-labs/starknet";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Layout } from "./components/Layout";

export const networks = [anvil];

// const config = createConfig({
//   chains: [anvil],
//   multiInjectedProviderDiscovery: false,
//   transports: {
//     [anvil.id]: http(),
//   },
// });

const config = getDefaultConfig({
  appName: "Multi-Chain Task Scheduler",
  projectId: import.meta.env.VITE_REOWN_PROJECT_ID,
  chains: [anvil],
  // ssr: true, // If your dApp uses server side rendering (SSR)
});

// const wagmiAdapter = new WagmiAdapter({
//   ssr: true,
//   networks,
//   projectId: import.meta.env.VITE_REOWN_PROJECT_ID,
// });

const queryClient = new QueryClient();

// createAppKit({
//   adapters: [wagmiAdapter],
//   networks,
//   // metadata,
//   projectId: import.meta.env.VITE_REOWN_PROJECT_ID,
//   features: {
//     analytics: true, // Optional - defaults to your Cloud configuration
//   },
// });

export default function App() {
  console.log(import.meta.env.VITE_DYNAMIC_SECRET);
  return (
    <TooltipProvider>
      {/* <DynamicContextProvider
        settings={{
          environmentId: import.meta.env.VITE_DYNAMIC_SECRET,
          walletConnectors: [
            BitcoinWalletConnectors,
            EthereumWalletConnectors,
            FlowWalletConnectors,
            // SolanaWalletConnectors,
            StarknetWalletConnectors,
          ],
        }}
      > */}
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          {/* <DynamicWagmiConnector> */}
          <RainbowKitProvider>
            <Layout />
          </RainbowKitProvider>
          {/* </DynamicWagmiConnector> */}
        </QueryClientProvider>
      </WagmiProvider>
      {/* </DynamicContextProvider> */}
    </TooltipProvider>
  );
}
