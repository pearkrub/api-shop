'use strict'

class UserController {
    async login({ auth, request }) {
        const { email, password } = request.all()
        const token  = await auth.attempt(email, password)

        return token
    }

    async profile({ auth }) {
        return auth.getUser()
    }
}

module.exports = UserController
