module.exports = function (app) {

    app.get('/:id', (req, res) => {

        const filtro = req.query.filtro

        return res.status(404).send(false)

    })

    app.post('/crawler', (req, res) => {

        console.log("Received request to create crawler job")
        const body = req.body

        return res.status(404).send(false)

    })

}