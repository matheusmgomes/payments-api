import Client from '#models/client'
import type Transaction from '#models/transaction'
import env from '#start/env'
import { Exception } from '@adonisjs/core/exceptions'

export default class Gateway1Service {
  async auth() {
    const bodyData = {
      email: env.get('GATEWAY_1_AUTH_SECRET'),
      token: env.get('GATEWAY_1_AUTH_TOKEN'),
    }
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      body: JSON.stringify(bodyData),
      headers: { 'Content-Type': 'application/json' },
    })

    const json = await response.json()

    if (json.error) {
      throw new Exception(json.error)
    }

    return json
  }

  async process(data: Transaction, amount: number) {
    // const product = await Product.query().where('id', data.product_id)
    try {
      const auth = await this.auth()
      const client = await Client.query().where('id', data.clientId)
      const gatewayData = {
        amount: amount,
        name: client[0].name,
        email: client[0].email,
        cardNumber: data.cardLastNumbers,
        cvv: data.cvv,
      }
      const response = await fetch('http://localhost:3001/transactions', {
        method: 'POST',
        body: JSON.stringify(gatewayData),
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` },
      })
      const json = await response.json()
      return { success: true, id: json.id }
    } catch (err) {
      return { success: false }
    }
  }
}
