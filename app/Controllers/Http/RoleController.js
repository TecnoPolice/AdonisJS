'use strict'

const Role = use('Adonis/Acl/Role')

class RoleController {

  async setup({ auth }){
    try{
      await auth.check()
    } catch (error){
      return {message: 'Você não está autenticado !'}
    }

    try{
      const roleAdmin = new Role()
      roleAdmin.name = 'Administrator'
      roleAdmin.slug = 'administrator'
      roleAdmin.description = 'manage administration privileges'
      await roleAdmin.save()

      const roleModerator = new Role()
      roleModerator.name = 'Moderator'
      roleModerator.slug = 'moderator'
      roleModerator.description = 'manage moderator privileges'
      await roleModerator.save()
    } catch (error){
      console.log(error)
      return {erro: error.message()}
    }


  }
}

module.exports = RoleController
