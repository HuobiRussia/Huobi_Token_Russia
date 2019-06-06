pragma solidity ^0.5.0;

import "../../3rdparty/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "../../3rdparty/openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "../../3rdparty/openzeppelin-solidity/contracts/token/ERC20/ERC20Pausable.sol";
import "../../3rdparty/openzeppelin-solidity/contracts/ownership/Ownable.sol";

/**
 * @title HTR
 * @dev HuobiRussiaToken is Detailed, Ownable, Pausable ERC 20 Token based on openzeppelin-solidity sources
 */

contract HTRReceiver {
    function tokenFallback( address from, uint256 value ) public;
}


contract HTR is ERC20, ERC20Detailed, ERC20Pausable, Ownable {

    mapping(address=>bool) _trusted;

    /**
     * @dev Constructor that gives msg.sender all of existing tokens, pauser added.
     */
    constructor () public ERC20Detailed("Huobi Token Russia", "HTR", 18) {
        _mint(msg.sender, 200000000 * (10 ** uint256(decimals())));
    }


    function reclaimEther(address payable _to) public onlyOwner returns(bool) {
        _to.transfer(address(this).balance);
        return true;
    }

    function reclaimToken(ERC20 token, address _to) public onlyOwner returns(bool) {
        uint256 balance = token.balanceOf(address(this));
        token.transfer(_to, balance);
        return true;
    }

    /**
     * @dev set trusted certificate address, containing tokenFallback function implementatios
     *
     * Requirements:
     *
     * - `recipient` cannot be the zero address.
     * - the caller must have a balance of at least `amount`.
     */

    function setTrustedAddress(address trusted, bool is_trusted) public onlyOwner returns(bool){
        _trusted[trusted] = is_trusted;
    }


    /**
     * @dev See `IERC20.transfer`.
     *
     * Requirements:
     *
     * - `recipient` cannot be the zero address.
     * - the caller must have a balance of at least `amount`.
     */
    function transfer(address recipient, uint256 amount) public returns (bool) {
        _transfer(msg.sender, recipient, amount);
        if( _trusted[recipient] ){
                HTRReceiver(recipient).tokenFallback(msg.sender, amount);
        }
        return true;
    }

    /**
     * @dev See `IERC20.transferFrom`.
     *
     * Emits an `Approval` event indicating the updated allowance. This is not
     * required by the EIP. See the note at the beginning of `ERC20`;
     *
     * Requirements:
     * - `sender` and `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `value`.
     * - the caller must have allowance for `sender`'s tokens of at least
     * `amount`.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public returns (bool) {
        _transfer(sender, recipient, amount);
        _approve(sender, msg.sender, allowance(sender, msg.sender).sub(amount));
        if( _trusted[recipient] ){
            HTRReceiver(recipient).tokenFallback(sender, amount);
        }
        return true;
    }

   /**
     * @dev Bulk transfer function
     *
     * Makes multiple transfers to receipients. tokenFallback function isn't called for trusted smart contracts.
     */
    function bulkTransfer(address[]  memory recipients, uint256[] memory amounts) public returns(bool){
        for( uint256 i = 0; i < recipients.length; i++ ){
            _transfer(msg.sender, recipients[i], amounts[i]);
        }
        return true;
    }
}