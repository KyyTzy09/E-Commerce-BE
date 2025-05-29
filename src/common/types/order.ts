export interface createTransasctionTypes {
    // product info
    productId : string;
    // user info
    userId : string;

    orderId : string
}
export interface successTransaction {
    productId: string;
    userId: string;
    orderId: string;
}

export interface createOrderTypes {
    productId : string;
    userId : string;
    quantity : number;
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
