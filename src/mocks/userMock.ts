import User from '@/types/User';

interface UserWithPassword extends User {
  password: string; 
}

export const userWithoutReviewMock: UserWithPassword = {
  email: 'correct@email.com',
  _id: 'testUserId',
  firebaseId: 'testFirebaseId',
  firstName: 'testFirstName',
  lastName: 'testLastName',
  password: 'correctPassword',
};

export const userWithReviewMock: UserWithPassword = {
  email: 'correct@email.com',
  _id: 'testUserId1',
  firebaseId: 'testFirebaseId',
  firstName: 'testFirstName',
  lastName: 'testLastName',
  password: 'correctPassword',
};