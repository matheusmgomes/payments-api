import Client from '#models/client'
import Product from '#models/product'

export default class PaymentService {
  async process(data) {
    // const gateways = await Gateway.query().where('isActive', true).orderBy('priority', 'asc')
    const product = await Product.query().where('id', data.product_id)
    const client = await Client.query().where('id', data.client_id)

    const gatewayData = {
      amount: Number(product[0].amount),
      name: client[0].name,
      email: client[0].email,
      cardNumber: '5569000000006063',
      cvv: '010',
    }

    try {
      const response = await fetch('http://localhost:3001/transactions', {
        method: 'POST',
        body: JSON.stringify(gatewayData),
        headers: { 'Content-Type': 'application/json' },
      })
      const json = await response.json()

      return { success: true }
    } catch (err) {
      return { success: false }
    }
  }
}
