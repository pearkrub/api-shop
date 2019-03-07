'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/login', 'UserController.login')
  .as('users.login')
  .middleware('guest').prefix('users')

Route.group(() => {
  Route.get('/profile', 'UserController.profile')
  Route.post('/logout', 'UserController.logout')
}).middleware('auth').prefix('users')

Route.group(() => {
  Route.get('/', 'ProductController.index')
  Route.post('/', 'ProductController.store')
}).middleware('auth').prefix('products')