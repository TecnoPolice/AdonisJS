'use strict'

class UserController {

    async show({ auth }){
        try {
            await auth.check()
            return {message: 'Você está autenticado !'}
          } catch (error) {
            return {message: 'Você não está autenticado !'}
          }
    }
}

module.exports = UserController
