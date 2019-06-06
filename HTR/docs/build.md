
#Building 

### Build
```
truffle compile
```

### Test
```
truffle test
```

### Flatten contract
```
truffle-flattener contracts/HTR.sol > flatten/HTR.sol
```


### Generate docs: 
```
sudo solmd ./flatten/HTR.sol --dest ./docs/HTR.md
```

### Deploy
```
truffle deploy
```