declare module "midtrans-client" {
    export class Snap {
        constructor(params: {
            isProduction: boolean
            serverKey: string
            clientKey: string
        })
        createTransaction(params: any): Promise<any>
    }
    export class coreApi {
        constructor(params: {
            isProduction: Boolean
            serverKey: String
            clientKey: string
        })
        charge(params: any): Promise<any>
    }
}