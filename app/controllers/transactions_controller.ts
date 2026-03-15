import Transaction from '#models/transaction'
import PaymentService from '#services/payment_service'
import TransactionProductService from '#services/transaction_product_service'
import { createTransactionValidator } from '#validators/transaction'
import type { HttpContext } from '@adonisjs/core/http'

export default class TransactionsController {
  async store({ request, response }: HttpContext) {
    try {
      //seleciona o que vem do request da API
      // const data = request.only(['client_id', 'product_id', 'quantity', 'card_number', 'cvv'])
      const data = await request.validateUsing(createTransactionValidator)

      //cria um registro do tipo TransactionProduct, que armazena o Product e a quantidade enviada pela requisição
      const transactionProdService = await new TransactionProductService().create(
        data.product_id,
        data.quantity
      )

      if (transactionProdService.err) {
        return response.json({ transactionProdService })
      }

      const transactionProdObj = transactionProdService.obj

      //cria a Transaction em si, referenciando o TransactionProduct para poder fazer o cálculo do valor final
      const transaction = await Transaction.create({
        clientId: data.client_id,
        status: 'pending',
        cardLastNumbers: data.card_number,
        transactionProductId: transactionProdObj?.id,
        cvv: data.cvv,
      })

      const payment = new PaymentService()

      const result = await payment.pay(transaction)

      if (!result) {
        return response.status(500).json({ message: 'Payment error' })
      }

      transaction.gatewayId = result?.gateway
      transaction.externalId = result?.external_id
      transaction.status = 'finished'
      await transaction.save()

      return response.status(201).json({ transaction })
    } catch (err) {
      return response.status(400).json({ err })
    }
  }
}
