const MAX_PRODUCT_RATING = 5;
const MIN_PASSWORD_LENGTH = 6;
const MIN_PRODUCT_QUANTITY = 1;
const MAX_PRODUCT_QUANTITY = 99;

type MinKey = 'min';
type MaxKey = 'max';
type MinMaxKey = MinKey | MaxKey;

type QuantityKeys = MinMaxKey;
type QuantityConstraints = Record<QuantityKeys, number>;

type RatingKeys = MaxKey;
type RatingConstraints = Record<RatingKeys, number>;

export type ProductConstraints = { quantity: QuantityConstraints, rating: RatingConstraints };

export const productConstraints: ProductConstraints = {
  quantity: {
    min: MIN_PRODUCT_QUANTITY,
    max: MAX_PRODUCT_QUANTITY,
  },
  rating: {
    max: MAX_PRODUCT_RATING,
  }
};

type PasswordKeys = MinKey;
type PasswordConstraints = Record<PasswordKeys, number>;

export const passwordConstraints: PasswordConstraints = { min: MIN_PASSWORD_LENGTH };