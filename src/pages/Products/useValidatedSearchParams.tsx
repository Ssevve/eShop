import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from 'app/hooks';
import { selectTotalProductCount } from 'features/products/productsSlice';
import { Category, categories } from 'features/filters/filtersSlice';
import sortValues from 'features/filters/sortValues';

function useValidatedSearchParams(productsPerPage: number) {
  const [searchParams, setSearchParams] = useSearchParams();
  const productCount = useAppSelector(selectTotalProductCount);

  const page = Number(searchParams.get('page'));
  const category = searchParams.get('category') as Category;
  const sortBy = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  const maxPage = Math.ceil(productCount / productsPerPage);

  useEffect(() => {
    if (!page || page < 0 || page > maxPage) searchParams.set('page', '1');
    if (!category || !categories.includes(category)) {
      searchParams.delete('category');
    }
  
    const sorts = Object.values(sortValues);
    const sortByOptions = sorts.map((sort) => sort.sort);
    if (!sortBy || !sortByOptions.includes(sortBy)) {
      searchParams.set('sort', sortValues.nameAscending.sort);
    }
  
    const sortOrders = sorts.map((sort) => sort.order);
    if (!sortOrder || !sortOrders.includes(sortOrder)) {
      searchParams.set('order', sortValues.nameAscending.order);
    }
  
    setSearchParams(searchParams);
  }, []);

  return { searchParams, setSearchParams };
}

export default useValidatedSearchParams;
