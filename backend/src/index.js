require("dotenv").config();
const { createWalletClient, http, fromHex, isHex } = require("viem");
const { privateKeyToAccount } = require("viem/accounts");
const { mainnet } = require("viem/chains");

const solverConfig = {};

const ABI = [
  {
    inputs: [
      { internalType: "string", name: "message", type: "string" },
      { internalType: "bytes", name: "signature", type: "bytes" },
    ],
    name: "execute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const CONTRACT_ADDRESS = "";

async function executeSolverAction(message) {
  try {
    console.log("Executed");
  } catch (error) {
    console.error("Error:", error);
  }
}

async function runSolver(config) {
  try {
    // todo
    // todo - fetchActiveActions
    // todo - processActiveActions
    // todo - executeSolverAction(message)
  } catch (error) {
    console.error("Error:", error);
  }
}

runSolver(solverConfig);
