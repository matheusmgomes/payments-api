import PaymentService from '#services/payment_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class TransactionsController {
  async store({ request, response }: HttpContext) {
    // const data = request.only(['client_id', 'product_id'])
    const data = {
      client_id: 1,
      product_id: 1,
      quantity: 2,
    }
    const service = new PaymentService()
    const result = await service.process(data)

    return response.json({ result })
  }
}
