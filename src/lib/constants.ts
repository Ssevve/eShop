type MinKey = 'min';
type MaxKey = 'max';
type ConstraintRecord<T extends string> = Record<T, number>;

type QuantityConstraints = ConstraintRecord<MinKey | MaxKey>;
type RatingConstraints = ConstraintRecord<MaxKey>;
type ProductConstraints = { quantity: QuantityConstraints, rating: RatingConstraints };

export const productConstraints: ProductConstraints = {
  quantity: {
    min: 1,
    max: 99,
  },
  rating: {
    max: 5,
  }
};

type PasswordConstraints = ConstraintRecord<MinKey>;
type UserConstraints = { password: PasswordConstraints };

export const userConstraints: UserConstraints = {
  password: {
    min: 6,
  },
};