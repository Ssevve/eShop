export type Sort = string | null;
export type Order = string | null;

export interface SortOption {
  id: number;
  label: string;
  value: {
    sort: Sort;
    order: Order;
  }
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  firebaseId: string;
  email: string;
};