import {PropositionModel} from './models/proposition';
import {formatDate} from '@angular/common';

// export class AppComponent  {
//   today = new Date();
//   jstoday = '';
//   constructor() {
//     this.jstoday = formatDate(this.today, 'dd-MM-yyyy', 'en-US', '+0530');
//   }
// }
export const PROPOSITIONS: PropositionModel[] = [
  // tslint:disable-next-line:max-line-length
  {id: 1, name: 'Перша тестова пропозиція', authorId: 1, createDate: Date(), status: 1, location: [50.3413014, 30.5962901], images: '', description: 'some description', authorName: 'Andrii'},
  {id: 2, name: 'Друга тестова пропозиція', authorId: 2, createDate: Date(), status: 1, location: [23, 43], images: '', description: 'some description', authorName: 'Asikisa'},
  {id: 3, name: 'Третя тестова пропозиція', authorId: 1, createDate: Date(), status: 1, location: [55, 23], images: '', description: 'some description', authorName: 'Andrii'},
  {id: 4, name: 'Четверта тестова пропозиція', authorId: 3, createDate: Date(), status: 1, location: [22, 34], images: '', description: 'some description', authorName: 'Authors name should be here'}
];

