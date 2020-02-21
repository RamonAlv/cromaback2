'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CromaNn extends Model {
    muestra(){
        return this.belongsTo('App/Models/Muestra')
    }
    user(){
        return this.belongsTo('App/Models/User')
    }
}

module.exports = CromaNn
