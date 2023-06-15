const axios = require("axios");

const fs = require('fs');
const {JobRepository} = require("../repository/JobRepository");
const _ = require('lodash');
const {TokenRepository} = require("../repository/TokenRepository");

const jobRepository = new JobRepository();
const tokenRepository = new TokenRepository()

// todo add winston logger

process.on('message', async (message) => {
    if (message.action === 'start') {
        console.log(`Child process received args: ${message.job_id} -- ${message.contract_address} -- ${message.token_ids}`)
        await startCrawling(message.job_id, message.contract_address, message.token_ids);
    } else if (message.action === 'stop') {
        stopCrawling();
    }
});

const pickProperties = (array, props) => {
    return _.map(array, obj => _.pick(obj, props));
};

async function getTokens(contract_address, token_ids) {
    try {
        const data = { contract_address: contract_address, token_ids: token_ids };

        const response = await axios.post('http://localhost:5000/python-crawler', data);

        const result = response.data;


        console.log('In child --- Received response from Python:', result['processed_data']);

        // keep only some fields
        return pickProperties(result['processed_data'], ['token_id', 'name', 'description']);
    } catch (error) {
        console.error('Error calling Python API:', error);
        return []
    }
}

async function startCrawling(job_id, contract_address, token_ids) {
    // Code to start the crawling job process
    console.log(`Child process received args: ${job_id} -- ${contract_address} -- ${token_ids}`);
    // todo use get tokens to get the token metadata and populate token table
    await jobRepository.createTableIfNotExists();
    await jobRepository.insertJobStatus({
            job_id: job_id, // process.argv[2],
            target_contract: contract_address,
            num_tokens: token_ids.length,
            status: 'started'
        });
    console.log(`Starting crawling job: ${process.argv[2]} -- ${job_id}`);
    let tokens = await getTokens(contract_address, token_ids);
    // here we write them to db
    // must append them the token ids
    const modifiedTokens = tokens.map((item, index) => {
        return { ...item, token_id: index };
    });
    await tokenRepository.insertToken(modifiedTokens);
    console.log(`Child Process received tokens`);
    console.log(tokens);
}

function stopCrawling() {
    // Code to stop the crawling job process
    console.log(`Stopping crawling job: ${process.argv[2]}`);
}

module.exports.getTokens = getTokens;