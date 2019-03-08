'use strict'

const Product = use('App/Models/Product')
const { validate } = use('Validator')
const Helpers = use('Helpers')
const CustomException = use('App/Exceptions/CustomException')

class ProductController {
    async index({ auth, response }) {
        const user = await auth.getUser()
        const products = await Product.query().where('user_id', user.id).with('user').fetch()

        return response.customResponse(200, products)
    }

    async show({ auth, response, params }) {
        const user = await auth.getUser()
        const product = await Product.query()
            .where('user_id', user.id)
            .where('id', params.id).first()
        if (!product) {
            throw new CustomException("Product not fount.", 404, 404)
        }
        return response.customResponse(200, product)
    }

    async store({ auth, request, response }) {
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
        let fileName = null

        if (image) {
            fileName = `${new Date().getTime()}.${image.subtype}`
            await image.move(Helpers.tmpPath('uploads'), {
                name: fileName,
                overwrite: true
            })

            if (!image.moved()) {
                return image.error()
            }
        }

        const user = await auth.getUser()

        let object = {
            name: request.input('name'),
            price: request.input('price'),
            user_id: user.id,
            image: fileName
        }

        const product = await Product.create(object)

        return response.customResponse(201, product)
    }

    async destroy({ params, response }) {
        const product = await Product.find(params.id)
        if (!product) {
            throw new CustomException("Product not fount.", 404, 404)
        }
        product.delete()
        response.status(204)
    }

    async update({ params, request, response, auth }) {

        const product = await Product.find(params.id)
        const user = await auth.getUser()
        product.user_id = user.id
        if (request.input('name')) {
            product.name = request.input('name')
        }
        if (request.input('price')) {
            product.price = request.input('price')
        }
        if (request.file('image')) {
            const image = request.file('image', {
                types: ['image'],
                size: '2mb'
            })

            if (image) {
                const fileName = `${new Date().getTime()}.${image.subtype}`
                await image.move(Helpers.tmpPath('uploads'), {
                    name: fileName,
                    overwrite: true
                })

                if (!image.moved()) {
                    return image.error()
                }
                product.image = fileName
            }

        }
        await product.save()

        return response.customResponse(202, product)

    }
}

module.exports = ProductController
