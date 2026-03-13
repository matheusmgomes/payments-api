import type { HttpContext } from '@adonisjs/core/http'

import Product from '#models/product'

export default class ProductsController {
  async index({ response }: HttpContext) {
    try {
      const products = await Product.all()
      return response.json({ products })
    } catch (err) {
      return response.status(400).json({ err })
    }
  }
}
