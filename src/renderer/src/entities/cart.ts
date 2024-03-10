export interface SaveCart {
  personDocument: string;
  name: string;
}

export interface ListCart {
  id: string;
  personDocument: string;
  name: string;
  active: boolean;
  deleted: boolean;
  cartCode: string;
  createdAt: Date;
  updatedAt: Date;
}
