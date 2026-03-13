import Client from '#models/client'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Client.createMany([
      {
        name: 'Cliente 1',
        email: 'cliente@payments.com',
      },
      {
        name: 'Cliente 2',
        email: 'cliente2@payments.com',
      },
    ])
  }
}
