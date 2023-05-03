import { useSearchParams } from 'react-router-dom';
import Select, { type SelectOption } from 'components/common/Select/Select';
import sortValues from 'features/filters/sortValues';

export const sortOptions: SelectOption[] = [
  {
    label: 'Name (A-Z)',
    value: sortValues.nameAscending,
  },
  {
    label: 'Name (Z-A)',
    value: sortValues.nameDescending,
  },
  {
    label: 'Price asc.',
    value: sortValues.priceAscending,
  },
  {
    label: 'Price desc.',
    value: sortValues.priceDescending,
  },
];

function Filters() {
  const [searchParams, setSearchParams] = useSearchParams();
  function handleSortChange(option: SelectOption) {
    searchParams.set('sort', option.value.sort);
    searchParams.set('order', option.value.order);
    setSearchParams(searchParams);
  }

  return (
    <div className="flex min-w-fit max-w-fit flex-col gap-4 leading-none">
      <div className="mb-4 px-4">
        <h3 className="text-l pb-2 font-bold">Sort by</h3>
        <Select options={sortOptions} onChange={handleSortChange} />
      </div>
    </div>
  );
}

export default Filters;
