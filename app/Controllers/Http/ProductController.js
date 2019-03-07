'use strict'

const Product = use('App/Models/Product')
const { validate } = use('Validator')
const Helpers = use('Helpers')

class ProductController {
    async index({ auth }) {
        const user = await auth.getUser()
        const products = await Product.query().where('user_id', user.id).with('user').fetch()

        return products
    }

    async store({ auth, request }) {
        const rules = {
            name: 'required',
            price: 'required'
        }
        const validation = await validate(request.all(), rules)

        if (validation.fails()) {
            return validation.messages()
        }
        const image = request.file('image', {
            types: ['image'],
            size: '2mb'
        })
        const fileName = `${new Date().getTime()}.${image.subtype}`
        await image.move(Helpers.tmpPath('uploads'), {
            name: fileName,
            overwrite: true
        })

        if (!image.moved()) {
            return image.error()
        }

        const user = await auth.getUser()

        let object = {
            name: request.input('name'),
            price: request.input('price'),
            user_id: user.id,
            image: fileName
        }

        const product = await Product.create(object)

        return product.toJSON()
    }
}

module.exports = ProductController
