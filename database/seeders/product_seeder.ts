import Product from '#models/product'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Product.createMany([
      {
        name: 'Product 1',
        amount: '1000.0',
      },
      {
        name: 'Product 2',
        amount: '2000',
      },
      {
        name: 'Product 3',
        amount: '3000',
      },
      {
        name: 'Product 4',
        amount: '4000',
      },
      {
        name: 'Product 5',
        amount: '5000',
      },
      {
        name: 'Product 6',
        amount: '6000',
      },
    ])
  }
}
