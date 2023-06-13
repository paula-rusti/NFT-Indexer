const amqp = require('amqplib');

class RabbitClient {
    constructor(connectionUrl) {
        this.connectionUrl = connectionUrl;
        this.connection = null;
        this.channel = null;
    }

    async connect() {
        try {
            this.connection = await amqp.connect(this.connectionUrl);
            this.channel = await this.connection.createChannel();
            console.log('Connected to RabbitMQ');
        } catch (error) {
            console.error('Failed to connect to RabbitMQ', error);
        }
    }

    async createQueue(queueName) {
        // only creates if it doesn't exist
        try {
            await this.channel.assertQueue(queueName);
            console.log(`Created queue: ${queueName}`);
        } catch (error) {
            console.error(`Failed to create queue: ${queueName}`, error);
        }
    }

    async sendMessage(queueName, message) {
        // message has the following format:
        // {
        //     "job_id": "uuid",
        //     "contract_address": "0x123",
        //     "token_ids": [1, 2, 3],
        // }
        try {
            await this.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
            console.log(`Sent message to queue: ${queueName}`);
        } catch (error) {
            console.error(`Failed to send message to queue: ${queueName}`, error);
        }
    }

    async consumeMessage(queueName, callback) {
        try {
            await this.channel.consume(queueName, (message) => {
                callback(message.content.toString());
                this.channel.ack(message);
            });
            console.log(`Consuming messages from queue: ${queueName}`);
        } catch (error) {
            console.error(`Failed to consume messages from queue: ${queueName}`, error);
        }
    }

    async close() {
        try {
            await this.channel.close();
            await this.connection.close();
            console.log('Closed RabbitMQ connection');
        } catch (error) {
            console.error('Failed to close RabbitMQ connection', error);
        }
    }
}

module.exports.RabbitClient = RabbitClient;
// Usage:
// const rabbitClient = new RabbitClient('amqp://localhost'); // Replace with your RabbitMQ connection URL
// rabbitClient.connect().then(() => {
//     rabbitClient.createQueue('myQueue');
//     rabbitClient.createQueue('myQueue');
//     rabbitClient.sendMessage('myQueue', 'Hello, RabbitMQ!');
//     rabbitClient.consumeMessage('myQueue', (message) => {
//         console.log('Received message:', message);
//     });
// });
