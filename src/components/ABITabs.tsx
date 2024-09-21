import React, { useState, useEffect } from "react";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ERC20 } from "@/abi/ERC20";

const getABIsFromLocalDirectory = async () => {
  return [
    {
      name: "Token",
      address: "0x89434EC9fBc25C9eF419E4457a9b846D68ec580C",
      abi: ERC20.abi,
    },
  ];
};

const ABITabs = () => {
  const [abis, setAbis] = useState([]);
  //   const { address, isConnected } = useAccount();

  useEffect(() => {
    const loadABIs = async () => {
      const loadedABIs = await getABIsFromLocalDirectory();
      setAbis(loadedABIs);
    };
    loadABIs();
  }, []);

  const FunctionCard = ({ contractAddress, abi, func }) => {
    const [inputs, setInputs] = useState({});
    const [result, setResult] = useState(null);

    const handleInputChange = (name, value) => {
      setInputs((prev) => ({ ...prev, [name]: value }));
    };

    const isReadFunction =
      func.stateMutability === "view" || func.stateMutability === "pure";

    const { data, error, isPending, refetch } = useReadContract({
      address: contractAddress,
      abi: abi,
      functionName: func.name,
      args: Object.values(inputs),
      query: {
        enabled: false,
      },
    });

    const {
      writeContract,
      data: writeData,
      error: writeError,
      isPending: isWritePending,
    } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
      useWaitForTransactionReceipt({ hash: writeData?.hash });

    const handleCall = async () => {
      if (isReadFunction) {
        const result = await refetch();
        // setResult(result.data);
        console.log(result.data);
      } else {
        try {
          const result = await writeContract({
            address: contractAddress,
            abi: abi,
            functionName: func.name,
            args: Object.values(inputs),
          });
          //   setResult(` ${result.hash}`);
          console.log(result);
        } catch (error) {
          //   setResult(` ${error.message}`);
          console.error(error);
        }
      }
    };

    return (
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>{func.name}</CardTitle>
          <CardDescription>
            {isReadFunction ? "Read Function" : "Write Function"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {func.inputs.map((input, index) => (
            <Input
              key={index}
              placeholder={`${input.name} (${input.type})`}
              className="mb-2"
              onChange={(e) => handleInputChange(input.name, e.target.value)}
            />
          ))}
          <Button
            onClick={handleCall}
            disabled={
              false
              //   !isConnected || isPending || isWritePending || isConfirming
            }
          >
            {isReadFunction ? "Read" : isConfirming ? "Confirming..." : "Write"}
          </Button>
          {result && (
            <Alert className="mt-2">
              <AlertTitle>Result</AlertTitle>
              <AlertDescription>{JSON.stringify(result)}</AlertDescription>
            </Alert>
          )}
          {(error || writeError) && (
            <Alert className="mt-2" variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error?.message || writeError?.message}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderABIContent = (contractAddress, abi) => {
    const functions = abi.filter((item) => item.type === "function");
    const publicVariables = abi.filter(
      (item) =>
        item.type === "variable" ||
        (item.type === "function" &&
          item.stateMutability === "view" &&
          item.inputs.length === 0)
    );

    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Functions</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              {functions.map((func, index) => (
                <FunctionCard
                  key={index}
                  contractAddress={contractAddress}
                  abi={abi}
                  func={func}
                />
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Public Variables</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              {publicVariables.map((variable, index) => (
                <FunctionCard
                  key={index}
                  contractAddress={contractAddress}
                  abi={abi}
                  func={variable}
                />
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <Tabs defaultValue={abis[0]?.name} className="w-full">
      <TabsList>
        {abis.map((abi, index) => (
          <TabsTrigger key={index} value={abi.name}>
            {abi.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {abis.map((abi, index) => (
        <TabsContent key={index} value={abi.name}>
          {renderABIContent(abi.address, abi.abi)}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default ABITabs;
