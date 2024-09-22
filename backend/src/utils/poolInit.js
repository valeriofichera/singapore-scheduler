// Target price ratio
const priceRatio = 10;

// Calculate square root of price ratio
const sqrtPrice = Math.sqrt(priceRatio);

// Calculate sqrtPriceX96
const sqrtPriceX96 = BigInt(Math.floor(sqrtPrice * 2 ** 96));

console.log(`For a price ratio of 1:${priceRatio}`);
console.log(`sqrtPriceX96 value: ${sqrtPriceX96}`);

// Verification
const calculatedPrice =
  Number((sqrtPriceX96 * sqrtPriceX96) / BigInt(2 ** 192)) / 2 ** 96;

console.log("\nVerification:");
console.log(`Calculated price ratio: ${calculatedPrice}`);
console.log(
  `Difference from target: ${Math.abs(calculatedPrice - priceRatio)}`
);
