'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Paise extends Model {
    estado () {
        return this.hasMany('App/Models/Estado')
    }
}

module.exports = Paise
