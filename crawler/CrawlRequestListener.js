const amqp = require('amqplib');
const {RabbitClient} = require("../rabbit/RabbitClient");

class CrawlRequestListener {
    constructor() {
        this.queue = 'jobs_queue';
        this.rabbitClient = new RabbitClient('amqp://localhost')
    }

    async listen() {
        this.rabbitClient.connect().then(() => {
        this.rabbitClient.consumeMessage('jobs_queue', (message) => {
            console.log('Received message:', message);
        });
    });

    }
}

listner = new CrawlRequestListener();
listner.listen();