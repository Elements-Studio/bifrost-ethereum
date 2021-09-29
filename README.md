# Starcoin Bifrost Contracts
Starcoin cross-chain bridge Ethereum implementation.

### install @openzeppelin/contracts

```shell
npm install
```

### Default Account

For `development` network:

Truffle will use truffle-generated accounts in this private network.

For `other` networks:

The default development requires a `.private_key` file in the root directory, truffle will use it as the default `account[0]` account.


### compile

```shell
truffle compile
```

### deploy

```shell
truffle migrate
```

depoly on Ropsten network
```shell
truffle migrate --network eth_ropsten_bifrost
```

### test
```shell
truffle test
truffle test tests/stc_test.json 
```

### ABI
truffle compile后，在build/contracts/*.json中，有abi和bytecode等字段。
