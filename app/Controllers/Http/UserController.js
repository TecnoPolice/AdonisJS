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

    async delete({auth, params}){
      try{
        // Verifica se o usuário está autenticado.
        await auth.check()
      } catch (error){
        return {message: 'Você não está autenticado !'}
       }
      // Deletando o usuário.
      const affectedRows = await Database.table('users').where('id', params.id).del()
      // Verificando se o usuário foi deletado.
      if(affectedRows > 0){
        return {message: 'Usuário deletado com sucesso !'}
      }else{
        return {message: 'error'}
      }
    }
}

module.exports = UserController
