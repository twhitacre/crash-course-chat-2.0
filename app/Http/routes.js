'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

// Welcome / Home Page Routes
Route.get('/', 'GuestController.welcome')

// Admin Only Routes (Stats, Guests etc)
Route.get('/stats', 'StatsController.index').middleware('auth')

// Auth Routes
Route.group('auth', () => {
  Route.get('/login', 'AuthController.login').middleware('googleURL')
  Route.get('/logout', 'AuthController.logout')
  Route.get('/google/callback', 'AuthController.callback').middleware('googleLogin')
}).prefix('/auth')

// Guest Routes
Route.group('guests', () => {
  Route.get('/', 'GuestController.index').middleware('auth')
  Route.get('/:id', 'GuestController.show').middleware('auth')
}).prefix('/guests')

// Event Routes
Route.group('events', () => {
  Route.get('/:id', 'EventController.show').as('event')
  Route.get('/', 'EventController.index').middleware('auth')
  Route.post('/store', 'EventController.store').middleware('auth')
  Route.get('/export/:id', 'EventController.export').middleware('auth')
  Route.get('/delete/:id', 'EventController.destroy').middleware('auth')
}).prefix('/events')
Route.get('/create').render('events/events-new').middleware('auth')

// Guest Routes
Route.post('/register', 'GuestController.store')

// Errors
Route.get('/errors/employee').render('errors/employee')