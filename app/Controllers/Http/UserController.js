'use strict'
const user = use('App/Models/User')
const Database = use('Database')
class UserController {
    // Fução que mostra as informações de um usuário escolhido.
    async show({ auth, params }){
      try {
        // Verificando se o usuário está autenticado.
        await auth.check()
      } catch (error) {
        return {message: 'Você não está autenticado !'}
      }
      // Buscando no banco de dados o usuário que tem o ID informado pela URL.
      const users = await Database.from('users').where('id', params.id)
      // Retornando o usuário informado.
      return {user: users}
    }
}

module.exports = UserController
