/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'transactions.store': {
    methods: ["POST"]
    pattern: '/api/v1/transactions'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/transaction').createTransactionValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/transaction').createTransactionValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/transactions_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/transactions_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
}
