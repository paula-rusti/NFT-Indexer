const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./api/endpoints.js']

swaggerAutogen(outputFile, endpointsFiles)