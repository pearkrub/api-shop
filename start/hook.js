const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
    const Response = use('Adonis/Src/Response')
    const formatResponse = use('App/Helpers/FormatResponse')
  
    const responses = [
      {status: 200, name: 'ok'},
      {status: 400, name: 'badRequest'},
      {status: 401, name: 'unauthorized'},
      {status: 403, name: 'forbidden'},
      {status: 404, name: 'notFound'}
    ]
    console.log(responses)
    responses.forEach((res) => {
  
      Response.macro(res.name, function (data, overrideStatus) {
        this.status(overrideStatus || res.status).json(formatResponse(data, {defaultMsg: res.name}))
      })
    })
})