* [HTR](#htr)
  * [name](#function-name)
  * [approve](#function-approve)
  * [bulkTransfer](#function-bulktransfer)
  * [totalSupply](#function-totalsupply)
  * [transferFrom](#function-transferfrom)
  * [removeMinter](#function-removeminter)
  * [decimals](#function-decimals)
  * [increaseAllowance](#function-increaseallowance)
  * [unpause](#function-unpause)
  * [mint](#function-mint)
  * [burn](#function-burn)
  * [isPauser](#function-ispauser)
  * [paused](#function-paused)
  * [removePauser](#function-removepauser)
  * [renouncePauser](#function-renouncepauser)
  * [balanceOf](#function-balanceof)
  * [renounceOwnership](#function-renounceownership)
  * [burnFrom](#function-burnfrom)
  * [setTrustedAddress](#function-settrustedaddress)
  * [addPauser](#function-addpauser)
  * [pause](#function-pause)
  * [reclaimToken](#function-reclaimtoken)
  * [owner](#function-owner)
  * [isOwner](#function-isowner)
  * [symbol](#function-symbol)
  * [addMinter](#function-addminter)
  * [renounceMinter](#function-renounceminter)
  * [mintLimit](#function-mintlimit)
  * [reclaimEther](#function-reclaimether)
  * [decreaseAllowance](#function-decreaseallowance)
  * [transfer](#function-transfer)
  * [isMinter](#function-isminter)
  * [allowance](#function-allowance)
  * [transferOwnership](#function-transferownership)
  * [OwnershipTransferred](#event-ownershiptransferred)
  * [MinterAdded](#event-minteradded)
  * [MinterRemoved](#event-minterremoved)
  * [Paused](#event-paused)
  * [Unpaused](#event-unpaused)
  * [PauserAdded](#event-pauseradded)
  * [PauserRemoved](#event-pauserremoved)
  * [Transfer](#event-transfer)
  * [Approval](#event-approval)

# HTR


## *function* name

HTR.name() `view` `06fdde03`

> Returns the name of the token.




## *function* approve

HTR.approve(spender, value) `nonpayable` `095ea7b3`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | spender | undefined |
| *uint256* | value | undefined |


## *function* bulkTransfer

HTR.bulkTransfer(recipients, amounts) `nonpayable` `153a1f3e`

> Bulk transfer function     * Makes multiple transfers to receipients. tokenFallback function isn't called for trusted smart contracts.

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address[]* | recipients | undefined |
| *uint256[]* | amounts | undefined |


## *function* totalSupply

HTR.totalSupply() `view` `18160ddd`

> See `IERC20.totalSupply`.




## *function* transferFrom

HTR.transferFrom(sender, recipient, amount) `nonpayable` `23b872dd`

> See `IERC20.transferFrom`.     * Emits an `Approval` event indicating the updated allowance. This is not required by the EIP. See the note at the beginning of `ERC20`;     * Requirements: - `sender` and `recipient` cannot be the zero address. - `sender` must have a balance of at least `value`. - the caller must have allowance for `sender`'s tokens of at least `amount`.

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | sender | undefined |
| *address* | recipient | undefined |
| *uint256* | amount | undefined |


## *function* removeMinter

HTR.removeMinter(account) `nonpayable` `3092afd5`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | account | undefined |


## *function* decimals

HTR.decimals() `view` `313ce567`

> Returns the number of decimals used to get its user representation. For example, if `decimals` equals `2`, a balance of `505` tokens should be displayed to a user as `5,05` (`505 / 10 ** 2`).     * Tokens usually opt for a value of 18, imitating the relationship between Ether and Wei.     * > Note that this information is only used for _display_ purposes: it in no way affects any of the arithmetic of the contract, including `IERC20.balanceOf` and `IERC20.transfer`.




## *function* increaseAllowance

HTR.increaseAllowance(spender, addedValue) `nonpayable` `39509351`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | spender | undefined |
| *uint256* | addedValue | undefined |


## *function* unpause

HTR.unpause() `nonpayable` `3f4ba83a`

> Called by a pauser to unpause, returns to normal state.




## *function* mint

HTR.mint(account, amount) `nonpayable` `40c10f19`

> See `ERC20._mint`.     * Requirements:     * - the caller must have the `MinterRole`. totalSupply + amount must be lower than mintLimit. 

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | account | undefined |
| *uint256* | amount | undefined |


## *function* burn

HTR.burn(amount) `nonpayable` `42966c68`

> Destroys `amount` tokens from the caller.     * See `ERC20._burn`.

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | amount | undefined |


## *function* isPauser

HTR.isPauser(account) `view` `46fbf68e`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | account | undefined |


## *function* paused

HTR.paused() `view` `5c975abb`

> Returns true if the contract is paused, and false otherwise.




## *function* removePauser

HTR.removePauser(account) `nonpayable` `6b2c0f55`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | account | undefined |


## *function* renouncePauser

HTR.renouncePauser() `nonpayable` `6ef8d66d`





## *function* balanceOf

HTR.balanceOf(account) `view` `70a08231`

> See `IERC20.balanceOf`.

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | account | undefined |


## *function* renounceOwnership

HTR.renounceOwnership() `nonpayable` `715018a6`

> Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner.     * > Note: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.




## *function* burnFrom

HTR.burnFrom(account, amount) `nonpayable` `79cc6790`

> See `ERC20._burnFrom`.

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | account | undefined |
| *uint256* | amount | undefined |


## *function* setTrustedAddress

HTR.setTrustedAddress(trusted, is_trusted) `nonpayable` `806c3ca9`

> set trusted certificate address, containing tokenFallback function implementatios     * Requirements:     * - `recipient` cannot be the zero address. - the caller must have a balance of at least `amount`.

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | trusted | undefined |
| *bool* | is_trusted | undefined |


## *function* addPauser

HTR.addPauser(account) `nonpayable` `82dc1ec4`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | account | undefined |


## *function* pause

HTR.pause() `nonpayable` `8456cb59`

> Called by a pauser to pause, triggers stopped state.




## *function* reclaimToken

HTR.reclaimToken(token, _to) `nonpayable` `88ee39cc`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | token | undefined |
| *address* | _to | undefined |


## *function* owner

HTR.owner() `view` `8da5cb5b`

> Returns the address of the current owner.




## *function* isOwner

HTR.isOwner() `view` `8f32d59b`

> Returns true if the caller is the current owner.




## *function* symbol

HTR.symbol() `view` `95d89b41`

> Returns the symbol of the token, usually a shorter version of the name.




## *function* addMinter

HTR.addMinter(account) `nonpayable` `983b2d56`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | account | undefined |


## *function* renounceMinter

HTR.renounceMinter() `nonpayable` `98650275`





## *function* mintLimit

HTR.mintLimit() `view` `996517cf`





## *function* reclaimEther

HTR.reclaimEther(_to) `nonpayable` `9a6a30a4`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _to | undefined |


## *function* decreaseAllowance

HTR.decreaseAllowance(spender, subtractedValue) `nonpayable` `a457c2d7`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | spender | undefined |
| *uint256* | subtractedValue | undefined |


## *function* transfer

HTR.transfer(recipient, amount) `nonpayable` `a9059cbb`

> See `IERC20.transfer`.     * Requirements:     * - `recipient` cannot be the zero address. - the caller must have a balance of at least `amount`.

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | recipient | undefined |
| *uint256* | amount | undefined |


## *function* isMinter

HTR.isMinter(account) `view` `aa271e1a`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | account | undefined |


## *function* allowance

HTR.allowance(owner, spender) `view` `dd62ed3e`

> See `IERC20.allowance`.

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | owner | undefined |
| *address* | spender | undefined |


## *function* transferOwnership

HTR.transferOwnership(newOwner) `nonpayable` `f2fde38b`

> Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | newOwner | undefined |


## *event* OwnershipTransferred

HTR.OwnershipTransferred(previousOwner, newOwner) `8be0079c`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | previousOwner | indexed |
| *address* | newOwner | indexed |

## *event* MinterAdded

HTR.MinterAdded(account) `6ae17283`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | account | indexed |

## *event* MinterRemoved

HTR.MinterRemoved(account) `e94479a9`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | account | indexed |

## *event* Paused

HTR.Paused(account) `62e78cea`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | account | not indexed |

## *event* Unpaused

HTR.Unpaused(account) `5db9ee0a`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | account | not indexed |

## *event* PauserAdded

HTR.PauserAdded(account) `6719d08c`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | account | indexed |

## *event* PauserRemoved

HTR.PauserRemoved(account) `cd265eba`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | account | indexed |

## *event* Transfer

HTR.Transfer(from, to, value) `ddf252ad`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | from | indexed |
| *address* | to | indexed |
| *uint256* | value | not indexed |

## *event* Approval

HTR.Approval(owner, spender, value) `8c5be1e5`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | owner | indexed |
| *address* | spender | indexed |
| *uint256* | value | not indexed |


---