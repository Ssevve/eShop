import User from 'types/User';

interface UserWithPassword extends User {
  password: string;
}

const user: UserWithPassword = {
  email: 'correct@email.com',
  uid: 'test-user-id',
  password: 'correctPassword',
}

export default user;