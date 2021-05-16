const {ALCHEMY_API_KEY, ROPSTEN_PRIVATE_KEY} = require('./keys');

require('@nomiclabs/hardhat-waffle');


task('accounts', 'Prints the list of accounts', async () => {
  const accounts = await ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});
module.exports = {
  solidity: '0.8.0',
  networks: {
    kovan: {
      url: `https://kovan.infura.io/v3/${ALCHEMY_API_KEY}`,
      accounts: [`0x${ROPSTEN_PRIVATE_KEY}`],
    },
  },
};
