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

const url = `https://api.opensea.io/api/v1/assets?asset_contract_address=${WALLET_ADDRESS}`

// const collectionResponse = await fetch(
//     `https://api.opensea.io/api/v1/assets?asset_contract_address=${WALLET_ADDRESS}`,
//     options,
// ).then(response => response.json());

async function getTokens(url) {
    // fetch tokens until no more pages
    let tokens = [];
    let nextPage = url;

    while (nextPage) {
        const response = await fetch(nextPage, options)
        if (response.ok) {
            const result = await response.json();
            const assets = result.assets || [];
            tokens.push(...assets);
            nextPage = result.next || null;
        } else {
            return null;
        }
    }
    return tokens;
}
// todo: define type for token metadata

getTokens(url)