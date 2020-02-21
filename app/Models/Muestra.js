'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Muestra extends Model {
    lote() {
        return this.belongsTo('App/Models/Lote')
    }
    cromann() {
        return this.hasMany('App/Models/CromaNn')
    }
    localizacion() {
        return this.belongsTo('App/Models/Localizacione')
    }
}
module.exports = Muestra
