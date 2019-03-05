'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')
const User = use('App/Models/User')

class UserSeeder {
  async run() {
    let users = await User.getCount()
    if(users == 0) {
      const user = await User
        .create({
          username: 'admin',
          email: 'praibool.piak@gmail.com',
          password: 'password'
        })
    }
  }
}

module.exports = UserSeeder
