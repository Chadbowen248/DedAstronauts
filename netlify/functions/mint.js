exports.handler = async function () {
    // const { XummSdk } = require('xumm-sdk')
    // const Sdk = new XummSdk(process.env.XUMM_APIKEY, process.env.XUMM_APISECRET)
  
    // const request = {
    //   "TransactionType": "Payment",
    //   "Destination": "rKJYFcS28vZW4X17SVzbCeiLN7PaWfSukX",
    //   "Amount": "10000"
    // }
    // const payload = await Sdk.payload.create(request, true)
    const payload = {
        canMint: true,
        numberMinted: 1
    }
  
  
    return {
      statusCode: 200,
      body: JSON.stringify(payload)
    }
  }