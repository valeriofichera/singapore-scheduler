import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDownUp } from "lucide-react";

const ChainIcon = ({ chain }) => {
  // This is a placeholder. In a real application, you'd use actual icons or images.
  return (
    <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
      {chain.charAt(0)}
    </div>
  );
};

const DEXSwapUI = () => {
  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("USDC");
  const [fromAmount, setFromAmount] = useState("1");
  const [toAmount, setToAmount] = useState("1800");
  const [slippage, setSlippage] = useState("0.5");
  const [selectedChain, setSelectedChain] = useState("Ethereum");

  // Mock user account balances
  const userBalances = {
    ETH: "5",
    USDC: "10000",
    DAI: "5000",
  };

  const chains = ["Ethereum", "Binance", "Polygon", "Avalanche"];

  const handleSwap = () => {
    // Implement swap logic here
    console.log("Swap initiated");
  };

  const handleMaxAmount = () => {
    setFromAmount(userBalances[fromToken]);
  };

  return (
    <Card className="w-full bg-transparent border-transparent">
      <CardHeader>
        <CardTitle className="text-lg">Uniswap V4</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="w-full flex justify-between items-center">
            <Select value={fromToken} onValueChange={setFromToken}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="From" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ETH">ETH</SelectItem>
                <SelectItem value="USDC">USDC</SelectItem>
                <SelectItem value="DAI">DAI</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={handleMaxAmount}>
              Max
            </Button>
          </div>
          <Input
            type="number"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
            placeholder="0.0"
          />
          <div className="text-sm text-gray-500">
            Balance: {userBalances[fromToken]} {fromToken}
          </div>
        </div>
        <Button variant="ghost" size="icon" className="w-full">
          <ArrowDownUp className="h-4 w-4" />
        </Button>
        <div className="space-y-2">
          <Select value={toToken} onValueChange={setToToken}>
            <SelectTrigger>
              <SelectValue placeholder="To" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ETH">ETH</SelectItem>
              <SelectItem value="USDC">USDC</SelectItem>
              <SelectItem value="DAI">DAI</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="number"
            value={toAmount}
            onChange={(e) => setToAmount(e.target.value)}
            placeholder="0.0"
            readOnly
          />
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <label htmlFor="slippage" className="text-sm">
              Slippage:
            </label>
            <div className="flex items-center space-x-1">
              <Input
                id="slippage"
                type="number"
                value={slippage}
                onChange={(e) => setSlippage(e.target.value)}
                className="w-16"
              />
              <span className="text-sm">%</span>
            </div>
          </div>
          <div className="flex-1">
            <label htmlFor="chain" className="text-sm">
              Chain:
            </label>
            <Select value={selectedChain} onValueChange={setSelectedChain}>
              <SelectTrigger id="chain" className="w-full">
                <SelectValue placeholder="Select chain" />
              </SelectTrigger>
              <SelectContent>
                {chains.map((chain) => (
                  <SelectItem key={chain} value={chain}>
                    <div className="flex items-center space-x-2">
                      <ChainIcon chain={chain} />
                      <span>{chain}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSwap}>
          Swap
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DEXSwapUI;
