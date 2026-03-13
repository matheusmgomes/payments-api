import Gateway from '#models/gateway'
import type { HttpContext } from '@adonisjs/core/http'

export default class GatewaysController {
  async index({ response }: HttpContext) {
    try {
      const gateways = await Gateway.query().where('isActive', true).orderBy('priority', 'asc')
      return response.json({ gateways })
    } catch (error) {
      return response.status(400).json({ error })
    }
  }
}
