import FixedCacheKeys from '@/lib/fixedCacheKeys';
import { cartsApi, useAddCartProductMutation, useClearCartMutation, useRemoveCartProductMutation, useUpdateCartProductAmountMutation } from '@/features/carts';

function useLoadingStates() {
  const [, { isLoading: isRemovingCartProduct }] = useRemoveCartProductMutation({
    fixedCacheKey: FixedCacheKeys.removeCartProduct,
  });

  const [, { isLoading: isUpdatingCartProduct }] = useUpdateCartProductAmountMutation({
    fixedCacheKey: FixedCacheKeys.updateCartProduct,
  });

  const [, { isLoading: isClearingCart }] = useClearCartMutation({
    fixedCacheKey: FixedCacheKeys.clearCart,
  });

  const [, { isLoading: isAddingCartProduct }] = useAddCartProductMutation({
    fixedCacheKey: FixedCacheKeys.addCartProduct,
  });
  
  const { isFetching: isFetchingCart } = cartsApi.endpoints.getCart.useQueryState(); 

  const isLoadingAny = 
    isRemovingCartProduct 
    || isUpdatingCartProduct 
    || isClearingCart 
    || isAddingCartProduct 
    || isFetchingCart;

  return {
    isRemovingCartProduct,
    isUpdatingCartProduct,
    isClearingCart,
    isAddingCartProduct,
    isFetchingCart,
    isLoadingAny
  }
}

export default useLoadingStates;
