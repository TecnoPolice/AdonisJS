'use strict'
const user = use('App/Models/User')
const Database = use('Database')
class UserController {

    async show({ auth, params }){
      const users = await Database.from('users').where('id', params.id)
        try {
            await auth.check()
            return {user: users}
          } catch (error) {
            return {message: 'Você não está autenticado !'}
          }
    }
}

module.exports = UserController
