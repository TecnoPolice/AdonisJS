'use strict'

const { validate } = use('Validator')
const User = use('App/Models/User')
const Database = use('Database')


class AuthController {
    async register({ request }){

        const data = request.only(['username', 'email', 'password'])

        const rules = {
            username: 'required',
            email: 'required|email|unique:users,email',
            password: 'required'
        }

        const check_username = await Database.from('Users').where({
            username: data.username
        }).getCount()

        const check_email = await Database.from('Users').where({
            email: data.email
        }).getCount()

        if(check_email > 0 || check_username > 0){
            return {
                error: 'Usuário ou Email já cadastrado !',
            }
        }else{
            const validation = await validate( data , rules)
            if(validation.fails()){
                return { error: validation.messages()}
            }else{
                const user = await User.create(data)
                return user
            }
        }
    }

    async authenticate({ request, auth }){

        const {email, password} = request.all()

        const token = await auth.attempt(email, password)

        return token

    }
}

module.exports = AuthController
