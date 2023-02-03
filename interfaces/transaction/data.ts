import { ObjectId } from 'mongodb';

import { TransactionForm } from './form';

export interface Transaction extends TransactionForm {
  _id: ObjectId;
  userId: ObjectId;
  createdAt: number;
}
