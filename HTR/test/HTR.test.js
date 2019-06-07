const { shouldBehaveLikeERC20Mintable } = require('./behaviors/ERC20Mintable.behavior');
const ERC20MintableMock = artifacts.require('HTR');
const { shouldBehaveLikePublicRole } = require('./behaviors/access/roles/PublicRole.behavior');
const { BN, constants, expectEvent, expectRevert } = require('openzeppelin-test-helpers');

contract('HTR', function ([ minter, otherMinter, ...otherAccounts]) {
  beforeEach(async function () {
    this.token = await ERC20MintableMock.new({ from: minter });
  });

  describe('HTR mint limit', function () {
    beforeEach(async function () {
      this.contract = this.token;
    });

    it("Mint more than a limit", async function(){
      const amount= new BN(10).pow(new BN(18)).mul(new BN(125000001)); 
      await expectRevert(this.contract.mint(minter, amount, {from:minter}),
            'Mint limit exceeded'
          );
    });
    it("Mint less than the limit", async function(){
      const mintLimit= new BN(10).pow(new BN(18)).mul( new BN(75000000).add(new BN(1000000))); 
      const amount = new BN(10).pow(new BN(18)).mul( new BN(1000000)); 
      await this.contract.mint(minter, amount, {from:minter});
      (await this.contract.balanceOf(minter)).should.be.bignumber.equal(mintLimit);
      (await this.contract.totalSupply()).should.be.bignumber.equal(mintLimit);
    });

    it("Mint up to the limit", async function(){
      const mintLimit= new BN(10).pow(new BN(18)).mul( new BN(75000000).add(new BN(125000000))); 
      const amount = new BN(10).pow(new BN(18)).mul( new BN(125000000)); 
      await this.contract.mint(minter, amount, {from:minter});
      (await this.contract.balanceOf(minter)).should.be.bignumber.equal(mintLimit);
      (await this.contract.totalSupply()).should.be.bignumber.equal(mintLimit);
    });

  });

  describe('HTR bulk transfer', async function () {
    beforeEach(async function () {
      this.contract = this.token;
    });
    it("bulkTransfer", async function(){
      const amounts = [];
      for(let i = 0; i<otherAccounts.length; i++ ){
        amounts.push( new BN(10).pow(new BN(18)).mul( new BN(i)) );
      }

      await this.contract.bulkTransfer(otherAccounts, amounts);

      for(let i = 0; i<otherAccounts.length; i++ ){
        (await this.contract.balanceOf(otherAccounts[i])).should.be.bignumber.equal(amounts[i]);
      }
    });


  });

});
