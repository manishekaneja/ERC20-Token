const { expect } = require("chai");

describe("Greeter", function() {
  it("Should return the new greeting once it's changed", async function() {
    const LuckyCoin = await ethers.getContractFactory("LuckyCoin");
    const luckycoin = await LuckyCoin.deploy();
    await greeter.deployed();
    
    expect(await greeter.greet()).to.equal("Hello, world!");

    await greeter.setGreeting("Hola, mundo!");
    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
