'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Localizacione extends Model {
    lote () {
        return this.hasOne('App/Models/Lote')
    }
    muestra() {
        return this.hasOne('App/Models/Muestra')
    }
}

module.exports = Localizacione
