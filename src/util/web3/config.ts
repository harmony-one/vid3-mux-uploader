export const config = {
  contractAddress: process.env.REACT_APP_CONTRACT_ADDRESS,
  defaultRPC: process.env.REACT_APP_DEFAULT_RPC || 'https://api.harmony.one',
  chainParameters: process.env.REACT_APP_CHAIN_PARAMETERS
    ? JSON.parse(process.env.REACT_APP_CHAIN_PARAMETERS)
    : {
        id: 1666600000, // '0x63564C40'
        name: "Harmony Mainnet Shard 0",
        network: "harmony",
        nativeCurrency: {
          decimals: 18,
          name: "ONE",
          symbol: "ONE",
        },
        rpcUrls: {
          default: "https://api.harmony.one",
        },
        blockExplorers: {
          default: { name: "Explorer", url: "https://explorer.harmony.one/" },
        },
        testnet: true,
      },
};

/**
* Truncate wallet address
* @param address {string} Wallet address
* @param num {number} digits to show at the benging/end of wallet address
* @returns {string} truncated address
*/
export const truncateAddressString = (address: string, num = 12): string => {
 if (!address) {
   return "";
 }
 const first = address.slice(0, num);
 const last = address.slice(-num);
 return `${first}...${last}`;
}