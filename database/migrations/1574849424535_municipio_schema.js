'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MunicipioSchema extends Schema {
  up () {
    this.create('municipios', (table) => {
      table.increments()
      table.integer('estado_id').unsigned().references('id').inTable('estados')
      table.string('nombre', 254).notNullable()
    })
  }

  down () {
    this.drop('municipios')
  }
}

module.exports = MunicipioSchema
