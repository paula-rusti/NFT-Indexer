const { v4: uuidv4 } = require('uuid');
const {RabbitClient} = require("../rabbit/RabbitClient");


const rabbitClient = new RabbitClient('amqp://localhost')

module.exports = function (app) {

    app.get('/:id', (req, res) => {

        const filtro = req.query.filtro

        return res.status(404).send(false)

    })

    app.post('/crawler', (req, res) => {
        const uuid = uuidv4()
        console.log("Received request to create crawler job with generated id: " + uuid)
    rabbitClient.connect().then(() => {
        rabbitClient.createQueue('jobs_queue');
        rabbitClient.sendMessage('jobs_queue', 'Crawler job request with id: ' + uuid);
    });
        const body = req.body
        return res.status(404).send(false)
    })

}