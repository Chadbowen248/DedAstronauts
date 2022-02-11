exports.handler = async function () {
  const { XummSdk } = require('xumm-sdk')
  const Sdk = new XummSdk(process.env.XUMM_APIKEY, process.env.XUMM_APISECRET)

  const request = {
    "TransactionType": "NFTokenAcceptOffer",
    "Account": "r9gx2kJVyN6AKRSDbro5thyvVLUzUBYZ6p",
    "SellOffer": "A5CF3E7DE7A6A0E27C1F5F590CF82D790A1ACB08482889679A2EF5022CA54C95" // this comes from the index value from the nft array offer on the ded account
}

  const payload = await Sdk.payload.create(request, true)



  return {
    statusCode: 200,
    body: JSON.stringify(payload)
  }
}



