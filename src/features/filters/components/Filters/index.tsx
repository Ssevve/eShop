import type { SelectOption } from 'components/common/Select/Select';
import { setSortBy } from 'features/filters/filtersSlice';
import SortValues from 'features/filters/sortValues';

import Select from 'components/common/Select/Select';
import { useAppDispatch } from 'app/hooks';
import Categories from './Categories';

export const sortOptions: SelectOption[] = [
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

function Filters() {
  const dispatch = useAppDispatch();
  function handleSortChange(option: SelectOption) {
    dispatch(setSortBy(option.value));
  }

  return (
    <div className="flex min-w-fit max-w-fit flex-col gap-4 leading-none">
      {/* <Categories /> */}
      <div className="mb-4 px-4">
        <h3 className="text-l pb-2 font-bold">Sort by</h3>
        <Select options={sortOptions} onChange={handleSortChange} />
      </div>
    </div>
  );
}

export default Filters;
