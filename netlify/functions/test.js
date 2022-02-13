exports.handler = async function (event, context, callback) {
  const { XummSdk } = require("xumm-sdk");
  const Sdk = new XummSdk(process.env.XUMM_APIKEY, process.env.XUMM_APISECRET);
  const xrpl = require("xrpl");
  const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233");

  await client.connect();
  const nfts = await client.request({
    method: "account_nfts",
    account: "rPuPn48C2Z3Db5j14vzHdyq6c32UKXJAtP",
  });

  // maybe make this random

  const nftTokenIDToMint = nfts.result.account_nfts[0].TokenID;

  let nftSellOffers;
  try {
    nftSellOffers = await client.request({
      method: "nft_sell_offers",
      tokenid: nftTokenIDToMint,
    });
  } catch (err) {
    console.log("No sell offers.");
  }

  const tokenIndex = nftSellOffers.result.offers[0].index;

  client.disconnect();
  const formatURI = URI => {
    const original = xrpl.convertHexToString(URI).substring(7)
    return `https://gateway.pinata.cloud/ipfs/${original}`
  }
  const request = {
    TransactionType: "NFTokenAcceptOffer",
    Account: "rPuPn48C2Z3Db5j14vzHdyq6c32UKXJAtP",
    SellOffer: tokenIndex, // this comes from the index value from the nft array offer on the ded account
  };

  console.log(request);

  const payload = await Sdk.payload.create(request, true);
  const formatedPayload = {
    ...payload,
    freshMint: {
      ...nfts.result.account_nfts[0],
      formattedURI: formatURI(nfts.result.account_nfts[0].URI)
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(formatedPayload),
  };
};
