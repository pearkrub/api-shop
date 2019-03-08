const { ServiceProvider } = require('@adonisjs/fold')

class AppProvider extends ServiceProvider {
    async boot() {
        const Response = use('Adonis/Src/Response')
        const responses =
        {
            200: 'OK',
            400: 'badRequest',
            401: 'unauthorized',
            403: 'forbidden',
            404: 'notFound'
        }

        Response.macro('customResponse', (status, data) => {
            const reponse = {
                status: {
                    code: status,
                    status: responses[status] ? responses[status] : 'OK'
                },
                data: data
            }
            return reponse
        })
    }
}

module.exports = AppProvider