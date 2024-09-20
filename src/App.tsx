import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { mainnet } from "viem/chains";

import { BitcoinWalletConnectors } from "@dynamic-labs/bitcoin";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { FlowWalletConnectors } from "@dynamic-labs/flow";
// import { SolanaWalletConnectors } from "@dynamic-labs/solana";
import { StarknetWalletConnectors } from "@dynamic-labs/starknet";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import Header from "./components/Header";
import { Layout } from "./components/Layout";

const config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function App() {
  return (
    <TooltipProvider>
      <DynamicContextProvider
        settings={{
          // Find your environment id at https://app.dynamic.xyz/dashboard/developer
          environmentId: import.meta.env.VITE_DYNAMIC_SECRET,
          walletConnectors: [
            BitcoinWalletConnectors,
            EthereumWalletConnectors,
            FlowWalletConnectors,
            // SolanaWalletConnectors,
            StarknetWalletConnectors,
          ],
        }}
      >
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <DynamicWagmiConnector>
              {/* <div className="w-screen h-screen flex flex-col justify-start items-center content-center bg-gray-800 text-gray-300">
                <Header />
                <div className="">
                  <DynamicWidget />
                </div>
              </div> */}
              <Layout />
            </DynamicWagmiConnector>
          </QueryClientProvider>
        </WagmiProvider>
      </DynamicContextProvider>
    </TooltipProvider>
  );
}
