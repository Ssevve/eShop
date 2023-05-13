import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import sortValues from 'features/filters/sortValues';

type UseValidatedSearchParamsReturnType = [
  URLSearchParams,
  (newSearchParams: URLSearchParams) => void
];

function useValidatedSearchParams(): UseValidatedSearchParamsReturnType {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  useEffect(() => {
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

  return [searchParams, setSearchParams];
}

export default useValidatedSearchParams;
