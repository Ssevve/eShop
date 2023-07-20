import SortOption from '@/types/SortOption';
import { useSearchParams } from 'react-router-dom';
import SortSelect from './Select';

const sortOptions: SortOption[] = [
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
];

function Filters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (option: SortOption) => {
    searchParams.set('sort', option.value.sort || '');
    searchParams.set('order', option.value.order || '');
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  const initialSortOption = sortOptions.find(
    (option) =>
      option.value.sort === searchParams.get('sort') &&
      option.value.order === searchParams.get('order')
  );

  return (
    <>
      <SortSelect
        initialValue={initialSortOption}
        options={sortOptions}
        label="Sort by"
        onChange={handleSortChange}
      />
    </>
  );
}

export default Filters;
