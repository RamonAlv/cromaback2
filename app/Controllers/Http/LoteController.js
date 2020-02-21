'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with lotes
 */
const Lotes = use('App/Models/Lote')
const Localizacion = use('App/Models/Localizacione')
const Logs = use('App/Models/Log');

class LoteController {
  /**
   * Show a list of all lotes.
   * GET lotes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const lote = await Lotes.query().with('localizacion').fetch()
    const log = new Logs()
    log.Actividad = "Seleccion de todos los lotes"
    await log.save()
    
    return lote
  }

  /**
   * Render a form to be used for creating a new lote.
   * GET lotes/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new lote.
   * POST lotes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      const data = request.all()
      const lote = new Lotes()
      const localizacion = new Localizacion()
      const log = new Logs()

      localizacion.latitud = data.latitud
      localizacion.longitud = data.longitud
      await localizacion.save()


      log.Actividad = "Guardado de Localización"
      await log.save()

      lote.user_id = data.user_id
      lote.municipio_id = data.municipio_id
      lote.localizacione_id = localizacion.id
      lote.nombre = data.nombre
      lote.uso_suelo = data.uso_suelo
      await lote.save()

      log.Actividad = "Lote creado"
      await log.save()

    } catch (error) {
      return response.send(error)
    }
  }

  /**
   * Display a single lote.
   * GET lotes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const lote = await Lotes.findBy('id', params.id)
    const lotelocalizacion = await lote.localizacion().fetch()
    return response.send({lote, lotelocalizacion})
  }

  async showMuestras ({ params, request, response, view }) {
    const lote = await Lotes.findBy('id', params.id)
    const lotemuestra = await lote.muestras().with('cromann').fetch()
    return response.send(lotemuestra)
  }

  /**
   * Render a form to update an existing lote.
   * GET lotes/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update lote details.
   * PUT or PATCH lotes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {
      const data = request.all()
      const lote = await Lotes.findBy('id', params.id)

      lote.merge(data)
      lote.save()

      return response.send(lote)
    } catch (error) {
      return response.send(error)
    }
  }

  /**
   * Delete a lote with id.
   * DELETE lotes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = LoteController
