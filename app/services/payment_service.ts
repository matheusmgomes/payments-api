import Gateway from '#models/gateway'
import type Transaction from '#models/transaction'
import TransactionProduct from '#models/transaction_product'
import { Exception } from '@adonisjs/core/exceptions'
import Gateway1Service from './gateways/gateway1_service.ts'
import Gateway2Service from './gateways/gateway2_service.ts'

export default class PaymentService {
  async pay(transaction: Transaction) {
    //encontra o TransactionProduct referenciado na Transaction, trazendo as informações do Product referenciado
    const transactionProduct = await TransactionProduct.query()
      .where('id', transaction.transactionProductId)
      .preload('product')

    const amount =
      Number(transactionProduct[0].quantity) * Number(transactionProduct[0].product.amount)

    const gateways = await Gateway.query().where('isActive', true).orderBy('priority', 'asc')

    //percorre pelos gateways registrados no banco e tenta fazer o pagamento, caso falhe tenta em outro.
    for (const gateway of gateways) {
      let result

      if (gateway.name === 'Gateway 1') {
        result = await new Gateway1Service().process(transaction, amount)
      }
      if (gateway.name === 'Gateway 2') {
        result = await new Gateway2Service().process(transaction, amount)
      }

      if (result?.success === true) {
        return {
          gateway: gateway.id,
          external_id: result.id,
        }
      }
    }
  }
}
