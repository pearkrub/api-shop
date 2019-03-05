'use strict'

class UserController {
    async login({ auth, request }) {
        const { email, password } = request.all()
        const token = await auth.attempt(email, password)

        return token
    }

    async profile({ auth }) {
        return auth.getUser()
    }

    async logout({ auth }) {
        const token = auth.getAuthHeader()
        await auth
            .authenticator('api')
            .revokeTokens([token])
    }
}

module.exports = UserController
