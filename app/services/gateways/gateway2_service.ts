import Client from '#models/client'
import Product from '#models/product'
import env from '#start/env'

export default class Gateway2Service {
  async process(data) {
    const product = await Product.query().where('id', data.product_id)
    const client = await Client.query().where('id', data.client_id)

    const gatewayData = {
      valor: Number(product[0].amount),
      nome: client[0].name,
      email: client[0].email,
      numeroCartao: '5569000000006063',
      cvv: '010',
    }

    try {
      const response = await fetch('http://localhost:3002/transacoes', {
        method: 'POST',
        body: JSON.stringify(gatewayData),
        headers: {
          'Content-Type': 'application/json',
          'Gateway-Auth-Token': env.get('GATEWAY_2_AUTH_TOKEN'),
          'Gateway-Auth-Secret': env.get('GATEWAY_2_AUTH_SECRET'),
        },
      })
      const json = await response.json()

      return { success: true, id: json.id }
    } catch (err) {
      return { success: false }
    }
  }
}
