export interface getAllProductType {
  page: number;
  limit: number;
}

export interface productByIdType {
  productId: string;
}

export interface productByNameType {
  name: string;
  page: number;
  limit: number;
}

export interface productByIdAndStoreIdType {
  storeId: string;
  productId: string;
  page: number;
  limit: number;
}

export interface productByStoreIdType {
  storeId: string;
  page: number;
  limit: number;
}

export interface deleteProductByIdType {
  productId: string;
}

export interface createProductType {
  name: string;
  description: string;
  image: string;
  price: number;
  stok: number;
  storeId: string;
}

export interface updateProductType {
  name: string;
  description: string;
  image: string;
  price: number;
  stok: number;
  productId: string;
  storeId: string;
}

export interface updateStok {
  productId : string
}