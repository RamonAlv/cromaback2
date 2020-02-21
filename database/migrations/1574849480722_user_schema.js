'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      //Relaciones
      table.integer('municipio_id').unsigned().references('id').inTable('municipios').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').nullable()//id_lider
      //fin Relaciones
      table.string('nombre', 100).notNullable()
      table.string('ape_p', 100).notNullable()
      table.string('ape_m', 100).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 254).notNullable()
      table.string('direccion', 254).notNullable()
      table.string('telefono', 50).notNullable()
      table.integer('rol').notNullable()
      table.boolean('activo').notNullable().defaultTo(false)
      table.boolean('eliminado').notNullable().defaultTo(false)
      table.boolean('conf_correo').notNullable().defaultTo(false)
      table.string('token_activacion', 254).nullable()
      table.string('imgperfil', 254).nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
