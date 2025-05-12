export interface allStoresType {
  page: number;
  limit: number;
}

export interface storeByUserIdType {
  userId: string;
  page: number;
  limit: number;
}

export interface storeByIdType {
  id: string;
}

export interface createStoreType {
  userId: string;
  name: string;
  info: string;
}

export interface updateStoreType {
  id: string;
  userId: string;
  name: string;
  info: string;
}

export interface deleteStoreByUserIdTypes {
  userId: string;
}

export interface deleteStoreById {
  userId: string;
  id: string;
}
