const fs = require('fs');
const {JobRepository} = require("../repository/JobRepository");

const jobRepository = new JobRepository();

// todo add winston logger

process.on('message', async (message) => {
    if (message.action === 'start') {
        console.log(`Child process received args: ${message.job_id} -- ${message.contract_address} -- ${message.token_ids}`)
        await startCrawling(message.job_id, message.contract_address, message.token_ids);
    } else if (message.action === 'stop') {
        stopCrawling();
    }
});

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
}

function stopCrawling() {
    // Code to stop the crawling job process
    console.log(`Stopping crawling job: ${process.argv[2]}`);
}
