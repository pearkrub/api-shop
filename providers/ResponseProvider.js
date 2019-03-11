'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class ResponseProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register() {
    //
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
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

module.exports = ResponseProvider
