exports.handler = async function () {
  const xrpl = require("xrpl");
  const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233");

  await client.connect();
  const nfts = await client.request({
    method: "account_nfts",
    account: "rJbk4K8xeiwRap3JJpmXSYwRkCFocQyFvS",
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
        numberMinted: nfts.result.account_nfts.length
    })
  }
};
