export interface getKomentarByIdTypes {
  id: string;
}

export interface getKomentarByUserIdTypes {
  userId: string;
}

export interface getKomentarByProductIdTypes {
    productId : string
}
export interface createKomentarTypes {
  userId: string;
  productId: string;
  komentar: string;
}

export interface deleteByIdTypes {
  id: string;
}
