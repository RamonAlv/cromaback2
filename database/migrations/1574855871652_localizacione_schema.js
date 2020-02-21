'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LocalizacioneSchema extends Schema {
  up () {
    this.create('localizaciones', (table) => {
      table.increments()
      // table.string('nombre', 100).notNullable()
      table.string('latitud', 254).notNullable()
      table.string('longitud', 254).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('localizaciones')
  }
}

module.exports = LocalizacioneSchema
