/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  gateways: {
    index: typeof routes['gateways.index']
  }
  products: {
    index: typeof routes['products.index']
  }
}
