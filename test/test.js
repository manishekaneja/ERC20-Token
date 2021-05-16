const {expect} = require('chai');

async function deployContract(contractName, ...contractParams) {
  if (!contractName || typeof contractName !== 'string') {
    throw new Error('Expect contractName to be a string');
  }
  const Contract = await hre.ethers.getContractFactory(contractName);
  const contractInstance = await Contract.deploy(...contractParams);
  await contractInstance.deployed();
  return contractInstance;
}

describe('Lucky Coin', function () {
  let coin, owner, addr;
  before(async function () {
    coin = await deployContract('LuckyCoin');
    [owner, ...addr] = await ethers.getSigners();
  });

  describe('On Coin Deploy', function () {
    it('Should give owner 100 ethers', async function () {
      expect(await coin.balanceOf(owner.address)).to.equal(
        ethers.utils.parseEther('100')
      );
    });
  });

  describe('On Transfer 50 ethers', function () {
    it('Should tranfer total of 45 ethers to Address[0] to 5 to P.T.I.(Previous Transaction Initiater)', async function () {
      await coin.transfer(addr[0].address, ethers.utils.parseEther('50'));
      expect(await coin.balanceOf(owner.address)).to.equal(
        ethers.utils.parseEther('55')
      );
      expect(await coin.balanceOf(addr[0].address)).to.equal(
        ethers.utils.parseEther('45')
      );
    });
  });
  describe('On Transfer 20 ethers', function () {
    it('Should tranfer 18 ethers to Address[1] and 2 ethers to P.T.I.', async function () {
      await coin
        .connect(addr[0])
        .transfer(addr[1].address, ethers.utils.parseEther('20'));
      expect(await coin.balanceOf(owner.address)).to.equal(
        ethers.utils.parseEther('57')
      );
      expect(await coin.balanceOf(addr[0].address)).to.equal(
        ethers.utils.parseEther('25')
      );
      expect(await coin.balanceOf(addr[1].address)).to.equal(
        ethers.utils.parseEther('18')
      );
    });
  });
  describe('On Transfer 10 ethers', function () {
    it('Should tranfer compete 10 ethers to Address[0] (Address[0] <=> P.T.I.)', async function () {
      await coin
        .connect(addr[1])
        .transfer(addr[0].address, ethers.utils.parseEther('18'));

      expect(await coin.balanceOf(addr[0].address)).to.equal(
        ethers.utils.parseEther('43')
      );
      expect(await coin.balanceOf(addr[1].address)).to.equal(
        ethers.utils.parseEther('0')
      );
    });
  });
});
