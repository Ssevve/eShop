export enum SortValues {
  NAME_ASCENDING = 'nameAscending',
  NAME_DESCENDING = 'nameDescending',
  PRICE_ASCENDING = 'priceAscending',
  PRICE_DESCENDING = 'priceDescending',
}

export type SortValue = `${SortValues}` | undefined;

export type SelectSortOption = { label: string; value: SortValue } | null;

export const selectSortOptions = [
  {
    label: 'Name (A-Z)',
    value: SortValues.NAME_ASCENDING,
  },
  {
    label: 'Name (Z-A)',
    value: SortValues.NAME_DESCENDING,
  },
  {
    label: 'Price asc.',
    value: SortValues.PRICE_ASCENDING,
  },
  {
    label: 'Price desc.',
    value: SortValues.PRICE_DESCENDING,
  },
];
