export interface Customer {
  _id?: string;
  firstname: string;
  lastname: string;
  address?: Address[];
}

export interface Address {
  address: string;
  city?: string;
  postalCode?: string;
}
