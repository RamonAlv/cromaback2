'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Estado extends Model {
    pais () {
        return this.belongsTo('App/Models/Paise')
    }
    municipio () {
        return this.hasMany('App/Models/Municipio')
    }
}

module.exports = Estado
