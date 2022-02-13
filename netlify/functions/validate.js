exports.handler = async function (event, context, callback) {
  const { XummSdk } = require("xumm-sdk");
  const verifySignature = require('verify-xrpl-signature').verifySignature
  const xrpl = require("xrpl");


  const Sdk = new XummSdk(process.env.XUMM_APIKEY, process.env.XUMM_APISECRET);
  const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233");
  const result = await Sdk.payload.get(event.queryStringParameters.uuid);

  const verified = verifySignature(result.response.hex)

	await client.connect()
  console.log("Connected to Sandbox")
	const nfts = await client.request({
		method: "account_nfts",
		account: verified.signedBy
	})

  // <!-- https://gateway.pinata.cloud/ipfs/QmejZCt4xD7tJKAt1qw34PkTDEyM4uvzQa4FjfUvmC9ort/16.png -->
  // ipfs://QmejZCt4xD7tJKAt1qw34PkTDEyM4uvzQa4FjfUvmC9ort/84.png

  const formatURI = URI => {
    const original = xrpl.convertHexToString(URI).substring(7)
    return `https://gateway.pinata.cloud/ipfs/${original}`
  }

  const userNFTs = nfts.result.account_nfts.map(nft => {
    return {
      ...nft,
      formattedURI: formatURI(nft.URI)
    }
  })
	console.log(nfts)
	client.disconnect()

  console.log(verified)

  console.log(result)


    return {
      statusCode: 200,
      body: JSON.stringify({
        verifiedPayload: verified,
        signerNFTs: userNFTs,
        hash: result.response.hex
      })
    }


// https://gateway.pinata.cloud/ipfs/QmejZCt4xD7tJKAt1qw34PkTDEyM4uvzQa4FjfUvmC9ort/32.png

 
};
