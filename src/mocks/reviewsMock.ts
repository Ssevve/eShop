import { Review } from '@/features/reviews';

const mockCreatedAtDate = new Date('1995-12-17T03:24:00');
const mockUpdatedAtDate = new Date('1995-12-18T03:24:00');

export const reviewsMock: Review[] = [
  {
    rating: 1,
    userFirstName: 'testUserFirstName1',
    message: 'testReviewMessage1',
    productId: 'testProductId',
    userId: 'testUserId1',
    _id: 'testReviewId1',
    createdAt: mockCreatedAtDate,
    updatedAt: mockUpdatedAtDate,
  },
  {
    rating: 2,
    userFirstName: 'testUserFirstName2',
    message: 'testReviewMessage2',
    productId: 'testProductId',
    userId: 'testUserId2',
    _id: 'testReviewId2',
    createdAt: mockCreatedAtDate,
  },
  {
    rating: 3,
    userFirstName: 'testUserFirstName3',
    message: 'testReviewMessage3',
    productId: 'testProductId',
    userId: 'testUserId3',
    _id: 'testReviewId3',
    createdAt: mockCreatedAtDate,
  },
];
