type MinKey = 'min';
type MaxKey = 'max';
type MinMaxKey = MinKey | MaxKey;
type ConstraintRecord<T extends string> = Record<T, number>;

type AmountConstraints = ConstraintRecord<MinMaxKey>;
type RatingConstraints = ConstraintRecord<MinMaxKey>;
interface ProductConstraints { 
  amount: AmountConstraints;
  rating: RatingConstraints;
}

export const productConstraints: ProductConstraints = {
  amount: {
    min: 1,
    max: 99,
  },
  rating: {
    min: 1,
    max: 5,
  },
};

type PasswordConstraints = ConstraintRecord<MinKey>;
type NameConstraints = ConstraintRecord<MinKey>;
interface UserConstraints {
  password: PasswordConstraints; 
  firstName: NameConstraints;
  lastName: NameConstraints;
}

export const userConstraints: UserConstraints = {
  password: {
    min: 6,
  },
  firstName: {
    min: 2,
  },
  lastName: {
    min: 2,
  },
};