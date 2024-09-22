require("dotenv").config();
const {
  createWalletClient,
  http,
  fromHex,
  isHex,
  stringToHex,
  pad,
  toBytes,
  hexToBytes,
} = require("viem");
const { privateKeyToAccount } = require("viem/accounts");
const { mainnet } = require("viem/chains");
const { ethers } = require("ethers");

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

function stringToBytes32(str) {
  const hexStr = stringToHex(str);

  const paddedHex = pad(hexStr, { size: 32 });

  return paddedHex;
}

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
      // message: hexToBytes(message),
    });

    console.log("Account: ", account);
    console.log("Message:", message);
    // const encodedMessage = stringToBytes32(message);
    // console.log("Encoded as bytes32:", encodedMessage);
    console.log("Signature:", signature);
    const signatureBytes = hexToBytes(signature);
    console.log("Signature as bytes:", signatureBytes);

    // todo - send tx
    // console.log("Transaction hash:", hash);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function signMsgEthers(message) {
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY);

  const sig = await signer.signMessage(ethers.utils.arrayify(message));
  console.log(sig);
}

const messageToSign =
  "0x097b2c55e0994a9420793ef0d38086a9436895a1da4376dc2a937d909ed115d3";
// signAndExecuteMessage(messageToSign);
signMsgEthers(messageToSign);
