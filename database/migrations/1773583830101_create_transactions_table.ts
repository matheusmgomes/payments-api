import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transactions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('client_id').unsigned().references('clients.id').onDelete('CASCADE')
      table.integer('gateway_id').unsigned().references('gateways.id').onDelete('CASCADE')
      table.string('external_id')
      table.string('status')
      table.decimal('amount')
      table.string('card_last_numbers')
      table
        .integer('transaction_product_id')
        .unsigned()
        .references('transaction_products.id')
        .onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
