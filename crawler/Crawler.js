const {fork} = require('child_process');
const fs = require('fs');
const {TokenRepository} = require("../repository/TokenRepository");

const logFile = './crawler_logs.txt';


class Crawler {
    constructor(job_id) {
        this.job_id = job_id;
        this.process = fork('./crawler/crawler-child.js', [job_id]);
    }


    start() {
        this.process.send({action: 'start'});
        let content = `Sending start action to crawling job: ${this.job_id}\n`;
        fs.appendFile(logFile, content, (err) => {
            if (err) {
                console.error('Error appending to file:', err);
            } else {
                console.log('Content appended to file successfully.');
            }
        });
        console.log(`Sending start action to crawling job: ${this.job_id}`);
    }

    stop() {
        this.process.send({ action: 'stop' });
        let content = `Sending stop action to crawling job: ${this.job_id}\n`;
        fs.appendFile(logFile, content, (err) => {
            if (err) {
                console.error('Error appending to file:', err);
            } else {
                console.log('Content appended to file successfully.');
            }
        });
        console.log(`Sending stop action to crawling job: ${this.job_id}`);
    }
}

module.exports.Crawler = Crawler;