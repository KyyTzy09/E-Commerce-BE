export interface categoryByIdType {
  id: string;
}

export interface categoryByNameType {
  name: string;
}

export interface updateCategoryType {
  id: string;
  name: string;
}

export interface productToCategoryType {
  product_Id: string;
  name: string[];
}

export interface deleteFromCategoryType {
  product_Id: string;
}

export interface categoryWithProductIdType {
  product_Id : string
}