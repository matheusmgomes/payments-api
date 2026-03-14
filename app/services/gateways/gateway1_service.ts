import Client from '#models/client'
import Product from '#models/product'

export default class Gateway1Service {
  async auth() {
    const bodyData = {
      email: 'dev@betalent.tech',
      token: 'FEC9BB078BF338F464F96B48089EB498',
    }

    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      body: JSON.stringify(bodyData),
      headers: { 'Content-Type': 'application/json' },
    })

    const json = await response.json()
    return json
  }

  async process(data) {
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
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${data.token}` },
      })
      const json = await response.json()

      return { success: true, id: json.id }
    } catch (err) {
      return { success: false }
    }
  }
}
