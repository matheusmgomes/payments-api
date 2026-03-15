import TransactionProduct from '#models/transaction_product'

export default class TransactionProductService {
  async create(productId: number, quantity: number) {
    try {
      const obj = await TransactionProduct.create({
        productId: productId,
        quantity: quantity,
      })

      return { success: true, obj }
    } catch (err) {
      return { success: false, err }
    }
  }
}
