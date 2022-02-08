exports.handler = async function (event, context, callback) {
  const { TxData } = require("xrpl-txdata");
  const { XummSdk } = require("xumm-sdk");
  const Sdk = new XummSdk(process.env.XUMM_APIKEY, process.env.XUMM_APISECRET);
  const Verify = new TxData();
  const result = await Sdk.payload.get(event.queryStringParameters.uuid);
  const verifiedPayload = await Verify.getOne(result?.response.txid);
console.log(verifiedPayload)
  const checkAmount = verifiedPayload.result.Amount === "10000"; 
  const isValid = verifiedPayload.result.validated === true;
  const balanceChanged = verifiedPayload.balanceChanges.rKJYFcS28vZW4X17SVzbCeiLN7PaWfSukX[0].value ===
    "0.01";

    console.log(checkAmount, isValid, balanceChanged)

    if(checkAmount && isValid && balanceChanged) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          hash: verifiedPayload.result.hash
        }),
      };
    }

    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "something went wrong."
      })
    }

 
};
