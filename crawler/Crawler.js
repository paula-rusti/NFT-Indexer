const {fork} = require('child_process');
const  {spawn} = require('child_process');
const fs = require('fs');

const logFile = './crawler_logs.txt';

// gonna spawn a new process with makes an api call and populates db
// here read from the jobs_queue to start the crawling job
class Crawler {
    constructor(job_id, contract_address, token_ids) {
        this.job_id = job_id;
        this.contract_address = contract_address;
        this.token_ids = token_ids;
        this.process = fork('./crawler/crawler-child.js', [job_id]);
        // start a python process also
        // this.pyProcess = spawn('python', ['./real_crawler/python_script.py', job_id, contract_address, token_ids]);
    }


    start() {
        this.process.send({
            action: 'start',
            job_id: this.job_id,
            contract_address: this.contract_address,
            token_ids: this.token_ids
        });
        console.log(`Sending start action to crawling job: ${this.job_id}`);

        // listen to stdout of the python process
        // let output = '';
        // this.pyProcess.stdout.on('data', (data) => {
        //     output += data;
        // });

        // Listen to the close event to know when the Python process has exited
        // this.pyProcess.on('close', (code) => {
        //     if (code === 0) {
        //         console.log('Received output from Python:', output);
        //     } else {
        //         console.error('Python process exited with error');
        //     }
        // });
    }

    stop() {
        this.process.send({ action: 'stop' });
        console.log(`Sending stop action to crawling job: ${this.job_id}`);
    }
}

module.exports.Crawler = Crawler;