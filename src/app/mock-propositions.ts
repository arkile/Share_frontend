import {PropositionModel} from './models/proposition';


export const PROPOSITIONS: PropositionModel[] = [
  {id: 1, name: 'first test proposition', authorId: 1, createDate: Date.now(), status: 1, images: [], description: 'some description'},
  {id: 2, name: 'second test proposition', authorId: 1, createDate: Date.now(), status: 1, images: [], description: 'some description'},
  {id: 3, name: 'third test proposition', authorId: 2, createDate: Date.now(), status: 1, images: [], description: 'some description'},
  {id: 4, name: 'fourth test proposition', authorId: 3, createDate: Date.now(), status: 1, images: [], description: 'some description'}
];

