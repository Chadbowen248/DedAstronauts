exports.handler = async function () {
  const xrpl = require("xrpl");
  const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233");

  await client.connect();
  const nfts = await client.request({
    method: "account_nfts",
    account: "rPuPn48C2Z3Db5j14vzHdyq6c32UKXJAtP",
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
        numberMinted: nfts.result.account_nfts.length
    })
  }
};
