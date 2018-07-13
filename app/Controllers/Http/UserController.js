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
          await auth.check()
       } catch (error){
         return {message: 'Você não está autenticado !'}
       }
       const affectedRows = await Database
       .table('users')
       .where('id', params.id)
       .del()
      if(affectedRows > 0){
        return {message: 'Usuário deletado com sucesso !'}
      }else{
        return {message: 'error'}
      }
    }
}

module.exports = UserController
