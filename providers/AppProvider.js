const { ServiceProvider } = require('@adonisjs/fold')

class AppProvider extends ServiceProvider {
    async boot() {
        const Response = use('Adonis/Src/Response')

        Response.macro('customResponse', (status, data) => {
            const reponse = {
                status: {
                    code: status,
                    status: 'success'
                },
                data: data
            }
            return reponse
        })
    }
}

module.exports = AppProvider