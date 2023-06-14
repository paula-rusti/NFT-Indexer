const amqp = require('amqplib');
const {RabbitClient} = require("../rabbit/RabbitClient");
const {CrawlerFactory} = require("./CrawlerFactory");

class CrawlRequestListener {
    constructor() {
        this.queue = 'jobs_queue';
        this.rabbitClient = new RabbitClient('amqp://localhost')
        this.crawlerFactory = new CrawlerFactory();
    }

    async listen() {
        this.rabbitClient.connect().then(() => {
        this.rabbitClient.consumeMessage('jobs_queue', (message) => {
            console.log('Received message:', message);
            let parsedMessage = JSON.parse(message);
            let job_id = parsedMessage.job_id;
            let contract_address = parsedMessage.contract_address;
            let token_ids = parsedMessage.token_ids;
            this.crawlerFactory.createCrawler(job_id, contract_address, token_ids);
            this.crawlerFactory.startCrawlers();    // todo method to start a specific crawler
        });
    });

    }
}

listner = new CrawlRequestListener();
listner.listen();