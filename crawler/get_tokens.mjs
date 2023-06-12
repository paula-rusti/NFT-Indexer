import fetch from 'node-fetch';

const apiKey = process.env.OPENSEA_API_KEY;
const WALLET_ADDRESS = process.env.WALLET_ADDRESS;
const options = {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        // Do not expose your API key in the browser
        'X-API-KEY': apiKey,
    },
};

const collectionResponse = await fetch(
    `https://api.opensea.io/api/v1/assets?asset_contract_address=${WALLET_ADDRESS}`,
    options,
).then(response => response.json());

// console.log(typeof(collectionResponse))
console.log(collectionResponse);