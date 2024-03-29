const { BN, expectEvent, expectRevert } = require('openzeppelin-test-helpers');
const { expect } = require('chai');

const ERC20PausableMock = artifacts.require('HTR');
const { shouldBehaveLikePublicRole } = require('./behaviors/access/roles/PublicRole.behavior');

contract('ERC20Pausable', function ([pauser, otherPauser, recipient, anotherAccount, ...otherAccounts]) {
  const initialSupply = new BN("10").pow( new BN("18")).mul(new BN(75000000));

  beforeEach(async function () {
    this.token = await ERC20PausableMock.new();
  });

  describe('pauser role', function () {
    beforeEach(async function () {
      this.contract = this.token;
      await this.contract.addPauser(otherPauser, { from: pauser });
    });

    shouldBehaveLikePublicRole(pauser, otherPauser, otherAccounts, 'pauser');
  });

  describe('pause', function () {
    describe('when the sender is the token pauser', function () {
      const from = pauser;

      describe('when the token is unpaused', function () {
        it('pauses the token', async function () {
          await this.token.pause({ from });
          (await this.token.paused()).should.equal(true);
        });

        it('emits a Pause event', async function () {
          const { logs } = await this.token.pause({ from });

          expectEvent.inLogs(logs, 'Paused');
        });
      });

      describe('when the token is paused', function () {
        beforeEach(async function () {
          await this.token.pause({ from });
        });

      });
    });

    describe('when the sender is not the token pauser', function () {
      const from = anotherAccount;

      it('reverts', async function () {
        await expectRevert(this.token.pause({ from }),
          'PauserRole: caller does not have the Pauser role'
        );
      });
    });
  });

  describe('unpause', function () {
    describe('when the sender is the token pauser', function () {
      const from = pauser;

      describe('when the token is paused', function () {
        beforeEach(async function () {
          await this.token.pause({ from });
        });

        it('unpauses the token', async function () {
          await this.token.unpause({ from });
          (await this.token.paused()).should.equal(false);
        });

        it('emits an Unpause event', async function () {
          const { logs } = await this.token.unpause({ from });

          expectEvent.inLogs(logs, 'Unpaused');
        });
      });

      describe('when the token is unpaused', function () {
        it('reverts', async function () {
          await expectRevert(this.token.unpause({ from }), 'Pausable: not paused');
        });
      });
    });

    describe('when the sender is not the token pauser', function () {
      const from = anotherAccount;

      it('reverts', async function () {
        await expectRevert(this.token.unpause({ from }),
          'PauserRole: caller does not have the Pauser role'
        );
      });
    });
  });

  describe('pausable token', function () {
    const from = pauser;

    describe('paused', function () {
      it('is not paused by default', async function () {
        (await this.token.paused({ from })).should.equal(false);
      });

      it('is paused after being paused', async function () {
        await this.token.pause({ from });
        (await this.token.paused({ from })).should.equal(true);
      });

      it('is not paused after being paused and then unpaused', async function () {
        await this.token.pause({ from });
        await this.token.unpause({ from });
        (await this.token.paused()).should.equal(false);
      });
    });

    describe('transfer', function () {
      it('allows to transfer when unpaused', async function () {
        await this.token.transfer(recipient, initialSupply, { from: pauser });

        (await this.token.balanceOf(pauser)).should.be.bignumber.equal('0');
        (await this.token.balanceOf(recipient)).should.be.bignumber.equal(initialSupply);
      });

      it('allows to transfer when paused and then unpaused', async function () {
        await this.token.pause({ from: pauser });
        await this.token.unpause({ from: pauser });

        await this.token.transfer(recipient, initialSupply, { from: pauser });

        (await this.token.balanceOf(pauser)).should.be.bignumber.equal('0');
        (await this.token.balanceOf(recipient)).should.be.bignumber.equal(initialSupply);
      });

      it('reverts when trying to transfer when paused', async function () {
        await this.token.pause({ from: pauser });
        await this.token.transfer(recipient, initialSupply, { from: pauser });

        await expectRevert(this.token.transfer(pauser, initialSupply, { from: recipient }),
          'Pausable: paused'
        );
      });
    });

    describe('approve', function () {
      const allowance = new BN(40);

      it('allows to approve when unpaused', async function () {
        await this.token.approve(anotherAccount, allowance, { from: pauser });

        (await this.token.allowance(pauser, anotherAccount)).should.be.bignumber.equal(allowance);
      });

      it('allows to approve when paused and then unpaused', async function () {
        await this.token.pause({ from: pauser });
        await this.token.unpause({ from: pauser });

        await this.token.approve(anotherAccount, allowance, { from: pauser });

        (await this.token.allowance(pauser, anotherAccount)).should.be.bignumber.equal(allowance);
      });

      it('reverts when trying to approve when paused', async function () {
        await this.token.pause({ from: pauser });
        await this.token.approve(anotherAccount, allowance, { from: pauser });
        await this.token.transfer(anotherAccount, initialSupply, { from: pauser });

        await expectRevert(this.token.approve(pauser, allowance, { from: anotherAccount }),
          'Pausable: paused'
        );
      });
    });

    describe('transfer from', function () {
      const allowance = new BN(40);

      beforeEach(async function () {
        await this.token.approve(anotherAccount, allowance, { from: pauser });
      });

      it('allows to transfer from when unpaused', async function () {
        await this.token.transferFrom(pauser, recipient, allowance, { from: anotherAccount });

        (await this.token.balanceOf(recipient)).should.be.bignumber.equal(allowance);
        (await this.token.balanceOf(pauser)).should.be.bignumber.equal(initialSupply.sub(allowance));
      });

      it('allows to transfer when paused and then unpaused', async function () {
        await this.token.pause({ from: pauser });
        await this.token.unpause({ from: pauser });

        await this.token.transferFrom(pauser, recipient, allowance, { from: anotherAccount });

        (await this.token.balanceOf(recipient)).should.be.bignumber.equal(allowance);
        (await this.token.balanceOf(pauser)).should.be.bignumber.equal(initialSupply.sub(allowance));
      });

      it('reverts when trying to transfer from when paused', async function () {
        await this.token.pause({ from: pauser });

        await expectRevert(this.token.transferFrom(
          pauser, recipient, allowance, { from: anotherAccount }), 'Pausable: paused'
        );
      });
    });

    describe('decrease approval', function () {
      const allowance = new BN(40);
      const decrement = new BN(10);

      beforeEach(async function () {
        await this.token.approve(anotherAccount, allowance, { from: pauser });
        await this.token.transfer(anotherAccount, allowance, { from: pauser });
        await this.token.approve(pauser, allowance, { from: anotherAccount });

      });

      it('allows to decrease approval when unpaused', async function () {
        await this.token.decreaseAllowance(anotherAccount, decrement, { from: pauser });

        (await this.token.allowance(pauser, anotherAccount)).should.be.bignumber.equal(allowance.sub(decrement));
      });

      it('allows to decrease approval when paused and then unpaused', async function () {
        await this.token.pause({ from: pauser });
        await this.token.unpause({ from: pauser });

        await this.token.decreaseAllowance(anotherAccount, decrement, { from: pauser });

        (await this.token.allowance(pauser, anotherAccount)).should.be.bignumber.equal(allowance.sub(decrement));
      });

      it('reverts when trying to transfer when paused', async function () {
        await this.token.pause({ from: pauser });

        await this.token.decreaseAllowance(anotherAccount, decrement, { from: pauser })

        await expectRevert(this.token.decreaseAllowance(
          pauser, decrement, { from: anotherAccount }), 'Pausable: paused'
        );
      });
    });

    describe('increase approval', function () {
      const allowance = new BN(40);
      const increment = new BN(30);

      beforeEach(async function () {
        await this.token.approve(anotherAccount, allowance, { from: pauser });
        await this.token.transfer(anotherAccount, allowance, { from: pauser });
        await this.token.approve(pauser, allowance, { from: anotherAccount });

      });

      it('allows to increase approval when unpaused', async function () {
        await this.token.increaseAllowance(anotherAccount, increment, { from: pauser });

        (await this.token.allowance(pauser, anotherAccount)).should.be.bignumber.equal(allowance.add(increment));
      });

      it('allows to increase approval when paused and then unpaused', async function () {
        await this.token.pause({ from: pauser });
        await this.token.unpause({ from: pauser });

        await this.token.increaseAllowance(anotherAccount, increment, { from: pauser });

        (await this.token.allowance(pauser, anotherAccount)).should.be.bignumber.equal(allowance.add(increment));
      });

      it('reverts when trying to increase approval when paused', async function () {
        await this.token.pause({ from: pauser });
        await this.token.increaseAllowance(anotherAccount, increment, { from: pauser });
        await expectRevert(this.token.increaseAllowance(
          pauser, increment, { from: anotherAccount }), 'Pausable: paused'
        );
      });
    });
  });
});
