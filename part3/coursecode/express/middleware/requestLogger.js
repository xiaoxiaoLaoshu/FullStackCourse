module.exports.requestLogger = (request, response, next) => {
    console.log('Method', request.method)
    console.log('Path', request.path)
    console.log('Body', request.body)
    console.log("----");

    next()
}

module.exports.unknownEndpoint = (request, response, next) => {
    response.status(404).send({
        error: 'unkonwn endpoint'
    })
}
