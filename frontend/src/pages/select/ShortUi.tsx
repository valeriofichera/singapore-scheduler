import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ShortUi = () => {
  const [collateralAsset, setCollateralAsset] = useState("");
  const [collateralAmount, setCollateralAmount] = useState(0);
  const [shortedAsset, setShortedAsset] = useState("");
  const [leverage, setLeverage] = useState(1);
  const [maxLeverage, setMaxLeverage] = useState(10);
  const [takeProfitEnabled, setTakeProfitEnabled] = useState(false);
  const [takeProfitPercentage, setTakeProfitPercentage] = useState(0);

  useEffect(() => {
    // Update max leverage based on shorted asset
    if (shortedAsset === "ETH") setMaxLeverage(15);
    else if (shortedAsset === "BTC") setMaxLeverage(20);
    else setMaxLeverage(10);
  }, [shortedAsset]);

  const handleShort = () => {
    console.log(
      `Shorting ${shortedAsset} with ${collateralAmount} ${collateralAsset} as collateral`
    );
    console.log(`Leverage: ${leverage}x`);
    if (takeProfitEnabled) {
      console.log(`Take profit set at ${takeProfitPercentage}%`);
    }
    // Here you would typically call a function to execute the short
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-transparent border-transparent">
      <CardHeader>
        <CardTitle>Short DeFi Assets</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="collateralAsset">Collateral Asset</Label>
          <Select onValueChange={setCollateralAsset} value={collateralAsset}>
            <SelectTrigger id="collateralAsset">
              <SelectValue placeholder="Select collateral asset" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USDT">USDT</SelectItem>
              <SelectItem value="USDC">USDC</SelectItem>
              <SelectItem value="DAI">DAI</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="collateralAmount">Collateral Amount</Label>
          <Input
            id="collateralAmount"
            type="number"
            value={collateralAmount}
            onChange={(e) => setCollateralAmount(e.target.value)}
            placeholder="Enter collateral amount"
            min="0"
            max="100"
          />
        </div>

        <div>
          <Label htmlFor="shortedAsset">Asset to Short</Label>
          <Select onValueChange={setShortedAsset} value={shortedAsset}>
            <SelectTrigger id="shortedAsset">
              <SelectValue placeholder="Select asset to short" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
              <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
              <SelectItem value="LINK">Chainlink (LINK)</SelectItem>
              <SelectItem value="UNI">Uniswap (UNI)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <span>
            <Label className="mr-2">
              Leverage:{" "}
              {leverage.toString().length != 3
                ? `${leverage.toString()}.0`
                : leverage.toString()}
              x
            </Label>
            {leverage < 1
              ? ""
              : leverage <= 3
              ? "🔥"
              : leverage > 3 && leverage < 7
              ? "🔥🔥"
              : "🔥🔥🔥"}
          </span>
          <Slider
            value={[leverage]}
            onValueChange={(value) => setLeverage(value[0])}
            max={maxLeverage}
            step={0.1}
            className="my-2"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>1x</span>
            <span>Max: {maxLeverage}x</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="takeProfit"
            checked={takeProfitEnabled}
            onCheckedChange={setTakeProfitEnabled}
          />
          <Label htmlFor="takeProfit">Enable Take Profit</Label>
        </div>

        {takeProfitEnabled && (
          <div>
            <Label htmlFor="takeProfitPercentage">Take Profit Percentage</Label>
            <Input
              id="takeProfitPercentage"
              type="number"
              value={takeProfitPercentage}
              onChange={(e) => setTakeProfitPercentage(e.target.value)}
              placeholder="Enter percentage"
              min="0"
              max="100"
            />
          </div>
        )}

        <Button onClick={handleShort} className="w-full">
          Short Asset
        </Button>
      </CardContent>
    </Card>
  );
};

export default ShortUi;
