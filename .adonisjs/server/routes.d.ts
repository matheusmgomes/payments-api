import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'transactions.store': { paramsTuple?: []; params?: {} }
  }
  GET: {
  }
  HEAD: {
  }
  POST: {
    'transactions.store': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}