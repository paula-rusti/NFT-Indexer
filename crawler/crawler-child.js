const fs = require('fs');

const logFile = './crawler_logs.txt';

process.on('message', (message) => {
    if (message.action === 'start') {
        startCrawling();
    } else if (message.action === 'stop') {
        stopCrawling();
    }
});

function startCrawling() {
    // Code to start the crawling job process
    let content = `Starting crawling job: ${process.argv[2]}\n`;
    fs.appendFile(logFile, content, (err) => {
        if (err) {
            console.error('Error appending to file:', err);
        } else {
            console.log('Content appended to file successfully.');
        }
    });
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
