'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EstadoSchema extends Schema {
  up () {
    this.create('estados', (table) => {
      table.increments()
      table.integer('paise_id').unsigned().references('id').inTable('paises')
      table.string('nombre', 100).notNullable()
    })
  }

  down () {
    this.drop('estados')
  }
}

module.exports = EstadoSchema
