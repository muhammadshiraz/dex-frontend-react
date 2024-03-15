import Web3 from 'web3';

export const getTransactionHistory = async (walletAddress) => {
  try {
    if (!window.ethereum) {
      throw new Error('MetaMask not detected.');
    }

    // Initialize web3 with the provided Ethereum provider (MetaMask)
    const web3 = new Web3(window.ethereum);

    // Fetch the latest blocks to check for transactions
    const latestBlock = await web3.eth.getBlockNumber();

    let transactions = [];

    // Loop through blocks to get transactions
    for (let i = latestBlock; i >= 0; i--) {
      const block = await web3.eth.getBlock(i, true);
      if (block && block.transactions) {
        // Filter transactions related to the provided wallet address
        const relevantTransactions = block.transactions.filter((tx) => {
          // Check if the 'from' and 'to' properties exist and are not null
          if (tx.from && tx.to) {
            return (
              tx.from.toLowerCase() === walletAddress.toLowerCase() ||
              tx.to.toLowerCase() === walletAddress.toLowerCase()
            );
          }
          return false;
        });
        transactions = transactions.concat(relevantTransactions);
      }
    }

    return transactions;
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    throw new Error(`Error fetching transaction history: ${error.message}`);
  }
};

export const fetchTokenBalancesForAccount = async (
  web3,
  account,
  tokenContracts
) => {
  try {
    const balances = await Promise.all(
      tokenContracts.map(async (tokenContract) => {
        // Get the token balance for the account
        const balance = await tokenContract.methods.balanceOf(account).call();
        // Get the token name
        const name = await tokenContract.methods.name().call();
        // Return the balance and token name as an object
        return { token: name, amount: balance };
      })
    );
    return balances;
  } catch (error) {
    throw new Error('Error fetching token balances.');
  }
};
