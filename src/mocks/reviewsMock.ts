import { Review } from 'app/services/reviews';

const reviewsMock: Review[] = [
  {
    rating: 1,
    userFirstName: 'testUserFirstName1',
    message: 'testReviewMessage1',
    productId: 'testProductId',
    userId: 'testUserId1',
    _id: 'testReviewId1',
  },
  {
    rating: 2,
    userFirstName: 'testUserFirstName2',
    message: 'testReviewMessage2',
    productId: 'testProductId',
    userId: 'testUserId2',
    _id: 'testReviewId2',
  },
  {
    rating: 3,
    userFirstName: 'testUserFirstName3',
    message: 'testReviewMessage3',
    productId: 'testProductId',
    userId: 'testUserId3',
    _id: 'testReviewId3',
  },
];

export default reviewsMock;
