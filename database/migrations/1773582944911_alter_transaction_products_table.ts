import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transaction_products'

  async up() {
    /**
     * Add user_id to posts table
     */
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('product_id').unsigned().notNullable()
      table.foreign('product_id').references('products.id').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign(['product_id'])
      table.dropColumn('product_id')
    })
  }
}
