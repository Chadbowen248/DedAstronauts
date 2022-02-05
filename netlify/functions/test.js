// const fetch = require("node-fetch");

// exports.handler = async function (_event, _context) {
// //   const key = process.env.REACT_APP_COINMARKETCAP_API_KEY;
//   const data = {
//       shit: 69
//   }
//   return {
//     statusCode: 200,
//     body: JSON.stringify(data),
//   };

// //   return fetch(
// //     `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=200&convert=USD&CMC_PRO_API_KEY=${url}`
// //   )
// //     .then((res) => res.json())
// //     .then((data) => {
// //       return {
// //         statusCode: 200,
// //         body: JSON.stringify(data),
// //       };
// //     });
// };



exports.handler = async function () {
  const {XummSdk} = require('xumm-sdk')
  const Sdk = new XummSdk(process.env.XUMM_APIKEY, process.env.XUMM_APISECRET)

  // const main = async () => {
    const appInfo = await Sdk.ping()
    console.log(appInfo)

    const request = {
      "TransactionType": "Payment",
      "Destination": "rKJYFcS28vZW4X17SVzbCeiLN7PaWfSukX",
      "Amount": "50000000"
    }
    const payload = await Sdk.payload.create(request, true)
    console.log(payload)
  // }
  
  return {
    statusCode: 200,
    body: JSON.stringify(payload)
  }
}