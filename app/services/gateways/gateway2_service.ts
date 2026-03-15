import Client from '#models/client'
import type Transaction from '#models/transaction'
import env from '#start/env'

export default class Gateway2Service {
  async process(data: Transaction, amount: number) {
    const client = await Client.query().where('id', data.clientId)
    const gatewayData = {
      valor: amount,
      nome: client[0].name,
      email: client[0].email,
      numeroCartao: data.cardLastNumbers,
      cvv: data.cvv,
    }

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
    if (json.error) {
      return { success: false, json }
    }
    return { success: true, id: json.id }
  }
}
