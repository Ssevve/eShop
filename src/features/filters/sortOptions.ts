enum SortOptions {
  NAME_ASCENDING = 'nameAscending',
  NAME_DESCENDING = 'nameDescending',
  PRICE_ASCENDING = 'priceAscending',
  PRICE_DESCENDING = 'priceDescending',
}

export type SortOption = `${SortOptions}`;

export default SortOptions;
