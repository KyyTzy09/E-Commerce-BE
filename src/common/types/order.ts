export interface createTransasctionTypes {
    // product info
    productId : string;
    // user info
    userId : string;
    quantity : number
}

export interface createOrderTypes {
    productId : string;
    orderId : string;
    userId : string;
    price : number;
}

export interface updateOrderTypes {
    orderId : string;
    userId : string;

    status : string
}

export interface orderByUserIdTypes {
    userId : string
}

export interface orderByIdTypes {
    orderId : string
}
