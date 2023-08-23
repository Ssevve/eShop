import { Select } from '@/components/Select';
import { useSearchParams } from 'react-router-dom';
import { SortOption, productsSortOptions } from '../lib/productsSortOptions';

export function Filters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (option: SortOption) => {
    searchParams.set('sort', option.value.sort || '');
    searchParams.set('order', option.value.order || '');
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  const initialSortOption = productsSortOptions.find(
    (option) =>
      option.value.sort === searchParams.get('sort') &&
      option.value.order === searchParams.get('order')
  );

  return (
    <>
      <Select
        initialValue={initialSortOption}
        options={productsSortOptions}
        label="Sort by"
        onChange={handleSortChange}
      />
    </>
  );
}
