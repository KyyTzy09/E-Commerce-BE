declare module "midtrans-client" {
    export default midtransClient

    namespace midtransClient {
        class Snap {
            constructor(params: {
                isProduction: boolean
                serverKey: string
                clientKey: string
            })
            createTransaction(params: any): Promise<any>
        }
        class coreApi {
            constructor(params: {
                isProduction: boolean
                serverKey: string
                clientKey: string
            })
            charge(params: any): Promise<any>
        }
    }
}