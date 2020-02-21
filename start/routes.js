'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Route = use('Route')

//USERS
Route.resource('api/v2/users','UserController').apiOnly()
Route.post('api/v2/login','UserController.login')
Route.get('api/v2/activos','UserController.showActivos')
Route.get('api/v2/lideres','UserController.showLider')
Route.get('api/v2/seguidores/:id','UserController.showSeguidores')
Route.put('api/v2/email/:email','UserController.showEmail')
Route.get('api/v2/user/lotes/:id','UserController.showLotesActivos')
Route.get('api/v2/user/lotesEli/:id','UserController.showLotesEliminados')
Route.put('api/v2/user/img/:id','UserController.updateimg')
Route.get('api/v2/inactivos','UserController.showInActivos')
Route.get('api/v2/logs/:id','UserController.showLogs')
Route.put('api/v2/actemail/:token','UserController.Actemail')

//Paises, Estados y Municipios
Route.resource('api/v2/paises','PaiseController').apiOnly()
Route.resource('api/v2/estados','EstadoController').apiOnly()
Route.resource('api/v2/municipios','MunicipioController').apiOnly()

//Lotes
Route.resource('api/v2/lotes','LoteController').apiOnly()
Route.get('api/v2/lote/muestras/:id','LoteController.showMuestras')

//Croma
Route.resource('api/v2/cromann','CromaNnController').apiOnly()
Route.get('api/v2/todas/muestras','CromaNnController.AllMuestras')
Route.put('api/v2/croma/img/:id','CromaNnController.updateimg')