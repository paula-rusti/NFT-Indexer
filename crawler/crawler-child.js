const fs = require('fs');
const {JobRepository} = require("../repository/JobRepository");

const logFile = './crawler_logs.txt';

const jobRepository = new JobRepository();

process.on('message', async (message) => {
    if (message.action === 'start') {
        await startCrawling();
    } else if (message.action === 'stop') {
        stopCrawling();
    }
});

async function startCrawling() {
    // Code to start the crawling job process
    let content = `Starting crawling job: ${process.argv[2]}\n`;
    fs.appendFile(logFile, content, (err) => {
        if (err) {
            console.error('Error appending to file:', err);
        } else {
            console.log('Content appended to file successfully.');
        }
    });
    await jobRepository.createTableIfNotExists();   // shall await those
    await jobRepository.insertJobStatus({job_id: process.argv[2], status: 'started'});
    console.log(`Starting crawling job: ${process.argv[2]}`);
}

function stopCrawling() {
    // Code to stop the crawling job process
    let content = `Stopping crawling job: ${process.argv[2]}\n`;
    fs.appendFile(logFile, content, (err) => {
        if (err) {
            console.error('Error appending to file:', err);
        } else {
            console.log('Content appended to file successfully.');
        }
    });
    console.log(`Stopping crawling job: ${process.argv[2]}`);
}
