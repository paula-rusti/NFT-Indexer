const {fork} = require('child_process');
const fs = require('fs');

const logFile = './crawler_logs.txt';

// here read from the jobs_queue to start the crawling job
class Crawler {
    constructor(job_id, contract_address, token_ids) {
        this.job_id = job_id;
        this.contract_address = contract_address;
        this.token_ids = token_ids;
        this.process = fork('./crawler/crawler-child.js', [job_id]);
    }


    start() {
        this.process.send({
            action: 'start',
            job_id: this.job_id,
            contract_address: this.contract_address,
            token_ids: this.token_ids
        });
        console.log(`Sending start action to crawling job: ${this.job_id}`);
    }

    stop() {
        this.process.send({ action: 'stop' });
        console.log(`Sending stop action to crawling job: ${this.job_id}`);
    }
}

module.exports.Crawler = Crawler;