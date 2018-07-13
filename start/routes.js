'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.post('/register', 'AuthController.register').formats(['json'])

Route.post('/auth', 'AuthController.authenticate').formats(['json'])

Route.get('users/:id', 'UserController.show').middleware('auth').formats(['json'])

Route.get('users/:id/delete', 'UserController.delete').middleware('auth').formats(['json'])

Route.get('roles/setup', 'RoleController.setup').middleware('auth').formats(['json'])

