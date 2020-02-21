'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
const User = use('App/Models/User');
const Logs = use('App/Models/Log');
const Helpers = use('Helpers');

class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const user = await User.query().with('municipio').fetch()
    const log = new Logs()
    log.Actividad = "Seleccion de todos los usuarios"
    await log.save()
    return user;
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

    try {
      const date = new Date()
      const data = request.all()
      const user = new User()

      const log = new Logs()
      log.user_id = user.id
      log.Actividad = "Creacion de usuario"
      await log.save()

      user.nombre = data.nombre
      user.municipio_id = data.municipio_id
      user.ape_p  = data.ape_p
      user.ape_m  = data.ape_m
      user.email = data.email
      user.password = data.password
      user.direccion = data.direccion
      user.telefono = data.telefono
      user.rol = data.rol
      user.token_activacion = '-x'+(Math.floor(Math.random() * 100) + 1)+data.email+'-a5s2L'+(Math.floor(Math.random() * 1000) + 1)+'ESI'+(Math.floor(Math.random() * 10000) + 1)+'AC-'
      await user.save()

      return response.send(user)
      
    } catch (error) {
      return response.send(error)
    }

  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const user = await User.findBy('id', params.id)
    const userMuni = await user.municipio().fetch()
    const userEstado = await userMuni.estado().fetch()
    const userPais = await userEstado.pais().fetch()
    const log = new Logs()
    log.user_id = user.id
    log.Actividad = "Seleccion de un usuario"
    await log.save()
    return response.send({user, userMuni, userEstado, userPais})
  }

  async showEmail ({ params, request, response, view }) {
    const user = await User.findBy('email', params.email)
    const data = request.all()
    if(user){
      if(user.conf_correo && user.activo){
        if(data.token_activacion){
          data.token_activacion = '-x'+(Math.floor(Math.random() * 100) + 1)+user.email+'-a5s2L'+(Math.floor(Math.random() * 1000) + 1)+'ESI'+(Math.floor(Math.random() * 10000) + 1)+'AC-'
          user.merge(data)
          await user.save()
        }
        const log = new Logs()
        log.user_id = user.id
        log.Actividad = "Seleccion de un usuario"
        await log.save()
        return response.send(user)
      }
      return response.send({message:"La cuenta aun no ha sido confirmada o activada por el administrador"})
    }
    return response.send({message:"La cuenta no existe"})
  }

  async showLogs ({ params, request, response, view }) {
    const user = await User.findBy('id', params.id)
    if(user.rol == 1){
      const lo = Logs.all();
      return lo
    }
    return response.send("Acceso denegado")
  }

  async showLotesActivos ({ params, request, response, view }) {
    const user = await User.findBy('id', params.id)
    const userLotes = await user.lotes().where('eliminado', '=', false).with('localizacion').fetch()
    const log = new Logs()
    log.user_id = user.id
    log.Actividad = "Seleccion de lotes Activos por usuario"
    await log.save()
    return response.send(userLotes)
  }

  async showLotesEliminados ({ params, request, response, view }) {
    const user = await User.findBy('id', params.id)
    const userLotes = await user.lotes().where('eliminado', '=', true).fetch()
    const log = new Logs()
    log.user_id = user.id
    log.Actividad = "Seleccion de lotes inactivos por usuario"
    await log.save()
    return response.send({userLotes})
  }

  async showActivos ({ params, request, response, view }) {
    const user = await User.query().where('conf_correo', '=', true).where('activo', '=', true).where('rol', '!=', 1).fetch()
    const log = new Logs()
    log.user_id = user.id
    log.Actividad = "Seleccion de usuarios activos"
    await log.save()
    return response.send({user})
  }

  async showLider ({ params, request, response, view }) {
    const user = await User.query().where('conf_correo', '=', true).where('activo', '=', true)
    .where('rol', '=', 3).with('municipioEsPa').fetch()
    const log = new Logs()
    log.user_id = user.id
    log.Actividad = "Seleccion de usuarios Lideres"
    await log.save()
    return response.send(user)
  }

  async showSeguidores ({ params, request, response, view }) {
    const user = await User.query().where('user_id', '=', params.id).where('conf_correo', '=', true)
    .where('activo', '=', true).where('rol', '=', 4).with('municipioEsPa').fetch()
    const log = new Logs()
    log.user_id = user.id
    log.Actividad = "Seleccion de usuarios Lideres"
    await log.save()
    return response.send(user)
  }

  async showInActivos ({ params, request, response, view }) {
    const user = await User.query().where('conf_correo', '=', true).where('activo', '=', false).fetch()
    const log = new Logs()
    log.user_id = user.id
    log.Actividad = "Seleccion de usuarios inactivos"
    await log.save()
    return response.send({user})
  }

  /**
   * Render a form to update an existing user.
   * GET users/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {
      const data = request.all()
      const user = await User.findBy('id', params.id)

      if(user){ 
        user.merge(data)
        await user.save()
        const log = new Logs()
        log.user_id = user.id
        log.Actividad = "Actualización de un usuario"
        await log.save()
        return response.send({user, message: 'usuario actualizado exitosamente' ,status:201})
      }
      return response.send({message: "El usuario que desea actualizar no existe", status: 404})
    } catch (error) {
      return response.send(error)
    }
  }

  async updateimg ({ params, request, response }) {
    try {
      const data = request.all()
      const user = await User.findBy('id', params.id)

      if(user){ 
        const date = new Date()
        const mes = date.getMonth()
        const dia = date.getDay()
        const año = date.getFullYear()
        const hora = date.getHours()
        const minuto = date.getMinutes()
        const segundos = date.getSeconds()
        const perfil = request.file('imgperfil')
        user.imgperfil = dia+'-'+mes+'-'+año+'_'+hora+'-'+minuto+'-'+segundos+'.'+perfil.subtype
        
        await perfil.move(Helpers.publicPath('users/'+user.id), {
          name: user.imgperfil
        })

        user.imgperfil = '/users/'+user.id+'/'+user.imgperfil
        await user.save()
        return response.send({user, message: 'usuario actualizado exitosamente' ,status:201})
      }
      return response.send({message: "El usuario que desea actualizar no existe", status: 404})
    } catch (error) {
      return response.send(error)
    }
  }

  async Actemail ({ params, request, response }) {
    try {
      const data = request.all()
      const user = await User.findBy('token_activacion', params.token)
      
      if(user){ 
        user.merge(data)
        await user.save()
        const log = new Logs()
        log.user_id = user.id
        log.Actividad = "Actualizacion estatus de usuario"
        await log.save()
        return response.send({user, message: 'usuario actualizado exitosamente' ,status:201})
      }
      return response.send({message: "El usuario que desea actualizar no existe", status: 404})
    } catch (error) {
      return response.send(error)
    }
  }

  async login({request,response,auth }){
    const data = request.all();
    const user = await User.findBy('email', data.email)
    const token = await auth.attempt(data.email,data.password);
    if(user){
      await user.save()
      const log = new Logs()
      log.user_id = user.id
      log.Actividad = "Login Exitoso"
      await log.save()
      return response.send({token, user, status: 202})
    }
    const log = new Logs()
    log.user_id = user.id
    log.Actividad = "Login Fallido"
    await log.save()
    return response.send({message:
      {error:'This user does not exist! or your password is incorrect, please try again.', 
      status: 203}})
  }

}

module.exports = UserController
