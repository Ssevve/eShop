import User from 'types/User';

type UserWithPassword = {
  password: string; 
} & User;

const user: UserWithPassword = {
  email: 'correct@email.com',
  _id: 'testUserId',
  firebaseId: 'testFirebaseId',
  firstName: 'testFirstName',
  lastName: 'testLastName',
  password: 'correctPassword',
};

export default user;