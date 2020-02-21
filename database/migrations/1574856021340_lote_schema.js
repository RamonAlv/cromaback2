'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LoteSchema extends Schema {
  up () {
    this.create('lotes', (table) => {
      table.increments()

      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('municipio_id').unsigned().references('id').inTable('municipios')
      table.integer('localizacione_id').unsigned().references('id').inTable('localizaciones')

      table.string('nombre', 100).notNullable()
      table.string('uso_suelo', 100).notNullable()
      table.boolean('eliminado').notNullable().defaultTo(false)

      table.timestamps()
    })
  }

  down () {
    this.drop('lotes')
  }
}

module.exports = LoteSchema
