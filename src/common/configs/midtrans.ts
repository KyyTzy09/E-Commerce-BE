import { midtransClient } from "midtrans-client"

const Snap = new midtransClient.Snap({
    isProduction: process.env.NODE_ENV === "production" ? true : false,
    serverKey: process.env.MIDTRANS_SERVER_KEY || "",
    clientKey: process.env.MIDTRANS_CLIENT_KEY || ""
})

export default Snap