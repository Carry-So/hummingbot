# Test hummingbot API with xdc chain

## Setup enviroment

-   Setup enviroment according to [instruction](./setup-test-enviroment.md) before test.
-   Mint some test tokens to your test account.

## Test cases

### 1. Query gateway status

```shell
# curl -s -X GET -k --key ${GATEWAY_KEY} --cert ${GATEWAY_CERT} ${SERVER} | jq
https --print=b ${SERVER}
```

![1669875962368](https://user-images.githubusercontent.com/7695325/204981105-8f7b982b-f291-4eba-a6f6-358e71cb4739.png)

### 2. Query network config

```shell
# curl -s -X GET -k --key $GATEWAY_KEY --cert $GATEWAY_CERT "${SERVER}/network/config" | jq
https --print=b ${SERVER}/network/config
```

![1669876075182](https://user-images.githubusercontent.com/7695325/204981405-07601263-d3c8-4e03-a4a6-50a504d4b5e4.png)

### 3. Query connectors

```shell
# curl -s -X GET -k --key ${GATEWAY_KEY} --cert ${GATEWAY_CERT} ${SERVER}/connectors | jq
https --print=b ${SERVER}/connectors
```

![1669878972967](https://user-images.githubusercontent.com/7695325/204989577-c2a1ac93-25e9-4069-8250-8c216c6e3103.png)

### 4. Query network status

**xinfin**

```shell
# curl -s -X GET -k --key $GATEWAY_KEY --cert $GATEWAY_CERT "${SERVER}/network/status?chain=xdc&network=xinfin" | jq
https --print=b ${SERVER}/network/status chain==xdc network==xinfin
```

![1669876416027](https://user-images.githubusercontent.com/7695325/204982283-12de7e57-d94e-4388-b6fa-e24786a616da.png)

**apothem**
```shell
# curl -s -X GET -k --key $GATEWAY_KEY --cert $GATEWAY_CERT "${SERVER}/network/status?chain=xdc&network=apothem" | jq
https --print=b ${SERVER}/network/status chain==xdc network==apothem
```

![1669876513256](https://user-images.githubusercontent.com/7695325/204982502-b68a4d48-0876-4aa5-bca6-09206493e7a7.png)

**all networks**

```shell
# curl -s -X GET -k --key $GATEWAY_KEY --cert "$GATEWAY_CERT" "${SERVER}/network/status" | jq
https --print=b ${SERVER}/network/status
```

![1669879189640](https://user-images.githubusercontent.com/7695325/204990553-4d98a69c-d542-47f2-a17c-bc5ac18f3b35.png)

### 5. Fetch token list

**xinfin**

```shell
# curl -s -X GET -k --key $GATEWAY_KEY --cert $GATEWAY_CERT "${SERVER}/network/tokens?chain=xdc&network=xinfin" | jq
https --print=b ${SERVER}/network/tokens chain==xdc network==xinfin
```

![1669876730976](https://user-images.githubusercontent.com/7695325/204983090-cbbeccc3-5a1c-4375-a54c-9e3e4a7aa08b.png)

**apothem**

```shell
# curl -s -X GET -k --key $GATEWAY_KEY --cert $GATEWAY_CERT "${SERVER}/network/tokens?chain=xdc&network=apothem" | jq
https --print=b ${SERVER}/network/tokens chain==xdc network==apothem
```

![1669876794725](https://user-images.githubusercontent.com/7695325/204983245-c74c2b81-043e-40b2-a5cd-a969ef19a0f4.png)

### 6. Query transaction

#### 6.1 If use curl

**xinfin**

```shell
curl -s -X POST -k --key $GATEWAY_KEY --cert $GATEWAY_CERT -H "${HEADER}"  "${SERVER}/network/poll" -d '{
    "chain": "xdc",
    "network": "xinfin",
    "txHash": "0xf49e741720e3f6c464e7bfbdcaefddb6f9a4cc39d4b367476727e95be735b350"
}' | jq
```

**apothem**

```shell
curl -s -X POST -k --key $GATEWAY_KEY --cert $GATEWAY_CERT -H "${HEADER}"  "${SERVER}/network/poll" -d '{
    "chain": "xdc",
    "network": "apothem",
    "txHash": "0x1114601d48ebc3afa5e06af13e759560e74b3d5d1837d951919bc57727a623dd"
}' | jq
```

#### 6.2 If use httpie

**xinfin**

```shell
https --print=b POST ${SERVER}/network/poll chain=xdc network=xinfin txHash=0xf49e741720e3f6c464e7bfbdcaefddb6f9a4cc39d4b367476727e95be735b350
```

![1669879304138](https://user-images.githubusercontent.com/7695325/204990835-4f7ccf87-1c5f-4f15-be16-b094adfbc29f.png)

**apothem**

```shell
https --print=b POST ${SERVER}/network/poll chain=xdc network=apothem txHash=0x1114601d48ebc3afa5e06af13e759560e74b3d5d1837d951919bc57727a623dd
```

![1669877250971](https://user-images.githubusercontent.com/7695325/204984600-dfec94b2-dc89-4f29-845d-c341a1870af4.png)

### 7 Add private key

The length of private key is 67 characters with `xdc` prefix or 66 characters with `0x` prefix, such as:

-   xdc prefix: xdc0123456789012345678901234567890123456789012345678901234567890123
-   0x prefix: 0x0123456789012345678901234567890123456789012345678901234567890123

We will use xdc-prefix in below tests.

```shell
# export XDC_PRIVATE_KEY="xdc0123456789012345678901234567890123456789012345678901234567890123"
export XDC_PRIVATE_KEY="<YOUR_XDC_PRIVATE_KEY>"
```

![image](https://user-images.githubusercontent.com/7695325/204986439-f300c68b-ec2f-4d50-a548-af143e4b0497.png)

#### 7.1 If use curl

**xinfin**

```shell
curl -s -X POST -k --key $GATEWAY_KEY --cert $GATEWAY_CERT -H "${HEADER}" "${SERVER}/wallet/add" -d '{
    "privateKey": "'"${XDC_PRIVATE_KEY}"'",
    "chain": "xdc",
    "network":"xinfin"
}' | jq
```

**apothem**

```shell
curl -s -X POST -k --key $GATEWAY_KEY --cert $GATEWAY_CERT -H "${HEADER}" "${SERVER}/wallet/add" -d '{
    "privateKey": "'"${XDC_PRIVATE_KEY}"'",
    "chain": "xdc",
    "network":"apothem"
}' | jq
```

#### 7.2 If use httpie

**xinfin**

```shell
https --print=b ${SERVER}/wallet/add privateKey=${XDC_PRIVATE_KEY} chain=xdc network=xinfin
```

![1669878351454](https://user-images.githubusercontent.com/7695325/204987731-8ec1bd75-8826-461f-b22a-9fe249563c0c.png)

**apothem**

```shell
https --print=b ${SERVER}/wallet/add privateKey=${XDC_PRIVATE_KEY} chain=xdc network=apothem
```

![1669878845008](https://user-images.githubusercontent.com/7695325/204989230-e008cb01-1897-4e54-b5d7-674c8453c90d.png)

### 8. Query token balances

#### 8.1 If use curl

**xinfin**

```shell
curl -s -X POST -k --key $GATEWAY_KEY --cert $GATEWAY_CERT -H "${HEADER}" "${SERVER}/network/balances" -d '{
    "chain": "xdc",
    "network": "xinfin",
    "address": "'"${XDC_ADDRESS}"'",
    "tokenSymbols": ["XDC","WXDC"]
}' | jq
```

**apothem**

```shell
curl -s -X POST -k --key $GATEWAY_KEY --cert $GATEWAY_CERT -H "${HEADER}" "${SERVER}/network/balances" -d '{
    "chain": "xdc",
    "network": "apothem",
    "address": "'"${XDC_ADDRESS}"'",
    "tokenSymbols": ["XDC","WXDC", "DAI", "WBTC2", "YFI2", "MKR2", "AAVE2", "UNI2", "USDC2"]
}' | jq
```

#### 8.2 If use httpie

**xinfin**
```shell
https --print=b POST ${SERVER}/network/balances chain=xdc network=xinfin \
address=${XDC_ADDRESS} tokenSymbols:='["XDC", "WXDC"]'
```

![1669879947119](https://user-images.githubusercontent.com/7695325/204992862-ef76f4cb-3ae5-40fd-81be-a05a1fba1d04.png)

**apothem**

```shell
https --print=b POST ${SERVER}/network/balances chain=xdc network=apothem \
address=${XDC_ADDRESS} tokenSymbols:='["XDC", "WXDC", "WBTC2", "YFI2", "MKR2", "USDC2"]'
```

![1669879997687](https://user-images.githubusercontent.com/7695325/204993016-c0af4356-cb40-4452-b99b-97a63f2aa505.png)

### 9. Query account nonce

#### 9.1 If use curl

**xinfin**

```shell
curl -s -X POST -k --key $GATEWAY_KEY --cert $GATEWAY_CERT -H "${HEADER}" "${SERVER}/evm/nonce" -d '{
    "chain": "xdc",
    "network": "xinfin",
    "address":"'"$XDC_ADDRESS"'"
}' | jq
```

**apothem**

```shell
curl -s -X POST -k --key $GATEWAY_KEY --cert $GATEWAY_CERT -H "${HEADER}" "${SERVER}/evm/nonce" -d '{
    "chain": "xdc",
    "network": "apothem",
    "address":"'"$XDC_ADDRESS"'"
}' | jq
```

#### 9.2 If use httpie

**xinfin**

```shell
https --print=b POST ${SERVER}/evm/nonce chain=xdc network=xinfin address=${XDC_ADDRESS}
```

![1669880139820](https://user-images.githubusercontent.com/7695325/204993415-26bf4011-dfff-42a8-b05c-853b8d7db63e.png)

**apothem**

```shell
https --print=b POST ${SERVER}/evm/nonce chain=xdc network=apothem address=${XDC_ADDRESS}
```

![1669880196463](https://user-images.githubusercontent.com/7695325/204993550-f0b96dd3-bfdd-4f0e-9251-02032dcd81ad.png)

### 10. Query allowances

#### 10.1 If use curl

**xinfin**

```shell
curl -s -X POST -k --key $GATEWAY_KEY --cert $GATEWAY_CERT -H "${HEADER}" "${SERVER}/evm/allowances" -d '{
    "chain": "xdc",
    "network": "xinfin",
    "address": "'"$XDC_ADDRESS"'",
    "spender": "xdc41c0ad06c98951e9bf7172cd1d285c6e34537170",
    "tokenSymbols": ["WXDC", "SRX", "XTT", "xUSDT"]
}' | jq
```

**apothem**

```shell
curl -s -X POST -k --key $GATEWAY_KEY --cert $GATEWAY_CERT -H "${HEADER}" "${SERVER}/evm/allowances" -d '{
    "chain": "xdc",
    "network": "apothem",
    "address": "'"$XDC_ADDRESS"'",
    "spender": "xdc41c0ad06c98951e9bf7172cd1d285c6e34537170",
    "tokenSymbols": ["WBTC2", "YFI2", "MKR2", "AAVE2", "UNI2", "USDC2"]
}' | jq
```

#### 10.2 If use httpie

**xinfin**

```shell
https --print=b POST ${SERVER}/evm/allowances chain=xdc network=xinfin address=${XDC_ADDRESS} \
spender=xdc85f33E1242d87a875301312BD4EbaEe8876517BA tokenSymbols:='["WXDC", "SRX", "XTT", "xUSDT"]'
```

![1669880604574](https://user-images.githubusercontent.com/7695325/204994914-8fe48046-8036-42e2-812e-c58d5ec469d4.png)

**apothem**

```shell
https --print=b POST ${SERVER}/evm/allowances chain=xdc network=apothem address=${XDC_ADDRESS} \
spender=xdc85f33E1242d87a875301312BD4EbaEe8876517BA tokenSymbols:='["WBTC2", "YFI2", "MKR2", "AAVE2", "UNI2", "USDC2"]'
```

![1669880674424](https://user-images.githubusercontent.com/7695325/204995095-dda5e586-62d7-4415-9f12-eb1423e5826b.png)

### 11. Approve allowance

#### 11.1 If use curl

**xinfin**

```shell
curl -s -X POST -k --key $GATEWAY_KEY --cert $GATEWAY_CERT -H "${HEADER}" "${SERVER}/evm/approve" -d '{
    "chain": "xdc",
    "network": "xinfin",
    "address": "'"$XDC_ADDRESS"'",
    "spender": "xdc41c0ad06c98951e9bf7172cd1d285c6e34537170",
    "token": "SRX"
}' | jq
```

**apothem**

```shell
curl -s -X POST -k --key $GATEWAY_KEY --cert $GATEWAY_CERT -H "${HEADER}" "${SERVER}/evm/approve" -d '{
    "chain": "xdc",
    "network": "apothem",
    "address": "'"$XDC_ADDRESS"'",
    "spender": "xdc41c0ad06c98951e9bf7172cd1d285c6e34537170",
    "token": "USDC2"
}' | jq
```


#### 11.2 If use httpie

**xinfin**

```shell
# query allowances
https --print=b POST ${SERVER}/evm/allowances chain=xdc network=xinfin address=${XDC_ADDRESS} \
spender=xdc41c0ad06c98951e9bf7172cd1d285c6e34537170 tokenSymbols:='["SRX"]'

# set allowances to maximum
https --print=h POST ${SERVER}/evm/approve chain=xdc network=xinfin address=${XDC_ADDRESS} \
spender=xdc41c0ad06c98951e9bf7172cd1d285c6e34537170 token=SRX

# query allowances
https --print=b POST ${SERVER}/evm/allowances chain=xdc network=xinfin address=${XDC_ADDRESS} \
spender=xdc41c0ad06c98951e9bf7172cd1d285c6e34537170 tokenSymbols:='["SRX"]'
```

![1666773893275](https://user-images.githubusercontent.com/7695325/197979153-8eb127e4-1099-4546-ac84-875c81d15749.png)

**apothem**

```shell
# clear allowances
https --print=h POST ${SERVER}/evm/approve chain=xdc network=apothem address=${XDC_ADDRESS} \
spender=xdc41c0ad06c98951e9bf7172cd1d285c6e34537170 token=USDC2 amount=0

# query allowances
https --print=b POST ${SERVER}/evm/allowances chain=xdc network=apothem address=${XDC_ADDRESS} \
spender=xdc41c0ad06c98951e9bf7172cd1d285c6e34537170 tokenSymbols:='["USDC2"]'

# set allowances to maximum
https --print=h POST ${SERVER}/evm/approve chain=xdc network=apothem address=${XDC_ADDRESS} \
spender=xdc41c0ad06c98951e9bf7172cd1d285c6e34537170 token=USDC2

# query allowances
https --print=b POST ${SERVER}/evm/allowances chain=xdc network=apothem address=${XDC_ADDRESS} \
spender=xdc41c0ad06c98951e9bf7172cd1d285c6e34537170 tokenSymbols:='["USDC2"]'
```

![1666773765723](https://user-images.githubusercontent.com/7695325/197978588-b0744215-7a64-404a-90c9-1561f833602f.png)

