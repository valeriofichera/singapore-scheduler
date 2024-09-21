import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import DEXSwapUI from "./DEXSwapUi";
import ShortUi from "./ShortUi";

// Mock function to fetch items
const fetchItems = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          value: "task",
          label: "Select task to get started",
          configOptions: [],
        },
        {
          value: "swap",
          label: "Token Swap",
          configOptions: ["optionA", "optionB"],
        },
        {
          value: "short",
          label: "Short Asset",
          configOptions: ["optionA", "optionB"],
        },
        {
          value: "dip",
          label: "Buy The Dip",
          configOptions: ["optionA", "optionB"],
        },
        {
          value: "dca",
          label: "Dollar Cost Average",
          configOptions: ["optionA", "optionB"],
        },
        {
          value: "yield",
          label: "Yield Farming",
          configOptions: ["optionA", "optionB"],
        },
        {
          value: "snipe",
          label: "Snipe Tokens",
          configOptions: ["optionA", "optionB"],
        },
        // {
        //   value: "bridge",
        //   label: "Bridge Tokens",
        //   configOptions: ["option1", "option2"],
        // },
        // {
        //   value: "task3",
        //   label: "Borrow Tokens",
        //   configOptions: ["optionX", "optionY"],
        // },
        // {
        //   value: "task4",
        //   label: "Lend Tokens",
        //   configOptions: ["option1", "option2"],
        // },
      ]);
    }, 1000);
  });
};

export default function SelectPage() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({
    value: "task",
    label: "Select task to get started",
  });
  const [selectedList, setSelectedList] = useState([]);
  const [configData, setConfigData] = useState({});

  useEffect(() => {
    fetchItems().then((fetchedItems) => setItems(fetchedItems));
  }, []);

  const handleSelect = (value) => {
    const selected = items.find((item) => item.value === value);
    setSelectedItem(selected);
    // Initialize config data when a task is selected
    const initialConfig = selected.configOptions.reduce(
      (acc, option) => ({ ...acc, [option]: "" }),
      {}
    );
    setConfigData(initialConfig);
  };

  const handleAddToList = (e) => {
    e.preventDefault();
    if (selectedItem) {
      const newTask = {
        id: Date.now(),
        ...selectedItem,
        config: configData,
      };
      setSelectedList((prevList) => [...prevList, newTask]);
      //   setSelectedItem(null);
      setConfigData({});
    }
  };

  const handleRemoveFromList = (itemToRemove) => {
    setSelectedList((prevList) =>
      prevList.filter((item) => item.id !== itemToRemove.id)
    );
  };

  const handleEditTask = (task) => {
    setSelectedItem(task);
    setConfigData(task.config);
  };

  const handleConfigChange = (optionKey, value) => {
    setConfigData((prevConfig) => ({
      ...prevConfig,
      [optionKey]: value,
    }));
  };

  return (
    <div className="w-full h-full bg-black">
      <div className="w-full h-full bg-gray-800/60 flex">
        <div className="w-full h-full max-h-screen flex flex-col justify-around items-center py-24 px-16">
          <Card className="flex-1 w-full h-3/4 bg-black/40 flex flex-col justify-between">
            <CardHeader>
              <CardTitle>Choose Tasks</CardTitle>
              <CardDescription>
                Pick and schedule your on-chain tasks with a few clicks.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-full py-4">
              <div className="mb-4">
                <form onSubmit={handleAddToList}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="task">Task</Label>
                      <Select
                        onValueChange={handleSelect}
                        value={selectedItem?.value || ""}
                      >
                        <SelectTrigger id="task">
                          <SelectValue placeholder="Select a task" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          {items.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              <span
                                className={`${
                                  item.value == "task" ? "text-gray-400" : ""
                                }`}
                              >
                                {item.label}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {/* <Button type="submit" disabled={!selectedItem}>
                      Add to List
                    </Button> */}
                  </div>
                </form>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">Selected Tasks List:</h2>
                <ul>
                  <ScrollArea className="h-[380px] w-full rounded-lg border p-4">
                    {selectedList.map((item, i) => (
                      <li
                        key={item.id}
                        className="flex justify-between items-center mb-2 w-full hover:bg-gray-900/60 py-2 hover:cursor-pointer px-1"
                      >
                        <div className="bg-primary rounded-lg py-1 px-2 w-16 flex justify-end mr-4 ">
                          <>{i * 10}</>
                        </div>
                        <span className="w-full flex justify-start">
                          {item.label}
                        </span>
                        <div className="w-full flex justify-end">
                          <Button
                            onClick={() => handleEditTask(item)}
                            variant="secondary"
                            size="sm"
                            className="mr-2"
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleRemoveFromList(item)}
                            variant="destructive"
                            size="sm"
                          >
                            Remove
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ScrollArea>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {/* <Button variant="outline">Cancel</Button> */}
              <Button>Deploy</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="w-full h-full py-24 px-16 flex flex-col">
          {/* {selectedItem && ( */}
          <Card className="flex-1 w-full bg-black/40 flex flex-col justify-between">
            <CardHeader>
              <CardTitle>{selectedItem.label}</CardTitle>
            </CardHeader>
            <CardContent className="h-full py-4 flex flex-row justify-around">
              {selectedItem.label == "Select task to get started" ? (
                <div className="h-full flex flex-col justify-center align-center gap-6">
                  {/* <Skeleton className="h-[125px] w-[250px] rounded-xl bg-gray-700/40" /> */}
                  <Skeleton className="h-[65px] w-[250px] rounded-xl bg-gray-700/40" />
                  <div className="space-y-4"></div>
                  <Skeleton className="h-[45px] w-[50px] rounded-xl bg-gray-700/40 mx-auto" />
                  <div className="space-y-4"></div>
                  <Skeleton className="h-[65px] w-[250px] rounded-xl bg-gray-700/40" />
                </div>
              ) : null}
              {selectedItem?.value === "swap" ? (
                <DEXSwapUI />
              ) : selectedItem?.value === "short" ? (
                <ShortUi />
              ) : (
                <>
                  {Object.entries(configData).map(([key, value]) => (
                    <div key={key} className="mb-4">
                      <Label htmlFor={key}>{key}</Label>
                      <Input
                        id={key}
                        value={value}
                        onChange={(e) =>
                          handleConfigChange(key, e.target.value)
                        }
                      />
                    </div>
                  ))}
                </>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                //   type="submit"
                onClick={handleAddToList}
                disabled={!selectedItem}
                className="border border-gray-400"
              >
                Add to List
              </Button>
            </CardFooter>
          </Card>
          {/* )} */}
        </div>
      </div>
    </div>
  );
}
