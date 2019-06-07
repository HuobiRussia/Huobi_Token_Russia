const { BN } = require('openzeppelin-test-helpers');

const { shouldBehaveLikeERC20Burnable } = require('./behaviors/ERC20Burnable.behavior');
const ERC20BurnableMock = artifacts.require('HTR');

contract('HTR', function ([ owner, ...otherAccounts]) {
  const initialBalance = new BN(10).pow(new BN(18)).mul(new BN(75000000) );

  beforeEach(async function () {
    this.token = await ERC20BurnableMock.new( { from: owner });
  });

  shouldBehaveLikeERC20Burnable(owner, initialBalance, otherAccounts);
});
