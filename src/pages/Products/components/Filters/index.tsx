import { useSearchParams } from 'react-router-dom';
import SelectOption from 'types/SelectOption';
import SortSelect from './SortSelect';

const sortOptions: SelectOption[] = [
  {
    label: 'Name (A-Z)',
    value: 'nameAscending',
  },
  {
    label: 'Name (Z-A)',
    value: 'nameDescending',
  },
  {
    label: 'Price asc.',
    value: 'priceAscending',
  },
  {
    label: 'Price desc.',
    value: 'priceDescending',
  },
];

function Filters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (option: SelectOption) => {
    if (option.value) searchParams.set('order', option.value);
    else searchParams.delete('order');
    setSearchParams(searchParams);
  };

  const initialSortOption = sortOptions.find(
    (option) => option.value === searchParams.get('order')
  );

  return (
    <div className="mb-4 flex min-w-fit max-w-fit flex-col gap-4 px-4 leading-none">
      <SortSelect
        initialValue={initialSortOption}
        key={initialSortOption?.value}
        options={sortOptions}
        label="Sort by"
        onChange={handleSortChange}
      />
    </div>
  );
}

export default Filters;