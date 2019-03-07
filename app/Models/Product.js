'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const User = use('App/Models/User')
class Product extends Model {
    user() {
        return this.belongsTo(User)
    }
}

module.exports = Product
