'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with municipios
 */
const Municipios = use('App/Models/Municipio')
const Pais = use('App/Models/Paise')
class MunicipioController {
  /**
   * Show a list of all municipios.
   * GET municipios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const municipios = Municipios.all()
    return municipios
  }

  /**
   * Render a form to be used for creating a new municipio.
   * GET municipios/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new municipio.
   * POST municipios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single municipio.
   * GET municipios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const municipio = await Municipios.findBy('id', params.id)
    const municipioestado = await municipio.estado().fetch()
    const pais = await Pais.findBy('id', municipioestado.paise_id)
    return response.send({pais, municipioestado, municipio})
  }

  /**
   * Render a form to update an existing municipio.
   * GET municipios/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update municipio details.
   * PUT or PATCH municipios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a municipio with id.
   * DELETE municipios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = MunicipioController
