export type Sort = string | null;
export type Order = string | null;

interface SortOption {
  id: number;
  label: string;
  value: {
    sort: Sort;
    order: Order;
  }
}

export default SortOption;