import User from 'types/User';

interface UserWithPassword extends User {
  password: string; 
}

const user: UserWithPassword = {
  email: 'correct@email.com',
  _id: 'testUserId',
  firebaseId: 'testFirebaseId',
  firstName: 'testFirstName',
  lastName: 'testLastName',
  password: 'correctPassword',
};

export default user;