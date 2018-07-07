'use strict'

const { validate }  = use('Validator')

const User          = use('App/Models/User')
const Database      = use('Database')


class AuthController {


    // Registra um usuário.
    async register({ request }){
        // Recebe os campos passados na requisição.
        const data = request.only(['username', 'email', 'password'])
        // Criando uma regra de validação para os campos.
        const rules = {
            username: 'required',
            email: 'required|email|unique:users,email',
            password: 'required'
        }
        // Contando os  usuários com o mesmo username informado.
        const check_username = await Database.from('Users').where({
            username: data.username
        }).getCount()
        // Contando os usuários com o mesmo email informado.
        const check_email = await Database.from('Users').where({
            email: data.email
        }).getCount()
        // Verificando se existe algum usuário com o username ou email igual ao informado.
        if(check_email > 0 || check_username > 0){
            return {
                error: 'Usuário ou Email já cadastrado !',
            }
        }else{
            // Validando os campos.
            const validation = await validate( data , rules)
            if(validation.fails()){
                return { error: validation.messages()}
            }else{
                // Criando o usuário.
                const user = await User.create(data)
                return user
            }
        }
    }



    // Autentica um usuário já cadastrado.
    async authenticate({ request, auth }){
        // Recebe os campos passados na requisição.
        const data = request.all()
        // Criando uma regra de validação para os campos.
        const rules = {
            email: 'required|email',
            password: 'required'
        }
        //Validando os campos.
        const validation = await validate(data, rules)
        // Verificando se a validação foi bem sucedida.
        if(!validation.fails()){
            // Fazendo a autenticação e obtendo o token de acesso.
            const token = await auth.attempt(data.email, data.password)
            // Retornando o token de acesso.
            return token

        }else{
            // Mensagem de erro, a validação falhou.
            return {error: validation.messages()}
        }
    }
}

module.exports = AuthController
