'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Municipio extends Model {

    user () {
        return this.hasMany('App/Models/User')
    }
    
    estado (){
        return this.belongsTo('App/Models/Estado')
    }
    estadoPa (){
        return this.belongsTo('App/Models/Estado').with('pais')
    }
}

module.exports = Municipio
