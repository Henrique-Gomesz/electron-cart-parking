export interface SavePerson {
  name: string;
  document: string;
  telephone: string;
}

export interface ListPerson {
  id: string;
  name: string;
  document: string;
  telephone: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
