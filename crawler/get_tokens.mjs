import {TokenRepository} from "../repository/TokenRepository.js";
import fetch from 'node-fetch';
import _ from 'lodash';

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
//     `https://api.opensea.io/api/v1/assets?asset_contract_address=${WALLET_ADDRESS}&cursor=LXBrPTMwOTgxNDMzOQ==`,
//     options,
// ).then(response => response.json());
//
// console.log(collectionResponse);

const pickProperties = (array, props) => {
    return _.map(array, obj => _.pick(obj, props));
};

async function getTokens(url) {
    // fetch tokens until no more pages
    let tokens = [];
    let nextPage = url;
    let current_url = `https://api.opensea.io/api/v1/assets?asset_contract_address=${WALLET_ADDRESS}`

    const tokenRepository = new TokenRepository();
    await tokenRepository.createTableIfNotExists()

    while (nextPage) {
        if (nextPage !== url) {
            current_url = `https://api.opensea.io/api/v1/assets?asset_contract_address=${WALLET_ADDRESS}&cursor=${nextPage}`
        }
        const response = await fetch(current_url, options)
        if (response.ok) {
            const result = await response.json();
            const assets = result.assets || [];
            let selectedData = pickProperties(assets, ['token_id', 'name', 'description'])

            for (const item of selectedData) {
                await tokenRepository.insertToken(item);

            }

            console.log(selectedData);
            tokens.push(...assets);
            nextPage = result.next || null;
            console.log(`nextPage: ${nextPage}`)
        } else {
            return null;
        }
    }
    return tokens;
}

async function getTokenData(contractId, tokenId) {
    // contractId = '0xc7df86762ba83f2a6197e1ff9bb40ae0f696b9e6'
    // tokenId = '8652'
    const url = `https://api.opensea.io/api/v1/asset/${contractId}/${tokenId}`
    const response = await fetch(
    url,
    options,
    ).then(response => response.json());
    let selectedData = _.pick(response, 'token_id', 'name', 'description', 'asset_contract.address')
    console.log(selectedData)
    return selectedData
}

// getTokens(url)
getTokenData('0xc7df86762ba83f2a6197e1ff9bb40ae0f696b9e6', '8652');