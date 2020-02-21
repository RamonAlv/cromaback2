'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Lote extends Model {
    localizacion(){
        return this.belongsTo('App/Models/Localizacione')
    }
    users(){
        return this.belongsTo('App/Models/User')
    }
    muestras(){
        return this.hasMany('App/Models/Muestra')
    }

}

module.exports = Lote
