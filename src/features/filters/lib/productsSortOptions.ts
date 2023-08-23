import { SelectOption } from "@/components/Select";

interface SortValue {
  sort: string | null;
  order: string | null;
}

export type SortOption = SelectOption<SortValue>;

export const productsSortOptions: SortOption[] = [
  {
    id: 1,
    label: 'Name (A-Z)',
    value: {
      sort: 'name',
      order: 'asc',
    },
  },
  {
    id: 2,
    label: 'Name (Z-A)',
    value: {
      sort: 'name',
      order: 'desc',
    },
  },
  {
    id: 3,
    label: 'Price asc.',
    value: {
      sort: 'discountPrice',
      order: 'asc',
    },
  },
  {
    id: 4,
    label: 'Price desc.',
    value: {
      sort: 'discountPrice',
      order: 'desc',
    },
  },
  {
    id: 5,
    label: 'Rating asc.',
    value: {
      sort: 'rating',
      order: 'asc',
    },
  },
  {
    id: 6,
    label: 'Rating desc.',
    value: {
      sort: 'rating',
      order: 'desc',
    },
  },
];