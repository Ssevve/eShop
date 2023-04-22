import type { SelectOption } from 'components/common/Select/Select';
import { setSortBy } from 'features/filters/filtersSlice';
import SortValues from 'features/filters/sortValues';

import Select from 'components/common/Select/Select';
import { useAppDispatch } from 'app/hooks';
import SortValue from 'types/SortValue';
import Categories from './Categories';

export const sortOptions: SelectOption<SortValue>[] = [
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
  function handleSortChange(option: SelectOption<SortValue>) {
    dispatch(setSortBy(option.value));
  }

  return (
    <div className="flex w-1/3 min-w-fit flex-col gap-4 border leading-none">
      <Categories />
      <h3 className="px-4 text-xl font-bold">Sort by</h3>
      {/* eslint-disable-next-line react/jsx-no-bind */}
      <Select options={sortOptions} onChange={handleSortChange} />
    </div>
  );
}

export default Filters;
