import midtransClient from "midtrans-client"

const Snap = new midtransClient.Snap({
    isProduction : false ,
    serverKey : process.env.MIDTRANS_SERVER_KEY || "",
    clientKey : process.env.MIDTRANS_CLIENT_KEY || ""
})

export default Snap