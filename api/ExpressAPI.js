const express = require('express');

class ExpressAPI {
    constructor() {
        this.app = express();
        this.port = 3000; // default port
        this.setupMiddlewares();
        this.setupRoutes();
    }

    setupMiddlewares() {
        // Add any required middlewares here
        this.app.use(express.json()); // example: JSON body parser
        // You can add more middlewares as per your needs
    }

    setupRoutes() {
        // Example route with parameters
        const routes = require('./endpoints');
        this.app.use('/users', routes);
        // todo routes cannot be registered like this
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`ExpressAPI is running on port ${this.port}`);
        });
    }
}

// Usage:
const api = new ExpressAPI();
api.start();
