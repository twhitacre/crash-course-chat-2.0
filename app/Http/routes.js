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

// Main Routes for Pages
Route.on('/').render('welcome')
Route.get('/rooms', 'RoomController.index').middleware('auth')
Route.get('/rooms/new').render('rooms-new').middleware('auth')
Route.get('/rooms/:id', 'RoomController.show')
Route.post('/rooms/new', 'RoomController.store').middleware('auth')
Route.get('/login', 'AuthController.login').middleware('googleURL')
Route.get('/logout', 'AuthController.logout')
Route.get('/auth/google/callback', 'AuthController.callback').middleware('googleLogin')
Route.get('/rooms/export/:id', 'RoomController.export').middleware('auth')

// Auth Routes
Route.group('auth', () => {
  Route.get('/verify', 'AuthController.verify').middleware('auth')
  // Route.get('/url', 'AuthController.url').middleware('googleURL')
  
}).prefix('/auth')


// Room Routes
Route.group('rooms', () => {
  // Route.get('/', 'RoomController.index').middleware('auth')
  // Route.post('/', 'RoomController.store')
  // Route.get('/:id', 'RoomController.show')
  // Route.put('/:id', 'RoomController.update').middleware('auth')
  
}).prefix('/rooms')


// Guest Routes
Route.post('/register', 'GuestController.store')