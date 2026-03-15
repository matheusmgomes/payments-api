import { TransactionProductSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import Product from './product.ts'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class TransactionProduct extends TransactionProductSchema {
  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>
}
