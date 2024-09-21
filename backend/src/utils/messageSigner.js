require("dotenv").config();
const { createWalletClient, http, fromHex, isHex } = require("viem");
const { privateKeyToAccount } = require("viem/accounts");
const { mainnet } = require("viem/chains");

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

function formatPrivateKey(key) {
  if (typeof key !== "string") {
    throw new Error("Private key must be a string");
  }

  key = key.replace(/^0x/, "");

  if (key.length !== 64) {
    throw new Error(
      "Private key must be 32 bytes long (64 hexadecimal characters)"
    );
  }

  if (!isHex(`0x${key}`)) {
    throw new Error("Private key must be a valid hexadecimal string");
  }

  return `0x${key}`;
}

async function signAndExecuteMessage(message) {
  let privateKey;
  try {
    privateKey = formatPrivateKey(process.env.PRIVATE_KEY);
  } catch (error) {
    console.error("Error formatting private key:", error.message);
    return;
  }

  const account = privateKeyToAccount(privateKey);
  const client = createWalletClient({
    account,
    chain: mainnet,
    transport: http(),
  });

  try {
    const signature = await client.signMessage({
      message,
    });

    console.log("Message:", message);
    console.log("Signature:", signature);

    console.log("Transaction hash:", hash);
  } catch (error) {
    console.error("Error:", error);
  }
}

const messageToSign = "test";
signAndExecuteMessage(messageToSign);
