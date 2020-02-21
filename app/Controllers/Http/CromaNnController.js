'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with cromanns
 */
const Muestras = use('App/Models/Muestra')
const CromaNn = use('App/Models/CromaNn')
const Localizacion = use('App/Models/Localizacione')
const Helpers = use('Helpers')
class CromaNnController {
  /**
   * Show a list of all cromanns.
   * GET cromanns
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    // const muestra = CromaNn.query().with('muestra').fetch()
    // return muestra
    const muestras = Muestras.query().with('cromann').fetch()
    return muestras
  }

  async AllMuestras ({ request, response, view }) {
    const muestras = Localizacion.query().with('muestra').fetch()
    
    return muestras
  }

  /**
   * Render a form to be used for creating a new cromann.
   * GET cromanns/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new cromann.
   * POST cromanns
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      const date = new Date()
      const data = request.all()
      const cromann = new CromaNn()
      const muestra = new Muestras()
      const localizacion = new Localizacion()
      
      localizacion.latitud = data.latitud
      localizacion.longitud = data.longitud
      await localizacion.save()
      
      muestra.lote_id = data.lote_id
      muestra.localizacione_id = localizacion.id
      muestra.profundidad = data.profundidad

      await muestra.save()

      cromann.user_id = data.user_id
      cromann.muestra_id = muestra.id
      await cromann.save()

      const imag = request.file('img')
      const mes = date.getMonth()
      const dia = date.getDay()
      const año = date.getFullYear()
      const hora = date.getHours()
      const minuto = date.getMinutes()
      const segundos = date.getSeconds()

      cromann.img = dia+'-'+mes+'-'+año+'_'+hora+'-'+minuto+'-'+segundos+'.'+imag.subtype

      await imag.move(Helpers.publicPath('cromaF/'+cromann.id), {
        name: cromann.img
      })

      cromann.img = '/cromaF/'+cromann.id+'/'+cromann.img
      await cromann.save()

      return response.send({muestra, cromann, status:201})

    } catch (error) {
      return response.send(error)
    }
  }

  /**
   * Display a single cromann.
   * GET cromanns/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const cromann = await CromaNn.findBy('id',params.id)
    const croman = await cromann.muestra().with('localizacion').fetch()
    return response.send({cromann, muestra:croman})
  }

  /**
   * Render a form to update an existing cromann.
   * GET cromanns/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update cromann details.
   * PUT or PATCH cromanns/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {//agregar el identificador aqui
      const data = request.all()
      const cromann = await CromaNn.findBy('id', params.id)
      cromann.merge(data)
      await cromann.save()
      return response.send({mensaje:'Editado correctamente', cromann})
    } catch (error) {
      return response.send(error)
    }
  }
  //Update only image
  async updateimg ({ params, request, response }) {
    try {
      const date = new Date()
      const cromann = await CromaNn.findBy('id', params.id)
      if(cromann){ 
        const imag = request.file('img')
        const mes = date.getMonth()
        const dia = date.getDay()
        const año = date.getFullYear()
        const hora = date.getHours()
        const minuto = date.getMinutes()
        const segundos = date.getSeconds()
        
        cromann.img = dia+'-'+mes+'-'+año+'_'+hora+'-'+minuto+'-'+segundos+'.'+imag.subtype

        await imag.move(Helpers.publicPath('cromaF/'+cromann.id), {
          name: cromann.img
        })

        cromann.img = '/cromaF/'+cromann.id+'/'+cromann.img
        await cromann.save()
        return response.send({cromann, message: 'Imagen agregada exitosamente' ,status:201})
      }
      return response.send({message: "El Croma que desea actualizar no existe", status: 404})
    } catch (error) {
      return response.send(error)
    }
  }

  /**
   * Delete a cromann with id.
   * DELETE cromanns/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = CromaNnController
