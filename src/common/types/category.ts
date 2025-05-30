export interface categoryByIdType {
  id: string;
}
export interface getCategoryByName {
  name : string
}

export interface getProductBycategory {
  name: string;
  page: number;
  limit :number;
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