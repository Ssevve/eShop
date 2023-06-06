import User from 'types/User';

interface UserWithPassword extends User {
  password: string;
}

const user: UserWithPassword = {
  email: 'correct@email.com',
  uid: 'test-user-id',
  password: 'correctPassword',
  phoneNumber: undefined,
}

export default user;