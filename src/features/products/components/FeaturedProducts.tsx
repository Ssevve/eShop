import { Loader } from '@/components/common/Loader';
import { useGetProductsQuery } from '../api';
import { FeaturedProductsList } from './FeaturedProductsList';

export function FeaturedProducts() {
  const {
    data: bestDealsData,
    isLoading: isLoadingBestDeals,
    isError: isBestDealsError,
  } = useGetProductsQuery({
    page: 1,
    category: 'Discounts',
    sort: 'discountPrice',
    order: 'asc',
  });

  const {
    data: topRatedData,
    isLoading: isLoadingTopRated,
    isError: isTopRatedError,
  } = useGetProductsQuery({
    page: 1,
    category: null,
    sort: 'rating',
    order: 'desc',
  });

  const {
    data: mostReviewedData,
    isLoading: isLoadingMostReviewed,
    isError: isMostReviewedError,
  } = useGetProductsQuery({
    page: 1,
    category: null,
    sort: 'ratingsCount',
    order: 'desc',
  });

  const isLoading = isLoadingBestDeals || isLoadingTopRated || isLoadingMostReviewed;

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <FeaturedProductsList
        title="Best deals"
        products={bestDealsData?.products}
        isError={isBestDealsError}
      />
      <FeaturedProductsList
        title="Top rated"
        products={topRatedData?.products}
        isError={isTopRatedError}
      />
      <FeaturedProductsList
        title="Most reviewed"
        products={mostReviewedData?.products}
        isError={isMostReviewedError}
      />
    </>
  );
}
