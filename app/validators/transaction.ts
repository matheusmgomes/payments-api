import vine from '@vinejs/vine'

export const createTransactionValidator = vine.create({
  client_id: vine.number(),
  product_id: vine.number(),
  quantity: vine.number(),
  card_number: vine.string(),
  cvv: vine.string(),
})
